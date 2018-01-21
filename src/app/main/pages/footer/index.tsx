import * as React from 'react';
import { FooterInfo } from './FooterInfo';
import { FooterSocialMedia } from './FooterSocialMedia';
import {ELineOrientation, Line} from '../../../widgets';
import {colors} from '../../../../data';
const s = require('./Footer.css');

interface IProps {
    isParentMounted: boolean;
}

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
    const { isParentMounted } = props;
    return (
        <section className={s.footer}>
            <div className={s.line}>
                <Line
                    orientation={ELineOrientation.Vertical}
                    isInvisible={!isParentMounted}
                    color={colors.gry}
                />
            </div>
            {DIVISIONS.map((div, i) =>
                <div
                    key={`div-${i}`}
                    className={s.item}
                    style={{
                        width: `${100 / DIVISIONS.length}%`
                    }}
                >
                    <h2 className={s.heading}>
                        {div.name}
                    </h2>
                    {div.component}
                </div>
            )}
        </section>
    );
}
