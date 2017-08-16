import PropTypes from 'prop-types';

export const propTypes = {
   connection: PropTypes.object.isRequired,
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired
};

/*
Static methods:
   * predictHeightRem ({ connection, widthRem })
*/

import PresenterHeaderController from './impl/controller/PresenterHeaderController';
export default class PresenterHeader extends PresenterHeaderController {}

PresenterHeader.propTypes = propTypes;