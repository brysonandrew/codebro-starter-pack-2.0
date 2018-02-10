import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import createHistory from 'history/createBrowserHistory';
const s = require('./Main.css');
import {toParams, defined} from '../../utils';
import {IParams} from "../../data";
import {IStore} from '../../redux';
import {changeViewportDimensions, saveParams, toggleScrollAnimation, toggleWheel} from './main-action-creators';
import {Pages} from './pages';
import {docScroll} from '../../utils/scroll';

interface IProperties {
    savedParams?: IParams;
    savedLocation?: Location;
    isPreviewExtended?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    isLaptop?: boolean;
    isWheel?: boolean;
    isAnimating?: boolean;
    width?: number;
    height?: number;
}

interface ICallbacks {
    onLocationListen?: (nextParams: IParams) => void
    onLoad?: (nextParams: IParams) => void
    onWheel?: () => void;
    onWheelStop?: () => void;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    onResizeViewport?: (width: number, height: number) => void
    onArrowNavigate?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean;
    docScroll: number;
}

export class Main extends React.Component<IProps, IState> {

    activeTimeout;
    mountTimeout;
    scrollTimeout;
    scrollTimeoutStopDelay;
    isWheelRecorded;
    isIdle = true;
    isFirstRender = true;

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            docScroll: 0
        };
    }

    componentDidMount() {
        const { onResizeViewport, onLocationListen, onLoad } = this.props;

        this.isFirstRender = false;
 // reset window pos
        window.scroll(0, 0);

        const history = createHistory();
// initial save params
        onLoad(toParams(history.location.pathname));
// listen to future params
        browserHistory.listen( location =>  {

            onLocationListen(
                toParams(location.pathname)
            );

        });
        this.mountTimeout = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("wheel", this.handleWheel);
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillUnmount() {
        const { onResizeViewport } = this.props;

        if (defined(this.activeTimeout)) {
            clearTimeout(this.activeTimeout);
            this.activeTimeout = false;
        }
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("wheel", this.handleWheel);
        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));

    }

    private handleScroll = () => {
        this.setState({docScroll: docScroll()});
    };

    private handleWheel = () => {
        if (!this.isWheelRecorded) {
            this.props.onWheel();
            this.isWheelRecorded = true;
        }
        // detect wheel stop
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.props.onWheelStop();
            this.isWheelRecorded = false;
        }, this.scrollTimeoutStopDelay);
        if (this.props.isAnimating) {
            this.setState({docScroll: docScroll()});
        }
    };

    render(): JSX.Element {
        const { isMounted, docScroll } = this.state;
        const { isTablet, width, height, isAnimating, isWheel, savedParams, onAnimationStart, onAnimationEnd } = this.props;

        return (
            <div className={s.main}>
                <div className={s.container}>
                    <Pages
                        isParentMounted={isMounted}
                        isWheel={isWheel}
                        isAnimating={isAnimating}
                        isTablet={isTablet}
                        width={width}
                        height={height}
                        docScroll={docScroll}
                        savedParams={savedParams}
                        onAnimationEnd={onAnimationEnd}
                        onAnimationStart={onAnimationStart}
                    />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isWheel: state.homeStore.isWheel,
        isAnimating: state.homeStore.isAnimating,
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch): ICallbacks {
    return {
        onLoad: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onWheel: () => {
            dispatch(toggleWheel(true));
        },
        onWheelStop: () => {
            dispatch(toggleWheel(false));
        },
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        },
        onAnimationEnd: () => {
            dispatch(toggleScrollAnimation(false));
        },
        onLocationListen: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onArrowNavigate: (nextParams) => {
            dispatch(saveParams(nextParams));
            dispatch(toggleScrollAnimation(true));
        }
    };
}

export const MainFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Main);
