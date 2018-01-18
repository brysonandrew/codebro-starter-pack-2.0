import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {TransitionColumnItem} from './TransitionColumnItem';
const s = require('./TransitionColumn.css');
export const TRANSITION_SCROLLING_BUFFER = 200;

export interface ITransitionColumn {
    components: JSX.Element[];
}

export interface ITransitionColumnProps {
    springValue: number;
    columns: ITransitionColumn[];
}

export function TransitionColumn(props: ITransitionColumnProps) {
    const { springValue , columns} = props;
    return (
        <div className={s.transitionColumn}>
            <StaggeredMotion
                defaultStyles={columns.map((_) => ({y: 0}))}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                    i === 0
                        ? {y: spring(springValue)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                )}
            >
                {interpolatingStyles =>
                    <div>
                        {interpolatingStyles.map((mainStyle, mainIndex) => (
                            <TransitionColumnItem
                                key={`TransitionColumnItem-${mainIndex}`}
                                style={mainStyle}
                                index={mainIndex}
                                {...props}
                            />
                        ))}
                    </div>
                }
            </StaggeredMotion>
        </div>
    );
}
