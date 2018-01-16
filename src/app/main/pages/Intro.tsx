import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {EOrientation, Line} from '../../widgets/VerticalLine';
import {colors} from '../../../data/themeOptions';
const s = require('./Intro.css');

interface IIntroContent {
    side: string;
    components: JSX.Element[]
}

const CONTENT: IIntroContent[] = [
    {
        side: 'left',
        components: [
            <h1 className={s.heading}>
                Sourcing Bot
            </h1>,
            <h2 className={s.subHeading}>
                Procurement Risk Management
            </h2>
        ]
    },
    {
        side: 'right',
        components: [
            <p className={s.description}>
                A risk management platform for Original equipment manufacturers to manage their sourcing process in a better way.
            </p>,
            <p className={s.description}>
                SourcingBot manages all aspects of your bill of material, reducing risks related to manufacturing processes.
            </p>
        ]
    }
];

interface IProps {}

export function Intro(props: IProps) {
    return (
        <section className={s.section}>
            <div className={s.content}>
                <StaggeredMotion
                    defaultStyles={CONTENT.map((content) => ({y: 0}))}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                        i === 0
                            ? {y: spring(1)}
                            : {y: spring(prevInterpolatedStyles[i - 1].y)}
                    )}
                >
                    {interpolatingStyles =>
                        <div>
                            {interpolatingStyles.map((mainStyle, mainIndex) =>
                                (CONTENT[mainIndex].side === 'left')
                                    ?   <div
                                            key={`style-${mainIndex}`}
                                            style={{
                                                opacity: mainStyle.y,
                                                transform: `translate3d(0, ${(mainStyle.y - 1) * -100}px, 0)`
                                            }}
                                            className={`${s.side} ${s.leftSide}`}
                                        >
                                            <StaggeredMotion
                                                defaultStyles={CONTENT[mainIndex].components.map((content) => ({y: 0}))}
                                                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                                                    i === 0
                                                        ? {y: spring(1)}
                                                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                                                )}
                                            >
                                                {interpolatingStyles =>
                                                    <div>
                                                        {interpolatingStyles.map((subStyle, subIndex) =>
                                                            <div
                                                                key={`${CONTENT[mainIndex].side}-${subIndex}`}
                                                                style={{
                                                                    opacity: subStyle.y,
                                                                    transform: `translate3d(0, ${(subStyle.y - 1) * -100}px, 0)`
                                                                }}
                                                            >
                                                                {CONTENT[mainIndex].components[subIndex]}
                                                            </div>
                                                        )}
                                                    </div>}
                                            </StaggeredMotion>
                                        </div>
                                    :   <div
                                            key={`style-${mainIndex}`}
                                            style={{
                                                opacity: mainStyle.y,
                                                transform: `translate3d(0, ${(mainStyle.y - 1) * -100}px, 0)`
                                            }}
                                            className={`${s.side} ${s.right}`}
                                        >
                                            <StaggeredMotion
                                                defaultStyles={CONTENT[mainIndex].components.map((content) => ({y: 0}))}
                                                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                                                    i === 0
                                                        ? {y: spring(1)}
                                                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                                                )}
                                            >
                                                {interpolatingStyles =>
                                                    <div>
                                                        {interpolatingStyles.map((subStyle, subIndex) =>
                                                            <div
                                                                key={`${CONTENT[mainIndex].side}-${subIndex}`}
                                                                style={{
                                                                    opacity: subStyle.y,
                                                                    transform: `translate3d(0, ${(subStyle.y - 1) * -100}px, 0)`
                                                                }}
                                                            >
                                                                {CONTENT[mainIndex].components[subIndex]}
                                                            </div>
                                                        )}
                                                    </div>}
                                            </StaggeredMotion>
                                        </div>
                            )}
                        </div>
                    }
                </StaggeredMotion>
            </div>
            <Line orientation={EOrientation.Vertical} color={colors.gry}/>
        </section>
    );
}
