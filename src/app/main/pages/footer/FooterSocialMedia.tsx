import * as React from 'react';
import {CONTACT_ICON} from '../../../../data';
import {FooterSocialMediaItem, ISocialMediaItemProps} from './FooterSocialMediaItem';

interface IProps {}

const SOCIAL_MEDIA_ITEMS: ISocialMediaItemProps[] = [
    {
        name: 'Email',
        link: '/email',
        icon: CONTACT_ICON().email
    },
    {
        name: 'Github',
        link: '/github',
        icon: CONTACT_ICON().github
    },
    {
        name: 'Upwork',
        link: '/upwork',
        icon: CONTACT_ICON().upwork
    },
    {
        name: 'Codepen',
        link: '/codepen',
        icon: CONTACT_ICON().codepen
    },
    {
        name: 'Youtube',
        link: '/youtube',
        icon: CONTACT_ICON().youtube
    }
];

export function FooterSocialMedia(props: IProps) {
    return (
        <div>
            {SOCIAL_MEDIA_ITEMS.map((item, i) =>
                <div
                    key={`FooterSocialMediaItem-${i}`}
                    style={{
                        display: 'inline-block',
                        width: `${100 / SOCIAL_MEDIA_ITEMS.length}%`
                    }}
                >
                    <FooterSocialMediaItem
                        name={item.name}
                        link={item.link}
                        icon={item.icon}
                    />
                </div>
            )}
        </div>
    );
}
