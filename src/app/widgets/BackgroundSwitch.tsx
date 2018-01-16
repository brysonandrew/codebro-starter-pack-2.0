import * as React from 'react';
import {colors} from '../../data/themeOptions';

interface IProps {
    height?: number;
    underlineColor?: string;
}

interface IState {
    isHovered: boolean;
}

export class BackgroundSwitch extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isHovered: false
        };
    }

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        });
    };

    render(): JSX.Element {
        const { isHovered } = this.state;
        const { height } = this.props;

        return (
            <div
                style={{
                    id: "underline switch",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: "relative",
                    top: 0,
                    height: height || 50,
                    color: isHovered ? "#000" : colors.std
                }}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.props.children}
                <div
                    key='underline'
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: '100%',
                        height: `${isHovered ? 100 : 0}%`,
                        background: colors.hi,
                        transition: "400ms height",
                        left: 0,
                        zIndex: -1
                    }}
                />
            </div>
        );
    }
}
