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

import PresenterFooterController from './impl/controller/PresenterFooterController';
export default class PresenterFooter extends PresenterFooterController {}

PresenterFooter.propTypes = propTypes;