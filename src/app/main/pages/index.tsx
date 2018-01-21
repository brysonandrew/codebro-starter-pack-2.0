import * as React from 'react';
import {colors} from '../../../data';
import {defined} from '../../../utils';
import {ELineOrientation, Line} from '../../widgets';
import {Intro} from './intro';
import {OurTeam} from './our-team';
import {OurAdvisors} from './our-advisors';
import {OurPartners} from './our-partners';
import {Footer} from './footer';
import {Project} from './project';
import {ExamplePageOne} from './example-page-1';
import {ExamplePageTwo} from './example-page-2';

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
    height: number;
    docScroll: number;
}

export const pages: string[] = [
    'Intro',
    'Our Team'
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

    mainPages(): JSX.Element[] {
        return [
            <Project/>,
            <ExamplePageOne/>,
            <OurTeam/>,
            <OurAdvisors/>,
            <ExamplePageTwo/>,
            <OurPartners/>,
            <Footer
                isParentMounted={this.props.isParentMounted}
            />
        ]
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
                    {this.mainPages().map((page, i) =>
                        <div
                            key={`page-${i}`}
                            ref={el => defined(el) && (this.topOffsets[i] = el.offsetTop)}
                        >
                            {line(isParentMounted)}
                            {React.cloneElement(page, {
                                isTriggered: this.isTriggered(i)
                            })}
                        </div>)}
                </div>
            </div>
        );
    }
}
