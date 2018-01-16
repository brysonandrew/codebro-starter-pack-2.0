import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { IParams } from "../../data/models";
import { IStore } from '../../redux/IStore';
import { changeViewportDimensions, saveParams, toggleScrollAnimation } from './main-action-creators';
import { Pages } from './pages';
import { toParams } from '../../utils/routing';
import {defined} from '../../utils/variable_evaluation';

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    isPreviewExtended?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onLocationListen?: (nextParams: IParams) => void
    onLoad?: (nextParams: IParams) => void
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
    home;
    isIdle = true;
    isFirstRender = true;
    scrollMethod: number = document[!!document.scrollingElement ? "scrollingElement" : !!document.documentElement ? "documentElement" : "body"].scrollTop;

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
        window.addEventListener("wheel", this.handleScroll);
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
        window.removeEventListener("wheel", this.handleScroll);
        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));

    }

    handleScroll = () => {
        this.setState({docScroll: this.scrollMethod});
    };

    render(): JSX.Element {
        const { isMounted, docScroll } = this.state;

        return (
            <div
                className='main'
            >
                <Pages
                    isParentMounted={isMounted}
                    docScroll={docScroll}
                />
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
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch): ICallbacks {
    return {
        onLoad: (nextParams) => {
            dispatch(saveParams(nextParams));
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
