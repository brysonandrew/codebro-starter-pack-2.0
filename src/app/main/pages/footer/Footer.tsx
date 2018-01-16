import * as React from 'react';
import { FooterInfo } from './FooterInfo';
import { FooterSocialMedia } from './FooterSocialMedia';

interface IProps {}

const DIVISIONS = [
    {
        name: 'Info',
        component: <FooterInfo/>
    },
    {
        name: 'Social Media',
        component: <FooterSocialMedia/>
    }
];

export function Footer(props: IProps) {
    return (
        <section>
            {DIVISIONS.map((div, i) =>
                <div key={`div-${i}`}>
                    <h2>{div.name}</h2>
                    {div.component}
                </div>
            )}
        </section>
    );
}
