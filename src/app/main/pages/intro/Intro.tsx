import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {EOrientation, Line} from '../../../widgets/Line';
import {colors} from '../../../../data/themeOptions';
import {Logo} from '../../../widgets/Logo';
import {renderIfFalse} from '../../../../utils/react';
const s = require('./Intro.css');
export const INTRO_HEIGHT = 650;

interface IIntroContent {
    side: string;
    components: JSX.Element[]
}

const CONTENT: IIntroContent[] = [
    {
        side: 'one',
        components: [
            <Logo/>,
            <h1 className={s.heading}>
                SourcingBot
            </h1>,
            <h2 className={s.subHeading}>
                Procurement Risk Management
            </h2>
        ]
    },
    {
        side: 'two',
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

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
    docScroll: number;
}

export function Intro(props: IProps) {
    const { isParentMounted, docScroll } = props;
    return (
        <section
            className={s.section}
            style={{filter: docScroll > INTRO_HEIGHT * 1.5 ?  'none' : `blur(${docScroll / INTRO_HEIGHT * 10}px)`}}
        >
            <div className={s.line}>
                <Line
                    orientation={EOrientation.Vertical}
                    isInvisible={!isParentMounted}
                    color={colors.gry}
                />
            </div>
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
                                (CONTENT[mainIndex].side === 'one')
                                    ?   <div
                                            key={`style-${mainIndex}`}
                                            style={{
                                                opacity: mainStyle.y,
                                                transform: `translate3d(0, ${(mainStyle.y - 1) * -100}px, 0)`
                                            }}
                                            className={`${s.side} ${s.sideOne}`}
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
                                            className={`${s.side} ${s.sideTwo}`}
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
        </section>
    );
}
