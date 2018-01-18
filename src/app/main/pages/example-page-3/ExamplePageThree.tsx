import * as React from 'react';
const s = require('./ExamplePageThree.css');

interface IProps {}

interface IState {}

export class ExamplePageThree extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section className={s.section}>
                Procurement and Inventory costs can be substantially reduced if trusted replacement components can be used. And that's what SourcingBot aims at providing in an online platform.
            </section>
        );
    }
}
