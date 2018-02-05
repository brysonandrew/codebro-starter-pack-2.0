import * as React from 'react';
const s = require('./Nav.css');
import {NavLinks} from './NavLinks';
export const NAV_DIMENSIONS = {
    height: 80,
    paddingY: 10,
    paddingX: 22
};

interface IProps {
    height: number;
    docScroll: number;
    onAnimationStart: () => void;
}

function navClass(height, docScroll) {
    const isScrolled = 0 < docScroll;
    const additionalClass = isScrolled
        ? s.dot
        : '';
    return `${s.nav} ${additionalClass}`;
}

export function Nav(props: IProps) {
    const { height, docScroll } = props;
    return (
        <div
            className={navClass(height, docScroll)}
            style={{
                height: NAV_DIMENSIONS.height,
                padding: `${NAV_DIMENSIONS.paddingY}px ${NAV_DIMENSIONS.paddingX}px`
            }}
        >
            <NavLinks
                onAnimationStart={props.onAnimationStart}
            />
            <div className={s.line}/>
        </div>
    );
}
