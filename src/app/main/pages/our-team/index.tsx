import * as React from 'react';
import {ITeamMemberProps, TeamMember} from '../shared/TeamMember';
import {defined} from '../../../../utils/variable_evaluation';
import {TransitionColumnItem} from '../../../widgets/transition-column/TransitionColumnItem';
import {TRANSITION_SCROLLING_BUFFER} from '../../../widgets/transition-column/TransitionColumn';

interface IProps {
    isTriggered?: boolean;
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
    const springValue = props.isTriggered ? 1 : 0;

    return (
        <section>
            <h2>Our Team</h2>
            <TransitionColumnItem
                springValue={springValue}
                column={TEAM.map((member, i) =>
                    <TeamMember
                        key={`TeamMember-${i}`}
                        name={member.name}
                        position={member.position}
                        image={member.image}
                    />
                )}
            />
        </section>
    );
}
