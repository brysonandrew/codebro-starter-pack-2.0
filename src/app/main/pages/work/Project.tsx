import * as React from 'react';
import {ExternalLink} from '../../../widgets/ExternalLink';

export interface IProjectProps {
    index?: string;
    name: string;
    year: number | string;
    link: string;
}

interface IState {}

export class Project extends React.Component<IProjectProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { index, name, year, link } = this.props;
        return (
            <div>
                <div>{index}</div>
                <div>{name}</div>
                <div>{year}</div>
                <ExternalLink
                    path={link}
                >
                    →
                </ExternalLink>
            </div>
        );
    }
}
