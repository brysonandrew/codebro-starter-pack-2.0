import * as React from 'react';
import {Intro} from './Intro';
import {OurTeam} from './OurTeam';

interface IProps {
    isParentMounted: boolean;
    docScroll: number;
}

export const pages: string[] = [
    'Intro',
    'Our Team'
];

export function Pages(props: IProps) {
    const { isParentMounted, docScroll } = props;
    console.log(docScroll);
    return (
        <div>
            <Intro
                isParentMounted={isParentMounted}
            />
            <OurTeam/>
        </div>
    );
}
