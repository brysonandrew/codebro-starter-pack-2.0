export const linearize = (n: number, origin: number, target: number): number => {
    return origin * (n / 100)  + (target - target * n / 100);
};

export const interval = (
    speed: number,
    iterations: number,
    action: () => void,
    clear?: (intervalId) => void,
    onEnd?: () => void
) => {
    let count = 0;

    let intervalId = setInterval(() => {
        if (count <= iterations) {
            count++;
            action();
        } else {
            clearInterval(intervalId);
            if (onEnd) {
                onEnd();
            }
        }
    }, speed);

    clear(intervalId);

};
