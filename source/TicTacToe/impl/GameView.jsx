import React from 'react';
import PropTypes from 'prop-types';

import SquareContainer from 'SquareContainer_kU7d2';

import Board from './Board/Board';
import MovesList from './MovesList/MovesList';
import { playerX, playerXColor, playerOColor } from './constants';
import lengthsDiffer from 'areNumbersDifferent_tSbVE.js';
import changeHexColorLightness from 'changeHexColorLightness_k42fs';
import './GameView.scss';

export default class GameView extends React.Component {
    constructor() {
        super();
        this.state = { boardSideLength: 0 };
        this.setFBsRef = this.setFBsRef.bind(this);
        this.setStatusRef = this.setStatusRef.bind(this);
    }
    setFBsRef(r) { this.fBsDiv = r; this.updateMeasures(); }
    setStatusRef(r) { this.statusDiv = r; this.updateMeasures(); }
    updateMeasures() {
        let newBoardSideLength;

        if (!this.fBsDiv || (!this.statusDiv && this.props.statusText))
            newBoardSideLength = 0;
        else {
            const { width: W, height: H }
                = this.fBsDiv.getBoundingClientRect();
            const h = this.props.statusText
                ? this.statusDiv.getBoundingClientRect().height
                : 0;
            newBoardSideLength = Math.min(W, H - h);
        }
        if (lengthsDiffer(this.state.boardSideLength, newBoardSideLength)) {
            this.setState({ boardSideLength: newBoardSideLength });
        }
    }
    getStatusStyle() {
        const p = this.props;
        if (p.previousMoves && p.previousMoves.length > 0)
            return {
                color: changeHexColorLightness(
                    this.props.nextPlayer === playerX
                        ? playerXColor : playerOColor
                  , +30
                )
            };
    }
    render() {
        const p = this.props;
        return (
            <SquareContainer className='xI462 centered'>
                <div className='game f32x0'>
                    {p.titleText &&
                        <div className='title'> {p.titleText} </div>
                    }
                    <div className='f-bi'>
                        <MovesList className='history'
                            isVisible={p.isGameOver}
                            previousMoves={p.previousMoves}
                            currentMoveIndex={p.indexOfPreviousMarkings}
                            onClickAtMove={p.onPreviousMarkingsRequest}
                        />
                        <div className='f-bs' ref={this.setFBsRef}>
                            <Board className='board'
                                style={{
                                    height: this.state.boardSideLength
                                }}
                                markings={p.markings}
                                isGameOver={p.isGameOver}
                                onCellClick={p.onCellClick}
                            />
                            {p.statusText &&
                                <div className='status' ref={this.setStatusRef}
                                    style={this.getStatusStyle()}
                                >
                                    {p.statusText}
                                </div>
                            }
                            <div className='v-padding' />
                        </div>
                    </div>
                </div>
            </SquareContainer>
        );
    }
}

GameView.propTypes = {
    markings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    titleText: PropTypes.string,
    statusText: PropTypes.string,
    isGameOver: PropTypes.bool,
    nextPlayer: PropTypes.string,
    previousMoves: PropTypes.arrayOf(PropTypes.any), // use Flow types or TypeScript here
    indexOfPreviousMarkings: PropTypes.number,
    onCellClick: PropTypes.func, // f(i, j)
    onPreviousMarkingsRequest: PropTypes.func // f(index)
};