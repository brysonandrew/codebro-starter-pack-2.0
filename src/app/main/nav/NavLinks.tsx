import * as React from 'react';
import {Link} from 'react-router';
import {MAIN_PAGES} from '../pages';
import {toPath} from '../../../utils';
const s = require('./Nav.css');

interface IProps {
    onAnimationStart?: () => void;
}

interface IState {}

export class NavLinks extends React.Component<IProps, IState> {

    private handleClick = () => {
        this.props.onAnimationStart();
    }

    render(): JSX.Element {
        return (
            <ul className={s.navLinks}>
                {MAIN_PAGES.map((page, i) => (
                    <li
                        key={`link-${i}`}
                        className={s.item}
                    >
                        <Link
                            to={`/${toPath(page.name)}`}
                            onClick={this.handleClick}
                        >
                            {page.name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}
