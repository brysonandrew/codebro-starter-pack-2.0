import {IDataItem, IDictionary, IHeaderInfo, ITableData} from '../models';
import {capitalizeFirstLetter, defined, createColumnTitle, createColumnId, extractKeysFromData, isXInDictionary
    , sortBy, isXInArrayOf, itemsInArrOf} from '.';

// info for columns in "TableContent" component

export function columnInfo(columns: IDataItem[], tableData: ITableData[]): IDictionary<string[]> {

    const columnHeaderInfo: IHeaderInfo[] = createColumnHeaderInfo(columns, tableData);
    const organizedColumnInfo: IDictionary<IHeaderInfo[]> = organizeColumnInfo(columnHeaderInfo);

    return sortHeaderInfo(organizedColumnInfo);
}

function organizeColumnInfo(headerInfo: IHeaderInfo[]): IDictionary<IHeaderInfo[]> {

    return headerInfo.reduce((acc: IDictionary<IHeaderInfo[]>, curr: IHeaderInfo): IDictionary<IHeaderInfo[]> => {

        if (isXInDictionary(curr.headerName, acc)) {
            // update data
            acc[curr.headerName].push(curr);
        } else {
            // initialize new
            acc[curr.headerName] = [curr];
        }
        return acc;
    }, {});
}

function sortHeaderInfo(organizedHeaderInfo: IDictionary<IHeaderInfo[]>): IDictionary<string[]> {

    let sortedHeaderInfo = {};

    Object.keys(organizedHeaderInfo).sort((a, b) => sortBy('headerName', a, b)).forEach((key) => {
        sortedHeaderInfo[key] = organizedHeaderInfo[key]
            .sort((a, b) => sortBy('subHeaderName', a, b))
            .map((info: IHeaderInfo) => info.columnId);
    });

    return sortedHeaderInfo;
}

// info for header and sub-header

export function headerInfo(rows: IDataItem[], columns: IDataItem[], tableData: ITableData[]): IDictionary<string[]> {

    const rowHeaderInfo: IHeaderInfo[] = createRowHeaderInfo(rows);
    const organizedRowInfo: IDictionary<string[]> = organizeHeaderInfo(rowHeaderInfo);

    const columnHeaderInfo: IHeaderInfo[] = createColumnHeaderInfo(columns, tableData);
    const organizedColumnInfo: IDictionary<string[]> = organizeHeaderInfo(columnHeaderInfo);
    const sortedColumnInfo: IDictionary<string[]> = sortHeaderKeys(organizedColumnInfo);

    return {...organizedRowInfo, ...sortedColumnInfo};
}

function sortHeaderKeys(organizedHeaderInfo: IDictionary<string[]>): IDictionary<string[]> {

    let sortedHeaderInfo = {};

    Object.keys(organizedHeaderInfo).sort().forEach((key) => {
        sortedHeaderInfo[key] = organizedHeaderInfo[key].sort();
    });

    return sortedHeaderInfo;
}

function organizeHeaderInfo(headerInfo: IHeaderInfo[]): IDictionary<string[]> {

    return headerInfo.reduce((acc: IDictionary<string[]>, curr: IHeaderInfo): IDictionary<string[]> => {

        if (isXInDictionary(curr.headerName, acc)) {
            // update data
            acc[curr.headerName].push(curr.subHeaderName);
        } else {
            // initialize new
            acc[curr.headerName] = [curr.subHeaderName];
        }
        return acc;
    }, {});
}

function createRowHeaderInfo(rows: IDataItem[]): IHeaderInfo[] {

    // this creates header for 1st column in table (name of rows)
    return rows.map((item: IDataItem, i: number): IHeaderInfo => ({
        headerName: item.name,
        subHeaderName: '',
        columnId: item.name // this assumes rows never have sub headers
    }));
}

export function createColumnHeaderInfo(columns: IDataItem[], tableData: ITableData[]): IHeaderInfo[] {

    return tableData.reduce((acc: IHeaderInfo[], currTableData: ITableData): IHeaderInfo[] => {
        let dataKeys: string[] = extractKeysFromData(currTableData);
        // Add all so that all data runs can be selected
        dataKeys.push('All');
        const itemsPresent = itemsInArrOf(dataKeys, columns, 'name');

        if (itemsPresent.length > 0) {
            itemsPresent.map((column: IDataItem) => {
                const columnId = createColumnId(column.name, currTableData[column.name]);
                if (!isXInArrayOf(columnId, acc, 'columnId')) {
                    acc.push({
                        headerName: column.name,
                        subHeaderName: currTableData[column.name] || column.name,
                        columnId: columnId
                    });
                }
            });
        }

        return acc;
    }, []);

}
