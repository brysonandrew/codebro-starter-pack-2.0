import * as React from 'react';
import { ITechnology, ITechnologyLabel } from '.';
import {ExternalLink} from '../../../widgets/ExternalLink';
import {CircleOverlay} from '../../../widgets/circle-overlay/CircleOverlay';
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
                        transform: `scaleX(${tech.score / 10})`
                    }}
                />
                <div className={s.techItemName}>
                    <ExternalLink
                        path={tech.link}
                    >
                        {tech.title}
                    </ExternalLink>
                </div>
                {/*<div*/}
                    {/*className={s.techItemScoreName}*/}
                    {/*style={{color: this.props.techRow.backgroundColor}}*/}
                {/*>*/}
                    {/*{this.props.tech.score}*/}
                {/*</div>*/}
            </div>
        );
    }
}
