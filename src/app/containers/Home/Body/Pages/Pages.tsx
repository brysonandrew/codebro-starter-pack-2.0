import * as React from 'react';
import { connect } from 'react-redux';
import { PagesInnerFromStore } from './PagesInner';
import { IParams } from '../../../../../data/models';
import { toggleScrollAnimation } from '../../HomeActionCreators';
import { IStore } from '../../../../../redux/IStore';

interface IProperties {
    savedParams?: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    isPreviewExtended?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onArrowNavigate?: (nextParams: IParams) => void
    onAnimationStart?: () => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Pages extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        const { savedParams, onAnimationStart } = this.props;

        if (savedParams.activePagePath) {
            onAnimationStart();
        }

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 800);
    }

    componentWillReceiveProps(nextProps) {
        const isProjectPathChanged = nextProps.savedParams.activePagePath !== this.props.savedParams.activePagePath;
        const isProjectPathChangedAndEmpty = !nextProps.savedParams.activePagePath && isProjectPathChanged;
        const isPagePathChangedAndEmpty = !nextProps.savedParams.activePagePath && isProjectPathChanged;

        if (isProjectPathChanged
            || isProjectPathChangedAndEmpty
            || isPagePathChangedAndEmpty) {
            nextProps.onAnimationStart();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {
        const {
        } = this.props;
        const { isMounted } = this.state;

        const styles = {
            pages: {
                position: "relative",
                zIndex: 2,
                opacity: isMounted ? 1 : 0,
                filter: isMounted ? "none" : "blur(10px)",
                transition: "opacity 1600ms, filter 1600ms"
            }
        } as any;
        return (
            <div style={ styles.pages}>
                <PagesInnerFromStore/>
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
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch): ICallbacks {
    return {
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        }
    };
}

export const PagesFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Pages);
