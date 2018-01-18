import * as React from 'react';
import {TransitionColumnItem} from '../../../widgets/transition-column/TransitionColumnItem';
const s = require('./ExamplePageTwo.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

export class ExamplePageTwo extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const springValue = this.props.isTriggered ? 1 : 0;

        return (
            <section className={s.section}>
                <TransitionColumnItem
                    springValue={springValue}
                    display={'block'}
                    column={[
                        <h2>Our Goal</h2>,
                        <p>
                            Procurement and Inventory costs can be substantially reduced if trusted replacement components can be used. And that's what SourcingBot aims at providing in an online platform.
                        </p>
                    ]}
                />
            </section>

        );
    }
}
