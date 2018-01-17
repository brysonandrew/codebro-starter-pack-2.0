import * as React from 'react';
import {defined} from '../../../../utils/variable_evaluation';
import {INTRO_HEIGHT} from '../intro/Intro';
const s = require('./TeamMember.css');

export interface ITeamMemberProps {
    name: string;
    position?: string;
    image: string;
    docScroll?: number;
}

export function TeamMember(props: ITeamMemberProps) {
    return (
        <div
            style={{
                filter: (defined(props.docScroll) && props.docScroll < INTRO_HEIGHT)
                    ? `contrast(${props.docScroll / INTRO_HEIGHT * 100}%) blur(${props.docScroll / INTRO_HEIGHT * -10 + 10}px)`
                    : 'none'
            }}
            className={s.teamMember}
        >
            <img
                className={s.image}
                src={props.image}
                alt={`Team Member: ${props.name}`}
            />
            <div
                className={s.name}
            >
                {props.name}
            </div>
            <div
                className={s.position}
            >
                {props.position}
            </div>
        </div>
    );
}
