import * as React from 'react';
import {ExternalLink} from '../../../widgets/ExternalLink';
import {IWorkLabel} from '../../../../data/work/models';
import {colors} from '../../../../data/themeOptions';
import {Details} from './Details';
import {renderIfTrue} from '../../../../utils/react';
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
        const { isHovered } = this.state;
        return (
            <ExternalLink path={link}>
                <div
                    className={`${s.project} ${isHovered ? s.isHovered : ''}`}
                    style={{
                        background: isHovered ? color : colors.faint,
                        color: isHovered ? colors.light : colors.dark
                    }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <div className={`${s.projectInfo} ${s.projectIndex}`}>
                        {number}
                    </div>
                    <div className={`${s.projectInfo} ${s.projectName}`}>
                        {title}
                    </div>
                    <div className={`${s.projectInfo} ${s.projectDetailsInfo}`}>
                        info
                    </div>
                    {renderIfTrue(isHovered, () => (
                        <Details {...this.props}/>
                    ))}
                    <div className={s.projectDetailsLineDown}>
                        <div className={s.projectDetailsLineLeft}/>
                    </div>
                </div>
            </ExternalLink>
        );
    }
}
