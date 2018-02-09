import * as React from 'react';
const s = require('./Contact.css');
import {CONTACT_ICON} from '../../../../data';
import {ContactSocialMediaItem, ISocialMediaItemProps} from './ContactSocialMediaItem';
import {colors} from '../../../../data/themeOptions';
import {CircleOverlay} from '../../../widgets/circle-overlay/CircleOverlay';

interface IProps {}

const SOCIAL_MEDIA_ITEMS: ISocialMediaItemProps[] = [
    {
        name: 'Email',
        color: colors.hi,
        link: '/email',
        icon: CONTACT_ICON(colors.dark).email,
        hoverIcon: CONTACT_ICON().email
    },
    {
        name: 'Github',
        color: '#6e5494',
        link: '/github',
        icon: CONTACT_ICON(colors.dark).github,
        hoverIcon: CONTACT_ICON().github
    },
    {
        name: 'Upwork',
        color: '#37a000',
        link: '/upwork',
        icon: CONTACT_ICON(colors.dark).upwork,
        hoverIcon: CONTACT_ICON().upwork
    },
    {
        name: 'Codepen',
        color: '#000',
        link: '/codepen',
        icon: CONTACT_ICON(colors.dark).codepen,
        hoverIcon: CONTACT_ICON().codepen
    },
    {
        name: 'Youtube',
        color: '#FF0000',
        link: '/youtube',
        icon: CONTACT_ICON(colors.dark).youtube,
        hoverIcon: CONTACT_ICON().youtube
    }
];

export function ContactSocialMedia(props: IProps) {
    return (
        <div className={s.contactSocialMedia}>
            {SOCIAL_MEDIA_ITEMS.map((item, i) =>
                <div
                    key={`ContactSocialMediaItem-${i}`}
                    className={s.itemWrapper}
                >
                    <div
                        className={s.itemTitle}
                        style={{color: item.color}}
                    >
                        {item.name}
                    </div>
                    <CircleOverlay
                        waterMark={item.hoverIcon}
                    >
                        <ContactSocialMediaItem
                            name={item.name}
                            link={item.link}
                            icon={item.icon}
                        />
                    </CircleOverlay>
                </div>
            )}
        </div>
    );
}
