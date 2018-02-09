import * as React from 'react';
const s = require('./Contact.css');

export interface ISocialMediaItemProps {
    name: string;
    link: string;
    color?: string;
    icon: JSX.Element;
    hoverIcon?: JSX.Element;
}

export function ContactSocialMediaItem(props: ISocialMediaItemProps) {
    const { name, link, icon } = props;
    return (
        <a className={s.item} href={link}>
            {icon}
        </a>
    );
}
