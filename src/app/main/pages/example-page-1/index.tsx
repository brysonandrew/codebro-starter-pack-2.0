import * as React from 'react';
import {TransparentMaskText} from '../../../widgets/transparent-mask-text/index';
const s = require('./ExamplePageOne.css');

interface IProps {
    isTriggered?: boolean;
    docScroll?: number;
}

interface IState {}

export class ExamplePageOne extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section className={s.section}>
                <div>
                    <TransparentMaskText
                        docScroll={this.props.docScroll}
                    />
                </div>
            </section>
        );
    }
}
