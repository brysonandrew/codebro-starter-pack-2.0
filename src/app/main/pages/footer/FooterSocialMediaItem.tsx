import * as React from 'react';
const s = require('./Footer.css');

export interface ISocialMediaItemProps {
    name: string;
    link: string;
    icon: JSX.Element;
}

export function FooterSocialMediaItem(props: ISocialMediaItemProps) {
    const { name, link, icon } = props;
    return (
        <a href={link} className={s.footerSocialMedia}>
            <div>{name}</div>
            <div>{icon}</div>
        </a>
    );
}
