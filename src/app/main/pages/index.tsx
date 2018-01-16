import * as React from 'react';
import {Intro} from './Intro';

interface IProps {
    isParentMounted: boolean;
}

export const pages: string[] = [
    'Intro'
];

export function Pages(props: IProps) {
    const { isParentMounted } = props;
    return (
        <div>
            <Intro
                isParentMounted={isParentMounted}
            />
        </div>
    );
}
