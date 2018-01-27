import * as React from 'react';
import {colors} from '../../../data/themeOptions';

interface IProps {
    color?: string;
    radius?: number;
    fontSize?: number;
}

const defaultRadius = 200;

interface IState {}

export class CircleText extends React.Component<IProps, IState> {

    render(): JSX.Element {
        const { radius, fontSize, color, children } = this.props;
        const r = radius || defaultRadius;
        return (
            <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox={`0 0 ${r * 2} ${r * 2}`}
            >
                <defs>
                    <path d={`M0, ${r}a${r}, ${r} 0 1, 0 ${r * 2}, 0a${r}, ${r} 0 1, 0 ${-r * 2}, 0`} id="txt-path"/>
                </defs>
                <text fill={color || colors.faint} fontSize={fontSize || 25}>
                    <textPath startOffset="0" xlinkHref="#txt-path">
                        {children}
                    </textPath>
                </text>
            </svg>
        );
    }
}
