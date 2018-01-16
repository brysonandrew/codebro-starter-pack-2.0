import * as React from 'react';
import {colors} from '../../data/themeOptions';

interface IProps {
    color?: string;
    isInvisible?: boolean;
}

export function Border(props: IProps) {
    return (
        <span
            style={{
                display: 'block',
                height: 1,
                background: props.color || colors.hi,
                width: '100%',
                opacity: props.isInvisible ? 0 : 1,
                transition: '1000ms opacity 400ms'
            }}
        />
    )
}
