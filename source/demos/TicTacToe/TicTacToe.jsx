import PropTypes from 'prop-types';

export const propTypes = {
   style: PropTypes.object
};

// ==========================

import GameController from './impl/GameController';

export default class TicTacToe extends GameController { }

TicTacToe.propTypes = propTypes;