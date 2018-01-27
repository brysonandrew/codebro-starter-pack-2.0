import * as React from 'react';
import {IProjectProps} from './Project';
const s = require('./Work.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

// const PROJECTS: IProjectProps = [
//     {
//         name: 'PhoneTradr',
//         year: 2017,
//
//     }
// ];

export class Work extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const springValue = this.props.isTriggered ? 1 : 0;

        return (
            <section className={s.section}>
                SUP DOG
            </section>
        );
    }
}
