import * as React from 'react';
const s = require('./Contact.css');

interface IProps {}

export function ContactInfo(props: IProps) {
    return (
        <div className={s.contactInfo}>
            <div>If you</div>
            <div>wish to</div>
            <div>make contact</div>
            <div>send a sign</div>
        </div>
    );
}
