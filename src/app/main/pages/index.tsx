import * as React from 'react';
import {colors} from '../../../data/themeOptions';
import {defined} from '../../../utils';
import {EOrientation, Line} from '../../widgets/Line';
import {Intro} from './intro/index';
import {OurTeam} from './our-team/index';
import {OurAdvisors} from './our-advisors/index';
import {OurPartners} from './our-partners/index';
import {Footer} from './footer/Footer';
import {Project} from './project/Project';
import {ExamplePageOne} from './example-page-1/ExamplePageOne';
import {ExamplePageTwo} from './example-page-2/ExamplePageTwo';

interface IProps {
    isParentMounted: boolean;
    isTablet: boolean;
    docScroll: number;
    clientRectPages: (values: ClientRect[]) => void;
}

export const pages: string[] = [
    'Intro',
    'Our Team'
];

const line = (isParentMounted) => <Line
    isInvisible={!isParentMounted}
    orientation={EOrientation.Horizontal}
/>;

export class Pages extends React.Component<IProps, {}> {

    clientRectPages = [];

    componentDidMount() {
        console.log(this.clientRectPages);
    }

    mainPages(): JSX.Element[] {
        const { isParentMounted, isTablet, docScroll } = this.props;
        return [
            <Project/>,
            <ExamplePageOne/>,
            <OurTeam/>,
            <OurAdvisors/>,
            <ExamplePageTwo/>,
            <OurPartners/>,
            <Footer
                isParentMounted={isParentMounted}
            />
        ]
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
                            ref={el => defined(el) && (this.clientRectPages[i] = el.getBoundingClientRect())}
                        >
                            {line(isParentMounted)}
                            {React.cloneElement(page, {
                                docScroll: docScroll,
                                parentClientRect: this.clientRectPages[i]
                            })}
                        </div>)}
                </div>
            </div>
        );
    }
}
