import * as React from 'react';
import {createArray} from '../../../../utils/array';
const s = require('./About.css');
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

interface IState {}

export class About extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { sectionScroll, isTriggered } = this.props;

        const startSecitonScroll = sectionScroll + MASK_CONFIGS.size;

        const maskPercentage = frameBreak(startSecitonScroll) / MASK_CONFIGS.size * 100;
        const maskPosition = `${maskPercentage}% 50%`;

        return (
            <section
                className={s.section}
                style={{
                    height: MASK_CONFIGS.size,
                    opacity: startSecitonScroll > 0 ? 1 : 0,
                    maskPosition: maskPosition,
                    WebkitMaskPosition: maskPosition
                }}
            >
                <img className={s.image} src='/images/about/profile.jpg'/>
                <div className={s.description}>
                    <h2>Andrew (codename: KOZM)</h2>
                    <p>Driven by the satisfaction producing something that is both pleasing to the eye and does something useful.</p>
                </div>
            </section>
        );
    }
}
