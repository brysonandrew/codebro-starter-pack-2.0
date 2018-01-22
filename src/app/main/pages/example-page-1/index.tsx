import * as React from 'react';
import {TransitionStaggerItem} from '../../../widgets';
const s = require('./ExamplePageOne.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

export class ExamplePageOne extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const springValue = this.props.isTriggered ? 1 : 0;

        return (
            <section className={s.section}>
                Hello
            </section>
        );
    }
}
