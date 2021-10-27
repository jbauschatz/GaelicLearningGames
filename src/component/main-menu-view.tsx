import React from 'react';

type MainMenuViewProps = {
    newGame: () => void
}

/**
 * Main menu of the game
 */
export class MainMenuView extends React.Component<MainMenuViewProps, {}> {
    /**
     * Renders the component
     */
    render() {
        return (<div>
            <button onClick={this.props.newGame}>
                New Game
            </button>
        </div>);
    }
}
