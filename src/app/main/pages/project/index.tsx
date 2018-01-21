import * as React from 'react';
import {SearchBar} from '../../../widgets';

interface IProps {}

interface IState {}

export class Project extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section>
                <h2>The Project</h2>
                <SearchBar/>
            </section>
        );
    }
}
