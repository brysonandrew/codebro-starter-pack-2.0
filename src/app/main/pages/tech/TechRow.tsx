import * as React from 'react';
import { ITechnology } from '.';
import { TechItem } from './TechItem';
const s = require('./Tech.css');

interface IProps {
    techRow: ITechnology;
    techCol: ITechnology[];
    onMouseEnter: (score: number, type: string) => void;
    onMouseLeave: () => void;
}

export class TechRow extends React.Component<IProps, {}> {

    render(): JSX.Element {
        const { techRow, onMouseEnter, onMouseLeave } = this.props;
        return (
            <div className={`${s.techRow} ${s[techRow.name]}`}>
                <div className={s.techRowName}>
                    {techRow.name}
                </div>
                {techRow.technologies.map(tech =>
                    <TechItem
                        key={tech.id}
                        tech={tech}
                        techRow={techRow}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />)}
            </div>
        );
    }
}
