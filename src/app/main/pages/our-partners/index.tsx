import * as React from 'react';
import {ITeamMemberProps} from '../shared';
const s = require('./OurPartners.css');

interface IProps {}

const IMAGE_ROOT = '/images/partners';

const PARTNERS: ITeamMemberProps[] = [
    {
        name: 'Exist',
        image: `${IMAGE_ROOT}/Exist.jpg`
    },
    {
        name: 'Huberlin',
        image: `${IMAGE_ROOT}/Huberlin.png`
    },
    {
        name: 'Intel',
        image: `${IMAGE_ROOT}/Intel.jpg`
    },
    {
        name: 'Optibase',
        image: `${IMAGE_ROOT}/Optibase.gif`
    }
];

export function OurPartners(props: IProps) {
    return (
        <section className={s.ourPartners}>
            {PARTNERS.map((member, i) =>
                <img
                    key={`partner-${i}`}
                    className={s.image}
                    style={{
                        maxHeight: 100,
                        verticalAlign: 'middle'
                    }}
                    src={member.image}
                    alt={member.name}
                />
            )}
        </section>
    );
}
