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
        widthPercentage: 33,
        component: <FooterInfo/>
    },
    {
        name: 'Links',
        widthPercentage: 67,
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
                    className={s.item}
                    style={{
                        width: `${division.widthPercentage}%`
                    }}
                >
                    {division.component}
                </div>
            )}
        </section>
    );
}
