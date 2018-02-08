import * as React from 'react';
import {Link} from 'react-router';
import {IPage, MAIN_PAGES, MAIN_PAGES_NAME_DICT} from '../pages';
import {toPath} from '../../../utils';
import {CircleOverlay} from '../../widgets/circle-overlay/CircleOverlay';
import {renderIf} from '../../../utils/react';
const s = require('./Nav.css');

interface IProps {
    docScroll: number;
    activePagePath: string;
    onAnimationStart?: () => void;
}

interface IState {}

export class NavLinks extends React.Component<IProps, IState> {

    private handleClick = () => {
        this.props.onAnimationStart();
    };

    render(): JSX.Element {
        const { docScroll, activePagePath, } = this.props;
        return (
            <ul className={s.navLinks}>
                {renderIf(docScroll > 200, {
                    ifTrue: () => (
                        <li className={s.item}>
                            <Link
                                to={`/${activePagePath}`}
                                onClick={this.handleClick}
                            >
                                <CircleOverlay
                                    isDisabled={docScroll > 0}
                                >
                                    <div className={s.itemName}>
                                        {MAIN_PAGES_NAME_DICT[activePagePath]}
                                    </div>
                                </CircleOverlay>
                            </Link>
                        </li>
                    ),
                    ifFalse: () => MAIN_PAGES.map((page: IPage, i) => (
                        <li
                            key={`link-${i}`}
                            className={s.item}
                        >
                            <Link
                                to={`/${toPath(page.path)}`}
                                onClick={this.handleClick}
                            >
                                <CircleOverlay
                                    isDisabled={docScroll > 0}
                                >
                                    <div className={s.itemName}>
                                        {page.name}
                                    </div>
                                </CircleOverlay>
                            </Link>
                        </li>
                    ))
                })}
            </ul>
        );
    }
}
