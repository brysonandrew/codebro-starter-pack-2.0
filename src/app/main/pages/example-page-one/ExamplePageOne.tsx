import * as React from 'react';
const s = require('./ExamplePageOne.css');

interface IProps {}

interface IState {}

export class ExamplePageOne extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section className={s.section}>
                SourcingBot strives to be the leading platform for sourcing engineers to meet up and share know-how regarding electronic component design constraints, by simplifying the process of component identification and supplier assessment within the procurement process.
            </section>
        );
    }
}
