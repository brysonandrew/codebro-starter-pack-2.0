import * as React from 'react';
import {renderDefinedTrue} from '../../../utils/react';
import {BackgroundMask} from './BackgroundMask';
import {defined} from '../../../utils/variable_evaluation';
import {ElectricBackground} from '../electric-background/ElectricBackground';
const s = require('./TransparentMaskText.css');

export const config = {
    width: 992,
    height: 540,
    headingFontSize: 280,
    subHeadingFontSize: 48
};

interface IProps {
    docScroll?: number;
    isTriggered?: boolean;
}

interface IState {}

export class TransparentMaskText extends React.Component<IProps, IState> {

    home;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div
                className={s.wrapper}
                style={{height: config.height, width: config.width}}
            >
                <div
                    className={s.canvas}
                    ref={el => defined(el) && (this.home = el)}
                />
                {renderDefinedTrue(this.home, () =>
                    <ElectricBackground
                        width={config.width}
                        height={config.height}
                    />
                )}
                <svg
                    className={s.svg}
                    width={config.width} height={config.height}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${config.width} ${config.height}`}
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <BackgroundMask/>
                    </defs>
                    <rect
                        className={s.maskWrapper}
                        x="0"
                        y="0"
                        width={config.width}
                        height={config.height}
                    />
                </svg>
            </div>
        );
    }
}
