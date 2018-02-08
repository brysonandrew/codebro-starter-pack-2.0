import * as React from 'react';

interface IProps {
    letter: string;
    index: number;
    typingSpeed: number;
}

function transformStyle(i: number): string {
    return `rotate(${i === this.state.textShown.length - 1 ? 90 : 0}deg)`
}

function opacityStyle(i: number): number {
    return i === this.state.textShown.length - 1
        ? 0
        : 1;
}

export function FancyLetter(props: IProps) {
    const { letter, index, typingSpeed } = props;
    return (
        <div
            style={{
                ...{
                    display: "inline-block",
                    transition: `opacity ${typingSpeed * 5}ms, transform ${typingSpeed * 5}ms`
                },
                transform: transformStyle(index),
                opacity: opacityStyle(index),
                width: letter === " " ? 12 : "auto"
            }}
        >
            {letter}
        </div>
    );
}
