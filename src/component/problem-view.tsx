import React from 'react';
import {ProblemState} from '../model/models';

type ProblemViewArgs = {
    problemState: ProblemState,
    onAnswer: (answer: string) => void
};

type ProblemViewState = {
    problemState: ProblemState
};

/**
 * Component class to display a Problem
 */
export class ProblemView extends React.Component<ProblemViewArgs, ProblemViewState> {
    /**
   * Intializes the component from the given args
   */
    constructor(props: ProblemViewArgs) {
        super(props);
        this.state = {
            problemState: props.problemState,
        };
    }

    /**
   * Renders the component
   */
    render() {
        return <div className="problemArea">
            <div className="textPrompt">{this.state.problemState.currentProblem.prompt}</div>
            <div className="inputButtonRow">
                {this.state.problemState.currentProblem.options.map((option) => {
                    if (this.state.problemState.result === 'Unanswered') {
                        return <button onClick={() => this.props.onAnswer(option)}>
                            {option}
                        </button>;
                    } else {
                        return <button>
                            {option === this.state.problemState.currentProblem.answer && <>&#10003;</>}
                            {option}
                        </button>;
                    }
                })}
            </div>
        </div>;
    }
}
