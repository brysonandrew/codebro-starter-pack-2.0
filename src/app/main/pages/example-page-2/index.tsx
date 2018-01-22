import * as React from 'react';
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
                World
            </section>

        );
    }
}
