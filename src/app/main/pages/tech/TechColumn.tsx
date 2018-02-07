import * as React from 'react';
import {ITechnology} from '.';
import {TechRow} from './TechRow';
const s = require('./Tech.css');

interface IProps {
    techCol: ITechnology[];
    onMouseEnter: (score: number, type: string) => void;
    onMouseLeave: () => void;
}

export class TechColumn extends React.Component<IProps, {}> {

    render(): JSX.Element {
        const { techCol, onMouseEnter, onMouseLeave } = this.props;

        return (
            <div className={s.techColumn}>
                {techCol.map((rowTech, i) =>
                    <div key={rowTech.name}>
                        <TechRow
                            key={`rowTech-${i}`}
                            techRow={rowTech}
                            techCol={techCol}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        />
                    </div>
                )}
            </div>
        );
    }
}
