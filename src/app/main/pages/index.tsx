import * as React from 'react';
import {defined} from '../../../utils';
import {ELineOrientation, Line} from '../../widgets';
import {Intro} from './intro';
import {Work} from './work';
import {Footer} from './footer/index';

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
    height: number;
    docScroll: number;
}

export const MAIN_PAGES = [
    {
        name: 'Work',
        component: <Work/>
    },
    {
        name: 'Contact',
        component: <Footer/>
    }
];

const line = (isParentMounted) => <Line
    isInvisible={!isParentMounted}
    orientation={ELineOrientation.Horizontal}
/>;

export class Pages extends React.Component<IProps, {}> {

    topOffsets = [];
    triggered = [];

    componentDidMount() {
        // console.log(this.clientRectPages);
    }

    isTriggered(i: number) {
        const isAlreadyTriggered = defined(this.triggered[i]);
        const isAboveThreshold = defined(this.topOffsets[i])
            ? this.props.docScroll > (this.topOffsets[i] + this.props.height * 0.25)
            : false;
        if (!isAlreadyTriggered && isAboveThreshold) {
            this.triggered.push(true);
        }
        return this.triggered[i]
    }

    render(): JSX.Element {
        const { isParentMounted, isTablet, docScroll } = this.props;

        return (
            <div>
                <Intro/>
                {MAIN_PAGES.map((page, i) =>
                    <div
                        key={`page-${i}`}
                        ref={el => defined(el) && (this.topOffsets[i] = el.offsetTop)}
                    >
                        {React.cloneElement(page.component, {
                            docScroll: docScroll,
                            isTriggered: this.isTriggered(i)
                        })}
                        {line(isParentMounted)}
                    </div>)}
            </div>
        );
    }
}
