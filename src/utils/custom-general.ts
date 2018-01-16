import {IDataItem} from '../models';
import {capitalizeFirstLetter, defined} from '.';

// Column Title is purely cosmetic and not used for data organizing
export function createColumnTitle(dataItem: IDataItem): string {
    return dataItem.name;
}

// Column Key is a unique key that is applied to each column and is used for organizing data
// Index is used so that if there are two columns with the same name their data don't get copied
export function createColumnId(dataItemName: string, dataItemValue: string | number): string {
    if (defined(dataItemValue)) {
        return `${dataItemName} ${dataItemValue}`;
    } else {
        return dataItemName;
    }
}

export function createStateName(id: string, i: number): string {
    return `is${capitalizeFirstLetter(id)}Active${i}`;
}

export function createCellKey(rowName: string | number, columnIndex: number, subColumnIndex: number): string {
    return `row name: ${rowName}, column index: ${columnIndex}, sub column index: ${subColumnIndex}`;
}

export function isDropdownOpen(tableControlsState: any) {
    return Object.keys(tableControlsState).filter((key) => tableControlsState[key]).length > 1;
}
