import * as React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { IParams, IPage } from "../../../../../../data/models";
import { toggleScrollAnimation } from "../../../HomeActionCreators";
import { colors } from "../../../../../../data/themeOptions";
import { IStore } from '../../../../../../redux/IStore';

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    height?: number
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationStart?: () => void
}

interface IProps extends IProperties, ICallbacks {
    index: number
    page: IPage
    previewWidth?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
}

export class Page extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            posY: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
    }

    handleClick() {
        const { page, onAnimationStart } = this.props;
        const path = `/${page.path}`;
        browserHistory.push(path);
        onAnimationStart();
    }

    render(): JSX.Element {
        const { page, index, savedParams, height } = this.props;
        const isActive = page.path === savedParams.activePagePath
                            || (!savedParams.activePagePath && index === 0);

        const styles = {
            page: {
                position: "relative",
                height: height,
                width: "100%",
                zIndex: 0
            },
            page__inner: {
                position: "absolute",
                top: "50%",
                tranform: "translate(-50%)",
                fontSize: 80
            }
        } as any;

        return (
            <div style={ styles.page }
                onClick={this.handleClick}>
                <div style={ styles.page__inner }>
                    {page.name}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStore, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        isMenuOpen: state.homeStore.isMenuOpen,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams,
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
        }
    };
}

export const PageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Page);
