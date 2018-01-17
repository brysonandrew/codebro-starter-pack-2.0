import * as React from 'react';
import {Intro} from './intro/index';
import {OurTeam} from './our-team/index';
import {EOrientation, Line} from '../../widgets/Line';
import {OurAdvisors} from './our-advisors/index';
import {INTRO_HEIGHT} from './intro/Intro';
import {colors} from '../../../data/themeOptions';
import {OurPartners} from './our-partners/index';
import {Footer} from './footer/Footer';
import {renderIfTrue} from '../../../utils/react';
import {Project} from './project/Project';

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
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
    const { isParentMounted, isTablet, docScroll } = props;
    return (
        <div>
            <Intro
                isParentMounted={isParentMounted}
                isTablet={isTablet}
                docScroll={docScroll}
            />
            <div style={{
                position: 'relative',
                background: colors.wht,
                zIndex: 1
            }}>
                {line(isParentMounted)}
                <OurTeam
                    docScroll={docScroll}
                />
                {line(isParentMounted)}
                <OurAdvisors/>
                {line(isParentMounted)}
                <Project/>
                {line(isParentMounted)}
                <OurPartners/>
                {line(isParentMounted)}
                <Footer
                    isParentMounted={isParentMounted}
                />
            </div>
        </div>
    );
}
