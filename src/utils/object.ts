import {IDataItem, IDictionary, ITableData} from '../models';

export function extractKeysFromData(tableData: ITableData): string[] {
    return Object.keys(tableData).map((key) => key);
}

export function extractNamesFromColumns(columns: IDataItem[]): string[] {
    return columns.map((column) => column.name);
}

export function isXInDictionary(x: string, dictionary: IDictionary<any>): boolean {
    return Object.keys(dictionary).some((key) => key === x);
}
