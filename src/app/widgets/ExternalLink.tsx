import * as React from 'react';
import {colors} from '../../data/themeOptions';

interface IProps {
    path: string
}

export class ExternalLink extends React.Component<IProps, {}> {

    render(): JSX.Element {
        return (
            <a
                style={{
                    display: "inline-block",
                    cursor: "pointer",
                    textDecoration: "none",
                    color: colors.light
                }}
                href={this.props.path}
                target="_blank"
            >
                {this.props.children}
            </a>
        );
    }
}
