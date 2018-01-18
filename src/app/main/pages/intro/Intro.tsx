import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {Logo} from '../../../widgets/Logo';
import {TransitionColumn} from '../../../widgets/transition-column/TransitionColumn';
const s = require('./Intro.css');
export const INTRO_HEIGHT = 650;

const COLUMNS: JSX.Element[][] = [
    [
        <div className={s.logo}>
            <Logo/>
        </div>,
        <h1 className={s.heading}>
            SourcingBot
        </h1>,
        <h2 className={s.subHeading}>
            Procurement Risk Management
        </h2>
    ],
    [
        <p className={s.description}>
            A risk management platform for Original equipment manufacturers to manage their sourcing process in a better way.
        </p>,
        <p className={s.description}>
            SourcingBot manages all aspects of your bill of material, reducing risks related to manufacturing processes.
        </p>
    ]
];

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
    docScroll: number;
}

export function Intro(props: IProps) {
    const { docScroll } = props;
    const springValue = 1;
    return (
        <section
            className={s.section}
            style={{
                transform: docScroll > INTRO_HEIGHT * 1.5 ?  'none' : `translateY(${docScroll / INTRO_HEIGHT * INTRO_HEIGHT * 0.5}px)`,
                filter: docScroll > INTRO_HEIGHT * 1.5 ?  'none' : `blur(${docScroll / INTRO_HEIGHT * 10}px)`,
                transition: 'transform 100ms'
            }}
        >
            <div className={s.backgroundOne}/>
            <div className={s.backgroundTwo}/>
            <TransitionColumn
                springValue={springValue}
                columns={COLUMNS}
            />
        </section>
    );
}
