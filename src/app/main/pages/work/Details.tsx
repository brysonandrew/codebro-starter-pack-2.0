import * as React from 'react';
import {IProjectProps} from './Project';
import {TypingTextInterval} from '../../../widgets/typing-text-interval/TypingTextInterval';
const s = require('./Work.css');

interface IState {}

interface IDetailsProps extends IProjectProps {}

export class Details extends React.Component<IDetailsProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className={s.details}>
                <TypingTextInterval textContent={`Role: ${this.props.role}`}/>
                <TypingTextInterval textContent={`Client Type: ${this.props.clientType}`}/>
                <TypingTextInterval textContent={`Team Type: ${this.props.teamType}`}/>
                <TypingTextInterval textContent={`Year: ${this.props.year}`}/>
            </div>
        );
    }
}
