import * as React from 'react';
import { browserHistory } from 'react-router';
import {defined} from '../../../utils';
import {ELineOrientation, Line} from '../../widgets';
import {Intro} from './intro';
import {Work} from './work';
import {Contact} from './contact/index';
import {toPath} from '../../../utils/routing';
import {IDictionary, IParams} from '../../../data/models';
import {renderIfTrue} from '../../../utils/react';
import {MotionScroll} from '../../widgets/motion-scroll/MotionScroll';
import {Nav, NAV_DIMENSIONS} from '../nav/index';
import {Tech} from './tech/index';
import {docScroll} from '../../../utils/scroll';
import {arrayToDictionary} from '../../../utils/array';
import {exists} from '../../../utils/variable_evaluation';
export const APPROACHING_PAGE_BUFFER = 200;
const TOTAL_NAV_HEIGHT = (NAV_DIMENSIONS.height + NAV_DIMENSIONS.paddingY * 2);

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

export interface IPage {
    name: string;
    path: string;
    component: JSX.Element;
}

function Page(name, component) {
    this.name = name;
    this.path = toPath(this.name);
    this.component = component;
}

export const MAIN_PAGES: IPage[] = [
    new Page('Tech', <Tech/>),
    new Page('Work', <Work/>),
    new Page('Contact', <Contact/>)
];

export const MAIN_PAGE_PATHS = MAIN_PAGES.map((page) => page.path);
export const MAIN_PAGES_NAME_DICT: IDictionary<IPage> = arrayToDictionary(MAIN_PAGES, "path", "name");

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
            ? this.props.docScroll > (this.topOffsets[i] - TOTAL_NAV_HEIGHT - APPROACHING_PAGE_BUFFER)
            : false;
        if (!isAlreadyTriggered && isAboveThreshold) {
            this.triggered.push(true);
        }
        return this.triggered[i]
    }

    private changePagePathOnScroll() {
        const { savedParams } = this.props;

        const pagesScrolledPastOffsets = this.topOffsets.filter(offset =>
            (offset - APPROACHING_PAGE_BUFFER) < docScroll());

        const currentIndex = (pagesScrolledPastOffsets.length > 0)
            ?   pagesScrolledPastOffsets.length - 1
            :   -1;

        if (currentIndex > -1) {

            const currentPath = MAIN_PAGE_PATHS[currentIndex];

            if (currentPath !== savedParams.activePagePath) {
                const nextPath = `/${currentPath}`;
                browserHistory.push(nextPath);
            }

        } else if (exists(savedParams.activePagePath)) {
            browserHistory.push('/');
        }
    }

    topOffsetDictionary(): IDictionary<number> {
        return this.topOffsets.reduce((acc, curr, i) => {
            acc[MAIN_PAGE_PATHS[i]] = curr;
            return acc;
        }, {});
    }

    render(): JSX.Element {
        const { isParentMounted, docScroll, width, height, isAnimating, savedParams, onAnimationStart, onAnimationEnd } = this.props;
        const isSelected = "activePagePath" in savedParams;
        const isOffsetsReady = (this.topOffsetDictionary != null);
        const isScrollReady = (isSelected && isOffsetsReady);
        const scrollTarget = this.topOffsetDictionary()[savedParams.activePagePath] - TOTAL_NAV_HEIGHT;

        return (
            <div
                style={{
                    position: 'relative',
                    paddingTop: TOTAL_NAV_HEIGHT
                }}
            >
                <Nav
                    height={height}
                    docScroll={docScroll}
                    savedParams={savedParams}
                    topOffsetDictionary={this.topOffsetDictionary()}
                    onAnimationStart={onAnimationStart}
                />
                <Intro
                    width={width}
                />
                {MAIN_PAGES.map((page, i) =>
                    <div
                        key={`page-${i}`}
                        ref={el => defined(el) && (this.topOffsets[i] = el.offsetTop)}
                    >
                        {React.cloneElement(page.component, {
                            scrollTarget: scrollTarget,
                            docScroll: docScroll,
                            sectionScroll: exists(this.topOffsets[i]) ? (docScroll - this.topOffsets[i] - TOTAL_NAV_HEIGHT) : 0,
                            isTriggered: this.isTriggered(i)
                        })}
                        {line(isParentMounted)}
                    </div>)}
                {renderIfTrue(isScrollReady, () =>
                    <MotionScroll
                        docScroll={docScroll}
                        isAnimating={isAnimating}
                        scrollTarget={scrollTarget}
                        onRest={onAnimationEnd}
                    />)}
            </div>
        );
    }
}
