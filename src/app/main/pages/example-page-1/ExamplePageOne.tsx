import * as React from 'react';
import {
    TRANSITION_SCROLLING_BUFFER,
} from '../../../widgets/transition-column/TransitionColumn';
import {defined} from '../../../../utils/variable_evaluation';
import {TransitionColumnItem} from '../../../widgets/transition-column/TransitionColumnItem';
const s = require('./ExamplePageOne.css');

interface IProps {
    docScroll?: number;
    parentClientRect?: ClientRect;
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
        const { docScroll, parentClientRect } = this.props;
        const springValue = (defined(parentClientRect) && docScroll > parentClientRect.top - TRANSITION_SCROLLING_BUFFER) ? 1 : 0;

        return (
            <section className={s.section}>
                <TransitionColumnItem
                    springValue={springValue}
                    column={STAGGERED_TEXT}
                />
            </section>
        );
    }
}
