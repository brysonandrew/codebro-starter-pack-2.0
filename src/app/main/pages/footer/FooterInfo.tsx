import * as React from 'react';
const s = require('./Footer.css');

interface IProps {}

export function FooterInfo(props: IProps) {
    return (
        <div className={s.footerInfo}>
            <div>If you</div>
            <div>wish to</div>
            <div>make contact</div>
            <div>send a sign</div>
        </div>
    );
}
