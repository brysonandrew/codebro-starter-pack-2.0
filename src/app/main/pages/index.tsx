import * as React from 'react';
import {Intro} from './Intro';

interface IProps {}

export const pages: string[] = [
    'Intro'
];

export function Pages(props: IProps) {
    return (
        <div>
            <Intro/>
        </div>
    );
}
