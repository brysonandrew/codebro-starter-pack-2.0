import * as React from 'react';
import {SEARCH_ICON, LOGO_ICON} from '../../../data';
const s = require('./SearchBar.css');

interface IProps {}

export function SearchBar(props: IProps) {
    return (
        <div className={s.searchBar}>
            <form>
                <input type="search" className={s.search} placeholder="Search..." />
                <button className={s.go}>
                    <span className="entypo-search">{SEARCH_ICON}</span>
                </button>
                <a href="#" className={s.logo} title="Tuulkit">
                    {LOGO_ICON}
                </a>
            </form>
        </div>
    );
}
