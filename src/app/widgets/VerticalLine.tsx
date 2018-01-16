import * as React from 'react';
import {colors} from '../../data/themeOptions';

export enum EOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
}

interface IProps {
    orientation?: EOrientation;
    color?: string;
    isInvisible?: boolean;
}

export function Line(props: IProps) {
    const { color, orientation, isInvisible } = props;
    return (
        <span
            style={{
                display: 'block',
                height: orientation === EOrientation.Vertical ? '100%' : 1,
                background: color || colors.hi,
                width: orientation === EOrientation.Vertical ? 1 : '100%',
                opacity: isInvisible ? 0 : 1,
                transition: '1000ms opacity 400ms'
            }}
        />
    )
}
