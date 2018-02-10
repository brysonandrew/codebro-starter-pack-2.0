import * as React from "react";
import {colors} from '../themeOptions';

const COLOR = colors.dark;

const SVG_PROPS = {
    width: '100%',
    height: '100%',
    viewBox: '0 0 100 100'
};

export const ARROW_SVG = {
    up: <svg {...SVG_PROPS}><polygon width='50px' height='50px' fill={COLOR} points="41.7 54.2 48.7 47.6 55.7 54.2 54.2 55.6 48.7 50.3 43.2 55.6 "/></svg>,
    down: <svg {...SVG_PROPS}><polygon width='50px' height='50px' fill={COLOR} points="55.7 76.8 48.7 83.4 41.7 76.8 43.2 75.4 48.7 80.7 54.2 75.4 "/></svg>
};

const ARROW_STYLE = {
    p: {
        display: 'inline-block',
        height: 10,
        width: 10,
        borderStyle: 'solid',
        borderWidth: '1px 1px 0 0'
    },
    top: {
        transform: 'rotate(-45deg)'
    },
    bottom: {
        transform: 'rotate(135deg)'
    },
    left: {
        transform: 'rotate(45deg)'
    },
    right: {
        transform: 'rotate(45deg)'
    }
};

export function ARROW_CSS(pos: string) {
    return <span style={{...ARROW_STYLE.p, ...ARROW_STYLE[pos]}}/>;
}
