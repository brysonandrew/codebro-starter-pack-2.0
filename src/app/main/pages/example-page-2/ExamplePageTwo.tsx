import * as React from 'react';
import {
    ITransitionColumn, TRANSITION_SCROLLING_BUFFER,
    TransitionColumn
} from '../../../widgets/transition-column/TransitionColumn';
import {defined} from '../../../../utils/variable_evaluation';
const s = require('./ExamplePageTwo.css');

interface IProps {
    docScroll?: number;
    parentClientRect?: ClientRect;
}

interface IState {}

export class ExamplePageTwo extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    columns(): ITransitionColumn[] {
        return [
            {
                components: [
                    <div>
                        <h2>Our Goal</h2>
                        <p>
                            Procurement and Inventory costs can be substantially reduced if trusted replacement components can be used. And that's what SourcingBot aims at providing in an online platform.
                        </p>
                    </div>
                ]
            }
        ]
    }

    render(): JSX.Element {
        const { docScroll, parentClientRect } = this.props;
        const springValue = (defined(parentClientRect) && docScroll > parentClientRect.top - TRANSITION_SCROLLING_BUFFER) ? 1 : 0;

        return (
            <section className={s.section}>
                <TransitionColumn
                    springValue={springValue}
                    columns={this.columns()}
                />
            </section>

        );
    }
}
