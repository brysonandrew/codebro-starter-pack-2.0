import * as React from 'react';
import { ITechnology, ITechnologyLabel } from '.';
import {ExternalLink} from '../../../widgets/ExternalLink';
import {renderIfFalse, renderIfTrue} from '../../../../utils/react';
import {createArray} from '../../../../utils/array';
const s = require('./Tech.css');

interface IProps {
    techRow: ITechnology;
    tech: ITechnologyLabel;
    onMouseEnter: (score: number, type: string) => void;
    onMouseLeave: () => void;
}

interface IState {
    isHovered: boolean;
}

export class TechItem extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    render(): JSX.Element {
        const { techRow, tech, onMouseEnter, onMouseLeave } = this.props;
        const { isHovered } = this.state;
        return (
            <div
                key={tech.id}
                className={`${s.techItem} ${s[techRow.name]} ${isHovered ? s.isHovered : ''}`}
                style={{height: `${100 / techRow.technologies.length}%`}}
                onMouseEnter={() => {
                    this.setState({
                        isHovered: true
                    });
                    onMouseEnter(tech.score, techRow.name);
                }}
                onMouseLeave={() => {
                    this.setState({
                        isHovered: false
                    });
                    onMouseLeave();
                }}
            >
                <div
                    className={s.techItemScoreBar}
                    style={{
                        width: `calc(${tech.score * 10}% - 4px)`
                    }}
                >
                    <div className={s.techItemScoreBarInner}/>
                    {renderIfTrue(this.state.isHovered, () =>
                        <div className={s.techItemScoreName}>
                            {this.props.tech.score}
                        </div>)}

                </div>
                    <div className={`${s.techItemName} ${this.state.isHovered ? s.hide : ''}`}>
                        <ExternalLink
                            path={tech.link}
                        >
                            {tech.title}
                        </ExternalLink>
                    </div>
            </div>
        );
    }
}
