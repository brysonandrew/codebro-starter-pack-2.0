import * as React from 'react';
import {renderDefinedTrue} from '../../../utils/react';
import {BackgroundMask} from './BackgroundMask';
import {defined} from '../../../utils/variable_evaluation';
import {ElectricBackground} from '../electric-background/ElectricBackground';
const s = require('./TransparentMaskText.css');

interface IProps {
    width?: number;
    docScroll?: number;
    isTriggered?: boolean;
}

interface IState {}

export class TransparentMaskText extends React.Component<IProps, IState> {

    home;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    config() {
        const defaultWidth = 992;
        const defaultHeight = 540;
        const defaultAspectRatio = 540 / 992;
        const mobileWidth = 420;
        let width = defaultWidth;
        let height = defaultHeight;
        let defaultHeadingFontSize = 280;
        let defaultSubHeadingFontSize = 48;

        if (this.props.width < defaultWidth) {
            width = this.props.width;
            height = this.props.width * defaultAspectRatio;
            if (this.props.width > mobileWidth) {
                defaultHeadingFontSize *= 0.5;
                defaultSubHeadingFontSize *= 0.5;
            } else {
                defaultHeadingFontSize *= 0.33;
                defaultSubHeadingFontSize *= 0.33;
            }
        }

        return {
            width: width,
            height: height,
            headingFontSize: defaultHeadingFontSize,
            subHeadingFontSize: defaultSubHeadingFontSize
        }
    };

    render(): JSX.Element {

        return (
            <div
                className={s.wrapper}
                style={{height: this.config().height, width: this.config().width}}
            >
                <div
                    className={s.canvas}
                    ref={el => defined(el) && (this.home = el)}
                />
                {renderDefinedTrue(this.home, () =>
                    <ElectricBackground
                        width={this.config().width}
                        height={this.config().height}
                    />
                )}
                <svg
                    className={s.svg}
                    width='100%'
                    height='100%'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${this.config().width} ${this.config().height}`}
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <BackgroundMask
                            {...this.config()}
                        />
                    </defs>
                    <rect
                        className={s.maskWrapper}
                        x="0"
                        y="0"
                        width={this.config().width}
                        height={this.config().height}
                    />
                </svg>
            </div>
        );
    }
}
