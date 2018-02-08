import * as React from 'react';
import {interval} from '../../../utils/animate-utils';
import {setInArray} from '../../../utils/array';
export const TYPING_SPEED = 30;

interface IProps {
    textContent: string
    onAnimationEnd?: () => void
}

interface IState {
    textShown: string[]
}

export class TypingTextInterval extends React.Component<IProps, IState> {

    intervalId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            textShown: []
        };
    }

    componentDidMount() {
        let textArray: string[] = this.props.textContent.split("");
        let count = 0;
        interval(TYPING_SPEED, this.props.textContent.length, () => {
            this.setState({
                textShown: setInArray(this.state.textShown, count, textArray[count])
            });
            count++;
        }
        , (intervalId) => (this.intervalId = intervalId)
        , () => this.props.onAnimationEnd && this.props.onAnimationEnd());
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render(): JSX.Element {
        return  <div className='monospace'>
                    {this.state.textShown}
                </div>

    }
}
