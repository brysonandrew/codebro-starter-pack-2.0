import * as React from 'react';
import {ExternalLink} from '../../../widgets/ExternalLink';
import {IWorkLabel} from '../../../../data/work/models';
import {colors} from '../../../../data/themeOptions';
const s = require('./Work.css');

export interface IProjectProps extends IWorkLabel {
    number: number;
}

interface IState {
    isHovered: boolean;
}

export class Project extends React.Component<IProjectProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
    }

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        });
    };

    render(): JSX.Element {
        const { number, title, year, link, color } = this.props;
        return (
            <ExternalLink path={link}>
                <div
                    className={s.project}
                    style={{
                        background: this.state.isHovered ? color : colors.faint,
                        color: this.state.isHovered ? colors.light : colors.dark
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <div className={`${s.projectInfo} ${s.projectIndex}`}>{number}</div>
                    <div className={`${s.projectInfo} ${s.projectName}`}>{title}</div>
                    {/*<div className={`${s.projectInfo} ${s.projectYear}`}>{year}</div>*/}
                    <div className={`${s.projectInfo} ${s.projectLive}`}>
                        <ExternalLink
                            path={link}
                        >
                            <span>→</span>
                        </ExternalLink>
                    </div>
                </div>
            </ExternalLink>
        );
    }
}
