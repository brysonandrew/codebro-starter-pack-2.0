import * as React from 'react';
import {TransitionStaggerItem} from '../../../widgets';
const s = require('./ExamplePageOne.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

const STAGGERED_TEXT = [
    <h1 className={s.heading}>
        SourcingBot
    </h1>,
    <p>strives to be</p>,
    <p>the leading platform</p>,
    <p>for sourcing engineers</p>
].map((line, i) =>
    <div
        key={`line-${i}`}
        className={`${s.line} ${i === 2 ? s.boldItalic : ''}`}
    >
        {line}
    </div>);

export class ExamplePageOne extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const springValue = this.props.isTriggered ? 1 : 0;

        return (
            <section className={s.section}>
                <TransitionStaggerItem
                    springValue={springValue}
                    column={STAGGERED_TEXT}
                />
            </section>
        );
    }
}
