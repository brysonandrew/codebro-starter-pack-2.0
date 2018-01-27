export interface IDictionary<T> {
    [key: string]: T
}

export interface IParams {
    activePagePath?: string
}

export interface ILabelInfo {
    id: string
    title: string
    link: string
    icon: JSX.Element
}
