import * as React from 'react';
import {config} from '.';
const s = require('./TransparentMaskText.css');

interface IProps {}

export function BackgroundMask(props: IProps) {
    return (
        <mask
            className={s.mask}
            id="mask"
            x="0"
            y="0"
            width={config.width}
            height={config.height}
        >
            <rect
                className={s.maskBody}
                x="0"
                y="0"
                width={config.width}
                height={config.height}
            />
            <text
                className={s.text}
                fontSize={config.headingFontSize}
                x={config.width * 0.5}
                y={config.height * 0.6}
            >
                KOZM
            </text>
            <text
                className={s.text}
                fontSize={config.subHeadingFontSize}
                x={config.width * 0.5}
                y={config.height * 0.6 + config.subHeadingFontSize}
            >
                WEB CREATIONS FROM BEYOND
            </text>
        </mask>
    );
}
