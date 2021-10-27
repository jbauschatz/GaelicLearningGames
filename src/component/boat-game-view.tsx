import {ProblemState} from '../model/models';
import React from 'react';
import boatImage from '../asset/boat2.jpg';
import {ProblemView} from './problem-view';
import {generateWordMatchProblem} from '../model/problem-service';
import {Countdown} from './countdown';

type BoatGameProps = {
    gameOver: () => void
}

type BoatGameViewState = {
    remainingProblems: number,
    problemState: ProblemState,
    rightAnswers: number,
    wrongAnswers: number
};

/**
 * Component to render the entire Boat Game interface
 */
export class BoatGameView extends React.Component<BoatGameProps, BoatGameViewState> {
    /**
     * Child component which renders the current problem
     */
    private problemView: ProblemView | null = null;

    /**
     * Initializes the Boat Game from the given properties
     */
    constructor(props: BoatGameProps) {
        super(props);
        const startingProblem = generateWordMatchProblem();
        const problemState = new ProblemState(startingProblem);

        this.state = {
            remainingProblems: 10,
            problemState,
            rightAnswers: 0,
            wrongAnswers: 0,
        };

        this.checkAnswer = this.checkAnswer.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
    }

    /**
     * Updates the player's score, where 1 is a success and -1 is a failure.
     *
     * Sets the current ProblemState's result based on the success/failure
     */
    private adjustScore(adjustment: 1 | -1) {
        const rightAnswerChange = adjustment === 1 ? 1 : 0;
        const wrongAnswerChange = adjustment === -1 ? 1 : 0;
        const result = adjustment === 1 ? 'Correct' : 'Incorrect';
        const currentProblemState = {
            ...this.state.problemState,
            result,
        } as ProblemState;

        // Update the state
        this.setState((state, props) => {
            return {
                rightAnswers: state.rightAnswers + rightAnswerChange,
                wrongAnswers: state.wrongAnswers + wrongAnswerChange,
                problemState: currentProblemState,
            };
        });
        this.problemView?.setState({
            problemState: currentProblemState,
        });
    }

    /**
     * Executed when the player runs out of time for the current problem
     */
    private onTimeout(): void {
        // If they timed out without answering, mark it wrong
        if (this.state.problemState.result === 'Unanswered') {
            this.adjustScore(-1);
        }

        // Check for game over condition
        if (this.state.remainingProblems == 1) {
            return this.props.gameOver();
        }

        // TODO adjust the countdown timer

        // Create a new problem
        const nextProblem = generateWordMatchProblem();
        const problemState = new ProblemState(nextProblem);

        // Update state with new problem
        this.setState((state, props) => {
            return {
                remainingProblems: state.remainingProblems - 1,
                problemState: problemState,
            };
        });
        this.problemView?.setState({
            problemState,
        });
    }

    /**
     * Checks an answer that is received from the problem display.
     *
     * Updates the game score based on the answer and then generates the next problem
     */
    private checkAnswer(answer: string): void {
        if (this.state.problemState.result !== 'Unanswered') {
            return;
        }

        // Update score
        if (answer === this.state.problemState.currentProblem.answer) {
            this.adjustScore(1);
        } else {
            this.adjustScore(-1);
        }
    }

    /**
     * Renders the component
     */
    render() {
        return <div>
            <div>
                <span>Right: {this.state.rightAnswers}</span>
                <span>Wrong: {this.state.wrongAnswers}</span>
            </div>
            <img src={boatImage} height="450px"></img>
            <br/>
            <Countdown onTimeout={this.onTimeout}/>
            <ProblemView
                ref={(ref) => (this.problemView = ref)}
                problemState={this.state.problemState}
                onAnswer={this.checkAnswer}
            />
        </div>;
    }
}
