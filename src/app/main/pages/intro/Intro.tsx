import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {EOrientation, Line} from '../../../widgets/Line';
import {colors} from '../../../../data/themeOptions';
import {Logo} from '../../../widgets/Logo';
import {ITransitionColumn, TransitionColumn} from '../../../widgets/transition-column/TransitionColumn';
const s = require('./Intro.css');
export const INTRO_HEIGHT = 650;

const COLUMNS: ITransitionColumn[] = [
    {
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
    const springValue = docScroll > INTRO_HEIGHT * 0.5 ? 0 : 1;
    return (
        <section
            className={s.section}
            style={{filter: docScroll > INTRO_HEIGHT * 1.5 ?  'none' : `blur(${docScroll / INTRO_HEIGHT * 10}px)`}}
        >
            <div className={s.backgroundOne}/>
            <div className={s.backgroundTwo}/>
            {/*<div className={s.line}>*/}
                {/*<Line*/}
                    {/*orientation={EOrientation.Vertical}*/}
                    {/*isInvisible={!isParentMounted}*/}
                    {/*color={colors.gry}*/}
                {/*/>*/}
            {/*</div>*/}
            <TransitionColumn
                springValue={springValue}
                columns={COLUMNS}
            />
        </section>
    );
}
