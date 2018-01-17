import * as React from 'react';
import {ITeamMemberProps, TeamMember} from '../shared/TeamMember';

interface IProps {
    docScroll: number;
}

const IMAGE_ROOT = '/images/team';

const TEAM: ITeamMemberProps[] = [
    {
        name: 'Ran Oren',
        position: 'Founder & Principal Manger',
        image: `${IMAGE_ROOT}/Ran.png`
    },
    {
        name: 'Eran Keren',
        position: 'Chief Technology Officer',
        image: `${IMAGE_ROOT}/Eran.png`
    },
    {
        name: 'Hindol Rakshit',
        position: 'Data Scientist',
        image: `${IMAGE_ROOT}/Hindol.png`
    },
    {
        name: 'Andrew Bryson',
        position: 'Front-end Dev',
        image: `${IMAGE_ROOT}/Andrew.png`
    }
];

export function OurTeam(props: IProps) {
    return (
        <section>
            <h2 style={{paddingBottom: 35}}>Our Team</h2>
            {TEAM.map((member, i) =>
                <TeamMember
                    key={`TeamMember-${i}`}
                    name={member.name}
                    position={member.position}
                    image={member.image}
                    docScroll={props.docScroll}
                />
            )}
        </section>
    );
}
