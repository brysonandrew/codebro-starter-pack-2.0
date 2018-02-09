import * as React from 'react';
import {
    backEndTechnologies,
    baseTechnologies,
    databaseTechnologies,
    frontEndTechnologies,
    styleTechnologies
} from './labels';
import { TechColumn } from './TechColumn';
import {ILabelInfo} from '../../../../data/models';
import {createArray} from '../../../../utils/array';
import {defined} from '../../../../utils/variable_evaluation';
const s = require('./Tech.css');

export interface ITechnologyLabel extends ILabelInfo {
    score: number;
}

export interface ITechnology {
    name: string;
    technologies: ITechnologyLabel[];
}

interface IProps {
    isTriggered?: boolean;
}

const COLUMNS: ITechnology[][] = [
    [
        {
            name: "basic",
            technologies: baseTechnologies
        },
    ],
    [
        {
            name: "frontend",
            technologies: frontEndTechnologies
        },
        {
            name: "backend",
            technologies: backEndTechnologies
        },
    ],
    [
        {
            name: "style",
            technologies: styleTechnologies
        },

        {
            name: "database",
            technologies: databaseTechnologies
        }
    ]
];

interface ITickConfig {
    index: number;
    type: string;
}

interface IState {
    activeTickConfig: ITickConfig;
}

export class Tech extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            activeTickConfig: {} as ITickConfig
        };
    }

    tickClass(i: number) {
        const { activeTickConfig } = this.state;
        if (defined(activeTickConfig)) {
            return `${s.tick} ${i === activeTickConfig.index ? `${s.active} ${s[activeTickConfig.type]}` : ''}`
        } else {
            return s.tick
        }
    }

    render(): JSX.Element {

        return (
            <section className={s.tech}>
                {createArray(11)
                    .map((_, i) => (
                        <div
                            key={`tick-${i}`}
                            className={this.tickClass(i)}
                            style={{left: `${i * 10}%`}}
                        >
                            <div className={s.tickNumber}>
                                {i}
                            </div>
                        </div>
                    ))}
                {COLUMNS.map((techCol, i) =>
                    <TechColumn
                        key={`colTech-${i}`}
                        techCol={techCol}
                        onMouseEnter={(score: number, type: string) => {
                            this.setState({
                                activeTickConfig: {
                                    index: score,
                                    type: type
                                }
                            });
                        }}
                        onMouseLeave={() => {
                            this.setState({
                                activeTickConfig: {
                                    index: -1,
                                    type: ''
                                }
                            });
                        }}
                    />
                )}
            </section>
        );
    }
}
