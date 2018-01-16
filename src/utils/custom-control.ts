import {EEditType, EMode, IControlsInfo, IDictionary, IEditConfig} from '../models';
import {ITableControlsControllerProps} from '../app';
import {addControlProps, createEditConfigs, ADD_COLUMN, EDIT_MODE} from '../data';
import {createStateName} from '.';

export function createControlsDictionary(controlInfos): IDictionary<IControlsInfo[]> {
    return controlInfos.reduce((
        acc: IDictionary<IControlsInfo[]>, curr: IControlsInfo): IDictionary<IControlsInfo[]> => {
        if (Object.keys(acc).filter((x) => x === curr.editType).length > 0) {
            acc[curr.editType].push(curr);
        } else {
            acc[curr.editType] = [curr];
        }
        return acc;
    }, {});
}

export function isEditMode(controllerState: any): boolean {
    return (controllerState[createStateName(EEditType.ToggleMode, 0)] ? EMode.Edit : EMode.Display) === EMode.Edit;
}

export function isItemShown(controllerState: any, editType: string): boolean {
    return isEditMode(controllerState) || editType === EEditType.ToggleMode;
}

export function createTableInfo(tableControls: ITableControlsControllerProps): IControlsInfo[] {
    const {values, rows, columns} = tableControls.tableState;

    // Add edit type to each data item to make and edit item
    const valueEditItems: IEditConfig[] = createEditConfigs(EEditType.ChangeValue, values);
    const rowEditItems: IEditConfig[] = createEditConfigs(EEditType.ChangeRow, rows);
    const columnEditItems: IEditConfig[] = createEditConfigs(EEditType.ChangeColumn, columns);
    const addColumnEditItems: IEditConfig[] = createEditConfigs(EEditType.AddColumn, ADD_COLUMN);
    const editModeEditItems: IEditConfig[] = createEditConfigs(EEditType.ToggleMode, EDIT_MODE);

    return addControlProps([
        ...valueEditItems,
        ...rowEditItems,
        ...columnEditItems,
        ...addColumnEditItems,
        ...editModeEditItems
    ]);
}
