import * as React from 'react';
import {Link} from 'react-router';
import {ARROW_CSS} from '../../../data/icons/arrows';
const s = require('./Nav.css');

interface IProps {
    onClick: () => void;
}

export function NavBackIcon(props: IProps) {
    return (
        <li className={`${s.navLink} ${s.backIcon}`}>
            <Link
                to='/'
                onClick={props.onClick}
            >
                {ARROW_CSS('top')}
            </Link>
        </li>
    );
}
