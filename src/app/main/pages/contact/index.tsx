import * as React from 'react';
import { ContactSocialMedia } from './ContactSocialMedia';
import {createArray} from '../../../../utils/array';
import {ARROW_DOWN_SVG} from '../../../widgets/ArrowDown';
const s = require('./Contact.css');
const MASK_CONFIGS = {
    frames: 17,
    size: 500
};

const MASK_INC = MASK_CONFIGS.size / MASK_CONFIGS.frames;
const MASK_BREAKPOINTS = createArray(MASK_CONFIGS.frames).map((_, i) => i * MASK_INC);

function frameBreak(x) {
    return MASK_BREAKPOINTS.filter((breakpoint, i) => {
        return breakpoint > x && MASK_BREAKPOINTS[i - 1] < x;
    }).pop();
}

interface IProps {
    docScroll?: number;
    sectionScroll?: number;
    isTriggered?: boolean;
    scrollTarget?: number;
}

export function Contact(props: IProps) {
    const { sectionScroll, isTriggered } = props;

    const startSecitonScroll = sectionScroll + 200 + MASK_CONFIGS.size;

    const maskPercentage = frameBreak(startSecitonScroll) / MASK_CONFIGS.size * 100;
    const maskPosition = `${maskPercentage}% 50%`;

    return (
        <section
            className={s.contact}
            style={{
                opacity: startSecitonScroll > 0 ? 1 : 0,
                maskPosition: maskPosition,
                WebkitMaskPosition: maskPosition
            }}
        >
            <img className={s.image} src='/images/about/profile.jpg'/>
            <div className={s.description}>
                <h2>Andrew [KOZM]</h2>
                <p>Driven by the satisfaction producing something that is both pleasing to the eye and does something useful.</p>
                <p>Wish to make contact? Send a sign.</p>
                <div className={s.arrow}>{ARROW_DOWN_SVG}</div>
            </div>
            <ContactSocialMedia/>
        </section>
    );
}
