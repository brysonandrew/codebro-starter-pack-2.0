import * as React from 'react';
const s = require('./TeamMember.css');

export interface ITeamMemberProps {
    name: string;
    position: string;
    image: string;
}

export function TeamMember(props: ITeamMemberProps) {
    return (
        <div className={s.teamMember}>
            <img className={s.image} src={props.image}/>
            <div className={s.name}>{props.name}</div>
            <div className={s.position}>{props.position}</div>
        </div>
    );
}
