import {defined} from './variable_evaluation';

export const getScrollTopMax = () => {
    let ref;
    return (ref = document.scrollingElement["scrollTopMax"]) != null
        ? ref
        : (document.scrollingElement.scrollHeight - document.documentElement.clientHeight);
};

export function docScroll(): number {
    if (defined(document)) {
        return document[
            defined(document.scrollingElement)
                ? "scrollingElement"
                : defined(document.documentElement)
                ? "documentElement"
                : "body"
            ].scrollTop;
    } else {
        return 0;
    }
}
