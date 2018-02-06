import * as React from 'react';
import { browserHistory } from 'react-router';
import {defined} from '../../../utils';
import {ELineOrientation, Line} from '../../widgets';
import {Intro} from './intro';
import {Work} from './work';
import {Footer} from './footer/index';
import {toPath} from '../../../utils/routing';
import {IParams} from '../../../data/models';
import {renderIfTrue} from '../../../utils/react';
import {MotionScroll} from '../../widgets/motion-scroll/MotionScroll';
import {Nav, NAV_DIMENSIONS} from '../nav/index';
import {Tech} from './tech/index';
const APPROACHING_PAGE_BUFFER = 200;

interface IProps {
    isParentMounted: boolean;
    isAnimating: boolean;
    isTablet: boolean;
    width: number;
    height: number;
    docScroll: number;
    savedParams?: IParams;
    onAnimationEnd?: () => void;
    onAnimationStart?: () => void;
}

export const MAIN_PAGES = [
    {
        name: 'Tech',
        component: <Tech/>
    },
    {
        name: 'Work',
        component: <Work/>
    },
    {
        name: 'Contact',
        component: <Footer/>
    }
];

export const MAIN_PAGE_PATHS = MAIN_PAGES.map((page) => toPath(page.name));

const line = (isParentMounted) => <Line
    isInvisible={!isParentMounted}
    orientation={ELineOrientation.Horizontal}
/>;

export class Pages extends React.Component<IProps, {}> {

    topOffsets = [];
    triggered = [];

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAnimating && this.props.docScroll !== nextProps.docScroll) {
            this.changePagePathOnScroll();
        }
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

    private changePagePathOnScroll() {
        const { savedParams } = this.props;

        const pagesScrolledPastOffsets = this.topOffsets.filter(offset => (offset - APPROACHING_PAGE_BUFFER) < (!!document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);

        const currentIndex = (pagesScrolledPastOffsets.length > 0)
            ?   pagesScrolledPastOffsets.length - 1
            :   -1;

        if (currentIndex > -1) {

            const currentPath = MAIN_PAGE_PATHS[currentIndex];

            if (currentPath !== savedParams.activePagePath) {
                const nextPath = `/${currentPath}`;
                browserHistory.push(nextPath);

            }
        }
    }

    topOffsetDictionary() {
        return this.topOffsets.reduce((acc, curr, i) => {
            acc[MAIN_PAGE_PATHS[i]] = curr;
            return acc;
        }, {});
    }

    render(): JSX.Element {
        const { isParentMounted, isTablet, docScroll, width, height, isAnimating, savedParams, onAnimationStart, onAnimationEnd } = this.props;
        const isSelected = "activePagePath" in savedParams;
        const isOffsetsReady = (this.topOffsetDictionary != null);
        const isScrollReady = (isSelected && isOffsetsReady);

        return (
            <div
                style={{
                    position: 'relative',
                    paddingTop: NAV_DIMENSIONS.height + NAV_DIMENSIONS.paddingY * 2
                }}
            >
                <Nav
                    height={height}
                    docScroll={docScroll}
                    onAnimationStart={onAnimationStart}
                />
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
                {renderIfTrue(isScrollReady, () =>
                    <MotionScroll
                        docScroll={docScroll}
                        isAnimating={isAnimating}
                        scrollTarget={this.topOffsetDictionary()[savedParams.activePagePath] - (NAV_DIMENSIONS.height + NAV_DIMENSIONS.paddingY * 2)}
                        onRest={onAnimationEnd}
                    />)}
            </div>
        );
    }
}
