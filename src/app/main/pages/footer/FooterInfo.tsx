import * as React from 'react';
const s = require('./Footer.css');

interface IProps {}

export function FooterInfo(props: IProps) {
    return (
        <div className={s.footerInfo}>
            <div>SourcingBot</div>
            <div>An EXIST Startup Project</div>
            <div>HU Innovation Lab,</div>
            <div>53 Luisenstr, 10117 Berlin, DE.</div>
        </div>
    );
}
