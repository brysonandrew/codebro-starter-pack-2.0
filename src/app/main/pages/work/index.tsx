import * as React from 'react';
import {WORK_LABELS} from '../../../../data/work/index';
import {Project} from './Project';
import {IWorkLabel} from '../../../../data/work/models';
const s = require('./Work.css');

interface IProps {
    isTriggered?: boolean;
}

interface IState {}

export class Work extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section className={s.section}>
                {WORK_LABELS.map((project: IWorkLabel, i) => (
                    <Project
                        key={`Project-${i}`}
                        name={project.title}
                        year={project.year}
                        link={project.link}
                    />
                ))}
            </section>
        );
    }
}
