import { toPath } from '../../helpers/toPath';
import { IDictionary, IPage } from '../../models';

function Page(name) {
    this.name = name;
    this.path = toPath(this.name);
}

export const pageList: IPage[] = [
    new Page(
        "Hello",
    ),
    new Page(
        "World",
    )
];

export const pages: IDictionary<IPage> = pageList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
