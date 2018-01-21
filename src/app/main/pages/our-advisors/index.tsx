import * as React from 'react';
import {ITeamMemberProps, TeamMember} from '../shared';
import {TransitionStaggerItem} from '../../../widgets';

interface IProps {
    isTriggered?: boolean;
}

const IMAGE_ROOT = '/images/advisors';

const TEAM: ITeamMemberProps[] = [
    {
        name: 'Prof. Bjorn Scheuermann',
        position: 'Exist Program Mentor',
        image: `${IMAGE_ROOT}/Bjorn.jpg`
    },
    {
        name: 'Manny Hirsch',
        position: 'CEO, Cidev Group',
        image: `${IMAGE_ROOT}/Manny.jpg`
    }
];

export function OurAdvisors(props: IProps) {
    const springValue = props.isTriggered ? 1 : 0;

    return (
        <section>
            <h2>Our Advisors</h2>
            <TransitionStaggerItem
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
