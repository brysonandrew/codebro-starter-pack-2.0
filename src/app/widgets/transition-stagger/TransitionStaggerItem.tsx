import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {defined} from '../../../utils/variable_evaluation';
const s = require('./TransitionStagger.css');

interface IProps {
    springValue: number;
    display?: string;
    column: JSX.Element[];
}

export function TransitionStaggerItem(props: IProps) {
    const { display, column, springValue } = props;
    return (

            <StaggeredMotion
                defaultStyles={column.map((_) => ({y: 0}))}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                    i === 0
                        ? {y: spring(springValue)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                )}
            >
                {interpolatingStyles =>
                    <div>
                        {interpolatingStyles.map((subStyle, index) =>
                            <div
                                key={`component-${index}`}
                                style={{
                                    display: defined(display) ? display : 'inline-block',
                                    opacity: subStyle.y,
                                    transform: `translate3d(0, ${(subStyle.y - 1) * -100}px, 0)`
                                }}
                            >
                                {column[index]}
                            </div>
                        )}
                    </div>}
            </StaggeredMotion>
    );
}
