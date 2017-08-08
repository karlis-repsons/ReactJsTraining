import update from 'immutability-helper';

import { playerX, playerO, cellsAtSideCount } from './constants';

const initialState = {
    display: {
        markings: Array(cellsAtSideCount).fill(null)
            .map(() => new Array(cellsAtSideCount).fill(null)),
        indexOfPreviousMarkings: undefined
    },
    moves: {
        next: { player: playerX },
        previous: [
            /* { player, position: [i, j], markingsAfterMove[][] }
                - use Flow types or TypeScript for the intended content type
            */
        ]
    },
    isGameOver: false,
    winner: null
};

export default class GameModel {
    // GameModel manages state, which is kept in GameController
    constructor({ setState, getState }) {
        this.setState = setState;
        this.getState = getState;
    }
    getNextPlayer() {
        const state = this.getState();
        if (state.moves.next.player === playerX)
            return playerO;

        if (state.moves.next.player === playerO)
            return playerX;

        throw Error(`Got invalid player: '${state.moves.next.player}'`);
    }
    handleSquareClickAt(i, j, callbackOnStateUpdated) {
        const oldState = this.getState();
        const initialMarkings = oldState.display.markings;
        if (oldState.isGameOver || initialMarkings[i][j] !== null)
            return;

        let newMarkings = initialMarkings.slice().map(array => array.slice());
        newMarkings[i][j] = oldState.moves.next.player;
        const newMove = {
            player: oldState.moves.next.player,
            position: [i, j],
            markingsAfterMove: newMarkings
        };
        const winner = this.calculateWinner(newMarkings);
        const isGameOver = winner !== null
            || oldState.moves.previous.length + 1 === cellsAtSideCount ** 2;

        this.setState(update(
            oldState, {
                display: { markings: { $set: newMarkings } },
                moves: {
                    next: { player: { $set: this.getNextPlayer() } },
                    previous: { $push: [newMove] }
                },
                winner: { $set: winner },
                isGameOver: { $set: isGameOver }
            }),
            callbackOnStateUpdated
        );
    }
    showPreviousMarkingsAt(moveIndex, callbackOnStateUpdated) {
        const oldState = this.getState();
        const move = oldState.moves.previous[moveIndex];
        this.setState(update(
            oldState, {
                display: {
                    markings: { $set: move.markingsAfterMove },
                    indexOfPreviousMarkings: { $set: moveIndex }
                }
            }),
            callbackOnStateUpdated
        );
    }
    calculateWinner(markings) {
        const winningArrangements = [
            // rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ];
        for (const [[i0, j0], [i1, j1], [i2, j2]] of winningArrangements)
            if (markings[i0][j0] && markings[i0][j0] === markings[i1][j1]
                && markings[i0][j0] === markings[i2][j2]
            )
                return markings[i0][j0];
        return null;
    }
}

GameModel.initialState = initialState;