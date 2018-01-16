import * as React from 'react';
import {contactIcon} from '../../../../data/icons/contact';
import {FooterSocialMediaItem, ISocialMediaItemProps} from './FooterSocialMediaItem';

interface IProps {}

const SOCIAL_MEDIA_ITEMS: ISocialMediaItemProps[] = [
    {
        name: 'Facebook',
        link: '/facebook',
        icon: contactIcon.facebook
    },
    {
        name: 'LinkedIn',
        link: '/linkedIn',
        icon: contactIcon.linkedIn
    },
    {
        name: 'Email',
        link: '/email',
        icon: contactIcon.email
    }
];

export function FooterSocialMedia(props: IProps) {
    return (
        <div>
            {SOCIAL_MEDIA_ITEMS.map((item, i) =>
                <FooterSocialMediaItem
                    key={`FooterSocialMediaItem-${i}`}
                    name={item.name}
                    link={item.link}
                    icon={item.icon}
                />
            )}
        </div>
    );
}
