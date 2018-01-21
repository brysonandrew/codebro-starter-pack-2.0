import * as React from 'react';
import {colors} from '../../data/themeOptions';

export enum ELineOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
}

interface IProps {
    orientation?: ELineOrientation;
    color?: string;
    isInvisible?: boolean;
}

export function Line(props: IProps) {
    const { color, orientation, isInvisible } = props;
    return (
        <span
            style={{
                display: 'block',
                height: orientation === ELineOrientation.Vertical ? '100%' : 1,
                background: colors.hi,
                width: orientation === ELineOrientation.Vertical ? 1 : '100%',
                opacity: isInvisible ? 0 : 1,
                transition: '1000ms opacity 400ms'
            }}
        />
    )
}
