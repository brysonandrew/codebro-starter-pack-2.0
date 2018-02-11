import * as React from 'react';
const s = require('./World.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

export class World extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {

        return (
            <section className={s.section}>
                World
            </section>
        );
    }
}
