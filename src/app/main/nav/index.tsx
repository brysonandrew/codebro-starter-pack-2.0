import * as React from 'react';
const s = require('./Nav.css');
import {NavLinks} from './NavLinks';
import {IDictionary, IParams} from '../../../data/models';
import {exists} from '../../../utils/variable_evaluation';
import {APPROACHING_PAGE_BUFFER} from '../pages/index';

export const NAV_DIMENSIONS = {
    height: 80,
    paddingY: 10,
    paddingX: 22
};

interface IProps {
    isWheel: boolean;
    isAnimating: boolean;
    height: number;
    docScroll: number;
    savedParams: IParams;
    topOffsetDictionary: IDictionary<number>;
    onAnimationStart: () => void;
}

function navClass(savedParams, topOffsetDictionary, docScroll, isWheel, isAnimating) {
    const path = exists(savedParams.activePagePath)
        ? savedParams.activePagePath
        : 'intro';
    const offset = topOffsetDictionary[path] - (NAV_DIMENSIONS.height + NAV_DIMENSIONS.paddingY * 2) - APPROACHING_PAGE_BUFFER;
    const isInRouteRange = isBetween(offset, offset + 400, docScroll);

    const additionalClass = isInRouteRange && !isWheel && !isAnimating ? '' : s.dot;

    return `${s.nav} ${additionalClass} light-background`;
}

function isBetween(min: number, max: number, val: number) {
    return min < val && val < max;
}

export function Nav(props: IProps) {
    const { savedParams, topOffsetDictionary, docScroll, isWheel, isAnimating } = props;
    return (
        <div
            className={navClass(savedParams, topOffsetDictionary, docScroll, isWheel, isAnimating)}
            style={{
                height: NAV_DIMENSIONS.height,
                padding: `${NAV_DIMENSIONS.paddingY}px ${NAV_DIMENSIONS.paddingX}px`
            }}
        >
            <NavLinks
                isSingleMenu={docScroll > 200}
                activePagePath={savedParams.activePagePath}
                onAnimationStart={props.onAnimationStart}
            />
            <div className={s.line}/>
        </div>
    );
}
