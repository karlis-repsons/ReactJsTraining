import React from 'react';
import PropTypes from 'prop-types';

import GameModel from './GameModel';
import GameView from './GameView';

export default class GameController extends React.Component {
    constructor(props) {
        super(props);

        this.state = GameModel.initialState;
        const model = new GameModel({
            setState: s => this.setState(s),
            getState: () => this.state
        });

        const getTitleText = () => {
            let title = this.state.moves.previous.length === 0
                ? 'Tic Tac Toe' : '';
            
            if (this.state.isGameOver)
                title = this.state.winner !== null
                    ? `Winner - ${this.state.winner}`
                    : 'Draw';

            return title;
        };
        const getStatusText = () => {
            let status = '';
            if (!this.state.isGameOver)
                status = `Next player - ${this.state.moves.next.player}`;

            return status;
        };

        Object.assign(this, {
            render() {
                const p = this.props;
      
                return (
                    <GameView
                        ref={r => this.view = r}
                        widthRem={p.widthRem}
                        heightRem={p.heightRem}
                        style={p.style}
                        markings={this.state.display.markings}
                        titleText={getTitleText()}
                        statusText={getStatusText()}
                        isGameOver={this.state.isGameOver}
                        nextPlayer={this.state.moves.next.player}
                        previousMoves={this.state.moves.previous}
                        indexOfPreviousMarkings={
                            this.state.display.indexOfPreviousMarkings
                        }
                        onCellClick={
                            (i, j) => model.handleSquareClickAt(i, j)
                        }
                        onPreviousMarkingsRequest={
                            i => model.showPreviousMarkingsAt(i)
                        }
                    />
                );
            }
        });
    }
    componentDidUpdate() {
        this.view.updateMeasures();
    }
    componentDidMount() {
        this.view.updateMeasures();
    }
}

GameController.propTypes = {
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   style: PropTypes.object
};