import * as React from 'react';
import {renderDefinedTrue} from '../../../utils/react';
const s = require('./CircleOverlay.css');

interface IProps {
    isDisabled?: boolean;
    waterMark?: JSX.Element;
}

interface IState {
    isHovered: boolean;
}

export class CircleOverlay extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDisabled) {
            this.setState({
                isHovered: false
            })
        }
    }

    handleMouseEnter = () => {
        if (!this.props.isDisabled) {
            this.setState({
                isHovered: true
            })
        }
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        })
    };

    render(): JSX.Element {
        return (
            <div
                className={`${s.circleOverlay} ${this.state.isHovered ? s.isHovered : ''}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className={s.circle}/>
                {renderDefinedTrue(this.props.waterMark, () =>
                    <div className={s.waterMark}>
                        {this.props.waterMark}
                    </div>)}
                {this.props.children}
            </div>
        );
    }
}
