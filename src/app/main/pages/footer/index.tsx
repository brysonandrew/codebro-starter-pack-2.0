import * as React from 'react';
import { FooterInfo } from './FooterInfo';
import { FooterSocialMedia } from './FooterSocialMedia';
import {ELineOrientation, Line} from '../../../widgets';
import {colors} from '../../../../data';
const s = require('./Footer.css');

interface IProps {
}

const DIVISIONS = [
    {
        name: 'Messsage',
        component: <FooterInfo/>
    },
    {
        name: 'Links',
        component: <FooterSocialMedia/>
    }
];

export function Footer(props: IProps) {
    return (
        <section className={s.footer}>
            <div className={s.line}>
                <Line
                    orientation={ELineOrientation.Vertical}
                    color={colors.faint}
                />
            </div>
            {DIVISIONS.map((division, i) =>
                <div
                    key={`division-${i}`}
                    className={s.division}
                >
                    {division.component}
                </div>
            )}
        </section>
    );
}
