import * as React from 'react';
import {Intro} from './intro/index';
import {OurTeam} from './our-team/index';
import {EOrientation, Line} from '../../widgets/Line';
import {OurAdvisors} from './our-advisors/index';
import {INTRO_HEIGHT} from './intro/Intro';
import {colors} from '../../../data/themeOptions';
import {OurPartners} from './our-partners/index';
import {Footer} from './footer/Footer';

interface IProps {
    isParentMounted: boolean;
    docScroll: number;
}

export const pages: string[] = [
    'Intro',
    'Our Team'
];

const line = (isParentMounted) => <Line
    isInvisible={!isParentMounted}
    orientation={EOrientation.Horizontal}
/>;

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
                {line(isParentMounted)}
                <OurTeam/>
                {line(isParentMounted)}
                <OurAdvisors/>
                {line(isParentMounted)}
                <OurPartners/>
                {line(isParentMounted)}
                <Footer/>
            </div>
        </div>
    );
}
