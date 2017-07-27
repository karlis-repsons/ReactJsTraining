import PropTypes from 'prop-types';

import PresenterActionController from './impl/PresenterActionController';

export default class Presenter extends PresenterActionController { }
export const propTypes = {
   connection: PropTypes.object.isRequired, // IPresenterConnection
   className: PropTypes.string,
   style: PropTypes.object
};
Presenter.propTypes = propTypes;