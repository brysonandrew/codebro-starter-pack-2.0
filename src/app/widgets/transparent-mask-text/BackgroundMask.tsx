import * as React from 'react';
const s = require('./TransparentMaskText.css');

interface IProps {
    width: number;
    height: number;
    headingFontSize: number;
    subHeadingFontSize: number;
}

export function BackgroundMask(props: IProps) {
    return (
        <mask
            className={s.mask}
            id="mask"
            x="0"
            y="0"
            width={props.width}
            height={props.height}
        >
            <rect
                className={s.maskBody}
                x="0"
                y="0"
                width={props.width}
                height={props.height}
            />
            <text
                className={s.text}
                fontSize={props.headingFontSize}
                x={props.width * 0.5}
                y={props.height * 0.6}
            >
                KOZM
            </text>
            <text
                className={s.text}
                fontSize={props.subHeadingFontSize}
                x={props.width * 0.5}
                y={props.height * 0.6 + props.subHeadingFontSize}
            >
                WEB CREATIONS FROM BEYOND
            </text>
        </mask>
    );
}
