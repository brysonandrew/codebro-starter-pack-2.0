import * as React from 'react';
const s = require('./FooterSocialMedia.css');
import {CONTACT_ICON} from '../../../../data';
import {FooterSocialMediaItem, ISocialMediaItemProps} from './FooterSocialMediaItem';
import {colors} from '../../../../data/themeOptions';
import {CircleOverlay} from '../../../widgets/circle-overlay/CircleOverlay';

interface IProps {}

const SOCIAL_MEDIA_ITEMS: ISocialMediaItemProps[] = [
    {
        name: 'Email',
        link: '/email',
        icon: CONTACT_ICON(colors.dark).email,
        hoverIcon: CONTACT_ICON().email
    },
    {
        name: 'Github',
        link: '/github',
        icon: CONTACT_ICON(colors.dark).github,
        hoverIcon: CONTACT_ICON().github
    },
    {
        name: 'Upwork',
        link: '/upwork',
        icon: CONTACT_ICON(colors.dark).upwork,
        hoverIcon: CONTACT_ICON().upwork
    },
    {
        name: 'Codepen',
        link: '/codepen',
        icon: CONTACT_ICON(colors.dark).codepen,
        hoverIcon: CONTACT_ICON().codepen
    },
    {
        name: 'Youtube',
        link: '/youtube',
        icon: CONTACT_ICON(colors.dark).youtube,
        hoverIcon: CONTACT_ICON().youtube
    }
];

export function FooterSocialMedia(props: IProps) {
    return (
        <div>
            {SOCIAL_MEDIA_ITEMS.map((item, i) =>
                <div
                    key={`FooterSocialMediaItem-${i}`}
                    className={s.itemWrapper}
                    style={{
                        display: 'inline-block',
                        width: `${100 / SOCIAL_MEDIA_ITEMS.length}%`
                    }}
                >
                    <div className={s.itemTitle}>
                        {item.name.toUpperCase()}
                    </div>
                    <CircleOverlay
                        waterMark={item.hoverIcon}
                    >
                        <FooterSocialMediaItem
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
