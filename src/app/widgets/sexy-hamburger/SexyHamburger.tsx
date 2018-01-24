import * as React from 'react';
const s = require('./SexyHamburger.css');

interface IProps {}

export function SexyHamburger(props: IProps) {
    return (
        <div className={s.menuToggle}>
            <div className={s.hamburger}>
                <span/>
                <span/>
                <span/>
            </div>
            <div className={s.cross}>
                <span/>
                <span/>
            </div>
        </div>
    );
}
