import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {ITransitionColumnProps} from './TransitionColumn';
const s = require('./TransitionColumn.css');

interface IProps extends ITransitionColumnProps {
    style: any;
    index: number;
}

export function TransitionColumnItem(props: IProps) {
    const { style, index, springValue , columns } = props;
    return (
        <div
            className={s.side}
            style={{
                opacity: style.y,
                transform: `translate3d(0, ${(style.y - 1) * -100}px, 0)`
            }}
        >
            <StaggeredMotion
                defaultStyles={columns[index].components.map((_) => ({y: 0}))}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                    i === 0
                        ? {y: spring(springValue)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                )}
            >
                {interpolatingStyles =>
                    <div>
                        {interpolatingStyles.map((subStyle, subIndex) =>
                            <div
                                key={`component-${index}-${subIndex}`}
                                style={{
                                    opacity: subStyle.y,
                                    transform: `translate3d(0, ${(subStyle.y - 1) * -100}px, 0)`
                                }}
                            >
                                {columns[index].components[subIndex]}
                            </div>
                        )}
                    </div>}
            </StaggeredMotion>
        </div>
    );
}
