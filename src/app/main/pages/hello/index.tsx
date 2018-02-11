import * as React from 'react';
const s = require('./Hello.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

export class Hello extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {

        return (
            <section className={s.section}>
                Hello
            </section>
        );
    }
}
