import * as React from 'react';
import {Link} from 'react-router';
import {MAIN_PAGES} from '../pages';
import {toPath} from '../../../utils';
import {CircleOverlay} from '../../widgets/circle-overlay/CircleOverlay';
const s = require('./Nav.css');

interface IProps {
    isScrolled: boolean;
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
                            <CircleOverlay
                                isDisabled={this.props.isScrolled}
                            >

                                <div className={s.itemName}>
                                    {page.name}
                                </div>
                            </CircleOverlay>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}
