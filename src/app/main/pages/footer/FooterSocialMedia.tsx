import * as React from 'react';
import {CONTACT_ICON} from '../../../../data';
import {FooterSocialMediaItem, ISocialMediaItemProps} from './FooterSocialMediaItem';

interface IProps {}

const SOCIAL_MEDIA_ITEMS: ISocialMediaItemProps[] = [
    {
        name: 'Facebook',
        link: '/facebook',
        icon: CONTACT_ICON.facebook
    },
    {
        name: 'LinkedIn',
        link: '/linkedIn',
        icon: CONTACT_ICON.linkedIn
    },
    {
        name: 'Email',
        link: '/email',
        icon: CONTACT_ICON.email
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
