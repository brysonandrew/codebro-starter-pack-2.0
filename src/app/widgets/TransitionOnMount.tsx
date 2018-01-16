import * as React from 'react';

interface IProps {
    type: 'opacity';
    value: (isMounted: boolean) => string | number;
    durationInMS?: number;
    delayInMS?: number;
}

interface IState {
    isMounted: boolean;
}

export class TransitionOnMount extends React.Component<IProps, IState> {

    mountId;

    constructor(props, state) {
        super(props, state);
        this.state = {
            isMounted: false
        }
    }

    componentDidMount() {
        // Allows for gap between render and componentDidMount to allow for a transition.
        // Without this the render method receives only the "isMounted" style twice.
        this.mountId = setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0);
    }

    componentWillUnmount() {
        clearTimeout(this.mountId);
    }

    public render(): JSX.Element {
        const { type, value, durationInMS, delayInMS } = this.props;

        return (
            <div
                className="sb-transition-on-mount"
                style={{
                    transition: `${type} ${durationInMS || 800}ms ${delayInMS || 0}ms`,
                    [type]: value(this.state.isMounted)
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
