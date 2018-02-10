import * as React from 'react';
import {Link} from 'react-router';
import {CircleOverlay} from '../../widgets/circle-overlay/CircleOverlay';
import {renderIf} from '../../../utils/react';
const s = require('./Nav.css');

interface IProps {
    isCircleDisabled: boolean;
    path: string;
    name: string;
    onClick: () => void;
}

export function NavLink(props: IProps) {
    const { isCircleDisabled, path, name, onClick } = props;
    return (
        <li className={s.navLink}>
            <Link to={`/${path}`} onClick={onClick}>
                {renderIf(isCircleDisabled, {
                    ifTrue: () =>   <div className={s.navLinkName}>
                                        {name}
                                    </div>,
                    ifFalse: () =>  <CircleOverlay>
                                        <div className={s.navLinkName}>
                                            {name}
                                        </div>
                                    </CircleOverlay>
                })}
            </Link>
        </li>
    );
}
