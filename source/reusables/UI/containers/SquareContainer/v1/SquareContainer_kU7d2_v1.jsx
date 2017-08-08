import PropTypes from 'prop-types';

export const propTypes = {
   outerClassName: PropTypes.string,
   outerStyle: PropTypes.object,
   squareClassName: PropTypes.string,
   squareStyle: PropTypes.object,
   outputGivenStylesUnmodified: PropTypes.bool,
   outerWidthRem: PropTypes.number,
   outerHeightRem: PropTypes.number,
   squareSideLengthRem: PropTypes.number,
   squareAlignment: PropTypes.string,
   children: PropTypes.node
};

export const squareAlignments = {
   centered: 'centered'
};

// ==========================

import Controller from './impl/controller/Controller';
export default class SquareContainer extends Controller { }
export {SquareContainer};
SquareContainer.propTypes = propTypes;

import SimpleExample from './examples/Simple';
export {SimpleExample};