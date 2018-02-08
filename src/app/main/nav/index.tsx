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
    height: number;
    docScroll: number;
    savedParams: IParams;
    topOffsetDictionary: IDictionary<number>;
    onAnimationStart: () => void;
}

function navClass(savedParams, topOffsetDictionary, docScroll) {
    let additionalClass = '';

    if (exists(savedParams)) {
        const isScrolled = 0 < docScroll;
        const offset = topOffsetDictionary[savedParams.activePagePath] - (NAV_DIMENSIONS.height + NAV_DIMENSIONS.paddingY * 2) - APPROACHING_PAGE_BUFFER;
        const isInRouteRange = isBetween(offset, offset + 400, docScroll);

        if (isScrolled) {
            additionalClass = s.dot;

            if (isInRouteRange) {
                additionalClass = '';
            }

        }
    }

    return `${s.nav} ${additionalClass} light-background`;
}

function isBetween(min: number, max: number, val: number) {
    return min < val && val < max;
}

export function Nav(props: IProps) {
    const { savedParams, topOffsetDictionary, docScroll } = props;
    return (
        <div
            className={navClass(savedParams, topOffsetDictionary, docScroll)}
            style={{
                height: NAV_DIMENSIONS.height,
                padding: `${NAV_DIMENSIONS.paddingY}px ${NAV_DIMENSIONS.paddingX}px`
            }}
        >
            <NavLinks
                docScroll={docScroll}
                activePagePath={savedParams.activePagePath}
                onAnimationStart={props.onAnimationStart}
            />
            <div className={s.line}/>
        </div>
    );
}
