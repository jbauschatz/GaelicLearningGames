import React, {ReactNode} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

type CountdownProps = {
    onTimeout: () => void;
};

type CountdownState = {};

/**
 * Component to display a spinning countdown indicator
 */
export class Countdown extends React.Component<CountdownProps, CountdownState> {
    /**
     * Initializes the component with the given properties
     */
    constructor(props: CountdownProps) {
        super(props);

        this.onComplete = this.onComplete.bind(this);
    }

    /**
     * Executed when the timer completes its countdown. Calls the onTimeout callback provided by the parent
     */
    private onComplete(totalElapsedTime: number): [shouldRepeat: boolean, delay: number] {
        this.props.onTimeout();
        return [true, 0];
    }

    /**
     * Renders the component
     */
    render(): ReactNode {
        return <div className="countdownContainer">
            <CountdownCircleTimer
                isPlaying={true}
                duration={3}
                onComplete={this.onComplete}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
            >
            </CountdownCircleTimer>
        </div>;
    }
}
