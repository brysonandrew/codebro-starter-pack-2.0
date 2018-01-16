import {IDataItem, IDictionary, IRawRowInfo, IRowData, IRowInfo, ITableData} from '../models';
import {capitalizeFirstLetter, defined, createColumnId, createStateName} from '.';
import {ITableInterfaceState} from '../app';
import {sortByName} from './array';
import {extractKeysFromData} from './object';

// rows

// The row utils job is to transform ITableData[] into IRowInfo[] based on the tableInterfaceState
// To get there is undergoes two main transformations
// 1) it is transformed into IRawRowInfo[] which is basically an array of objects featuring two props
// "name" and "data", "data" is just an array of objects with a unique id, column identifier and cell value
// 2) IRawRowInfo[] then gets organized into IRowInfo[] the only difference being that IRowInfo[]'s data is
// organized into a dictionary of columns

export function transformToRows(tableInterfaceState: ITableInterfaceState, tableData: ITableData[]): IRowInfo[] {
    const rowInfo = createRowInfo(tableInterfaceState, tableData);
    return organizeRowData(rowInfo);
}

function organizeRowData(rowInfo: IRawRowInfo[]) {
    return rowInfo.map((row) => ({
        name: row.name,
        data: createDataDict(row.data),
        colorData: createColorDataDict(row.data)
    }));
}

// -- create raw info for each row

function createRowInfo(tableState: ITableInterfaceState, tableData: ITableData[]): IRawRowInfo[] {
    const columns: IDataItem[] = tableState.columns;
    const row: IDataItem = tableState.rows[0];
    const value: IDataItem = tableState.values[0];
    const colorValue: IDataItem = tableState.colorConfig.option;

    return tableData.reduce((acc: IRawRowInfo[], curr: ITableData, tableDataIndex: number): IRawRowInfo[] => {

        const rowData: IRowData[] = extractRowData(columns, curr, tableDataIndex, value, colorValue);

        const rowName = curr[row.name];
        const prevNameIndex = indexOfPreviousName(acc, rowName);

        if (prevNameIndex > -1) {
            // only add to data
            const prevData = acc[prevNameIndex].data;
            acc[acc.length - 1].data = [...prevData, ...rowData];
        } else {
            // initialize new row
            acc.push({
                name: rowName,
                data: rowData
            });
        }
        return acc;
    }, []);
}

function indexOfPreviousName(acc: IRawRowInfo[], rowName: string) {
    const names: string[] = acc.map((item: IRawRowInfo) => item.name);
    return names.indexOf(rowName);
}

// -- values in columns for each row

function extractRowData(
    columns: IDataItem[],
    currTableData: ITableData,
    tableDataIndex,
    value: IDataItem,
    colorValue: IDataItem
): IRowData[] {
    return columns.reduce((accRowData: IRowData[], currRowData: IDataItem) => {
        // Check if column exists in data supplied
        const isAllDataRuns = currRowData.name === 'All';
        if (isAllDataRuns) {
            accRowData.push({
                id: `All, table data index: ${tableDataIndex}`,
                column: 'All',
                value: currTableData[value.name],
                colorValue: currTableData[colorValue.name]
            });
        } else if (isColumnInData(currTableData, currRowData.name)) {
            const columnKey = createColumnId(currRowData.name, currTableData[currRowData.name]);
            accRowData.push({
                id: `${columnKey}, table data index: ${tableDataIndex}`,
                column: columnKey,
                value: currTableData[value.name],
                colorValue: currTableData[colorValue.name]
            });
        }
        return accRowData;
    }, []);
}

function isColumnInData(currTableData: ITableData, currRowDataName: string) {
    return extractKeysFromData(currTableData).indexOf(currRowDataName) > -1;
}
// **TODO refactor createDataDict and createColorDataDict into one util for objects
// rows data dictionary

export function createDataDict(dataItems: IRowData[]): IDictionary<string[] | number[]> {

    return dataItems.reduce((acc, curr) => {
        const names = Object.keys(acc);

        if (names.indexOf(curr.column) > -1) {
            acc[curr.column].push(curr.value);
        } else {
            acc[curr.column] = [curr.value];
        }
        return acc;
    }, {});
}

// rows color data dictionary

export function createColorDataDict(dataItems: IRowData[]): IDictionary<string[] | number[]> {

    return dataItems.reduce((acc, curr) => {
        const names = Object.keys(acc);

        if (names.indexOf(curr.column) > -1) {
            acc[curr.column].push(curr.colorValue);
        } else {
            acc[curr.column] = [curr.colorValue];
        }
        return acc;
    }, {});
}

// column length

export function createColumnsLengthDict(
    headerDictionary: IDictionary<string[]>, rowInfos: IRowInfo[]): IDictionary<IDictionary<number>> {

    let dictionary = {};

    Object.keys(headerDictionary).map((key) => {
        dictionary[key] = headerDictionary[key].reduce((acc, curr) => {
            acc[curr] = maxColLength(rowInfos, curr);
            return acc;
        }, {});
    });

    return dictionary;
}

function maxColLength(rowInfos: IRowInfo[], curr: string): number {
    const length = rowInfos
        // check for data
        .filter((rowInfo) => (defined(rowInfo.data) && defined(rowInfo.data[curr])))
        // get length of each data set
        .map((rowInfo) => rowInfo.data[curr].length)
        // return highest length
        .reduce((a, b) => Math.max(a, b), 0);

    if (length === 0) {
        // return 1 because the column header will still be rendered even with no info in cells
        return 1;
    } else {
        return length;
    }
}

// sort

export function sortTableContent(rowInfos: IRowInfo[], controllerState: any): IRowInfo[] {
    if (controllerState[createStateName('col', 0)]) {
        return rowInfos.sort(sortByName);
    } else {
        return rowInfos.sort(sortByName).reverse();
    }
}
