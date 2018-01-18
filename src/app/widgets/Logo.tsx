import * as React from 'react';
import {LOGO_SVG} from '../../data/icons/logo';

interface IProps {}

export function Logo(props: IProps) {
    return (
        <div
            style={{
                display: "inline-block",
                width: 100,
                height: 100
            }}
        >
            {LOGO_SVG}
        </div>
    );
}
