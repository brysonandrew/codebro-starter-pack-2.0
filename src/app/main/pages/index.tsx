import * as React from 'react';
import {Intro} from './intro/index';
import {OurTeam} from './our-team/index';
import {EOrientation, Line} from '../../widgets/Line';
import {OurAdvisors} from './our-advisors/index';
import {INTRO_HEIGHT} from './intro/Intro';
import {colors} from '../../../data/themeOptions';

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
    return (
        <div>
            <Intro
                isParentMounted={isParentMounted}
                docScroll={docScroll}
            />
            <div style={{
                transform: `translate3d(0, ${docScroll / INTRO_HEIGHT  * -500}px, 0)`,
                background: colors.wht
            }}>
                <Line
                    isInvisible={!isParentMounted}
                    orientation={EOrientation.Horizontal}
                />
                <OurTeam/>
                <Line
                    isInvisible={!isParentMounted}
                    orientation={EOrientation.Horizontal}
                />
                <OurAdvisors/>
                <Line
                    isInvisible={!isParentMounted}
                    orientation={EOrientation.Horizontal}
                />
            </div>
        </div>
    );
}
