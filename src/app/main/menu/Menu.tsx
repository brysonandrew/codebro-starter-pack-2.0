import * as React from 'react';
const s = require('./Menu.css');

interface IProps {}

export function Menu(props: IProps) {
    return (
        <div className={s.positioner}>
            <div className={s.wrapper}>
                <div className={s.item}>
                    <a>
                        Work
                    </a>
                </div>
                <div className={s.item}>
                    <a>
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
}
