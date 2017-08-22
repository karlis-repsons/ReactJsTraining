import React from 'react';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import GameModel from './GameModel';
import GameView from './GameView';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: 0}
      },
      ux: {
         animation: {
            mayAnimateContentSize: false
         }
      }
   }
};

export default class GameController extends DemoBase {
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
                const marginThicknessRem =
                   Math.min(p.widthRem, p.heightRem) / 8;
                const style = Object.assign(
                    {
                        margin: `${marginThicknessRem}rem`
                    },
                    this.baseStyle
                );
      
                return (
                    <GameView
                        ref={r => this.view = r}
                        widthRem={p.widthRem - 2 * marginThicknessRem}
                        heightRem={p.heightRem - 2 * marginThicknessRem}
                        style={style}
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

GameController.settings = settings;