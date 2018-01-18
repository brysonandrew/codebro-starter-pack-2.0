import * as React from 'react';
import {SEARCH_SVG} from '../../../data/icons/search';
import {LOGO_SVG} from '../../../data/icons/logo';
const s = require('./SearchBar.css');

interface IProps {}

export function SearchBar(props: IProps) {
    return (
        <div className={s.searchBar}>
            <form>
                <input type="search" className={s.search} placeholder="Search..." />
                <button className={s.go}>
                    <span className="entypo-search">{SEARCH_SVG}</span>
                </button>
                <a href="#" className={s.logo} title="Tuulkit">
                    {LOGO_SVG}
                </a>
            </form>
        </div>
    );
}
