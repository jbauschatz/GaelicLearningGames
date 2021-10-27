import React from 'react';
import {BoatGameView} from './component/boat-game-view';
import {MainMenuView} from './component/main-menu-view';

type AppState = {
    state: 'Menu' | 'BoatGame'
}

/**
 * Component function for the top-level application
 */
export class App extends React.Component<{}, AppState> {
    /**
     * Initializes the component in the Menu state
     */
    constructor(props: {}) {
        super(props);

        this.state = {
            state: 'Menu',
        };

        this.newGame = this.newGame.bind(this);
    }

    /**
     * Begins a new instance of the Boat Game
     */
    private newGame() {
        this.setState({
            state: 'BoatGame',
        });
    }

    /**
     * Returns to the Main Menu
     */
    private mainMenu() {
        this.setState({
            state: 'Menu',
        });
    }

    /**
     * Renders the component
     */
    render() {
        if (this.state.state == 'BoatGame') {
            return <BoatGameView gameOver={() => this.mainMenu()}></BoatGameView>;
        } else {
            return <MainMenuView newGame={() => this.newGame()}></MainMenuView>;
        }
    }
}

export default App;
