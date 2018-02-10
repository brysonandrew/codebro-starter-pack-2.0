import {IDictionary} from '../data/models';
import {toPath} from './routing';

export function createArray(length: number): null[] {
    return Array.apply(null, new Array(length));
}

export function setInArray(arr, index, val) {
    return Object.assign([...arr], {[index]: val});
}

export function removeInArray(arr, val) {
    const index = arr.indexOf(val);
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function extractProp(arr: any[], prop) {
    return arr.map((item) => item[prop]);
}

export function removeInArrayBy(prop, arr, val) {
    return arr.filter((item, i) => item[prop] !== val);
}

export function sortByName(a, b) {
    if (typeof a.name === 'number') {
        return a.name - (b.name as any);
    } else {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
}

export function sortBy(prop, a, b) {
    if (typeof a[prop] === 'number') {
        return a[prop] - (b[prop] as any);
    } else {
        if (a[prop] < b[prop]) {
            return -1;
        }
        if (a[prop] > b[prop]) {
            return 1;
        }
        return 0;
    }
}

export function isXInArrayOf(x: string, arr: any[], prop: string): boolean {
    return arr.some((info) => info[prop] === x);
}

export function itemsInArrOf<T>(items: T[], arr: any[], prop): any[] {
    return arr.filter((x: T) => items.indexOf(x[prop]) > -1);
}

export const arrayToDictionary = <T>(arr: T[], dictionaryIndex: string, dictionaryValue: string): IDictionary<string> =>
    arr.reduce((acc, curr) => {
        acc[curr[dictionaryIndex]] = curr[dictionaryValue];
        return acc;
    }, {});
