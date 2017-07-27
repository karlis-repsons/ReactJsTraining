import PropTypes from 'prop-types';

import DCInNavigationMode from './impl/DCInNavigationMode';

export default class ContainerInNavigationMode extends DCInNavigationMode { }

export const propTypes = {
   connection: PropTypes.object.isRequired, // IDCInNavigationModeConnection
   className: PropTypes.string,
   style: PropTypes.object,
   children: PropTypes.node,
   isDemoSelected: PropTypes.bool.isRequired,
   onMaximizeRequest: PropTypes.func // f()
};

ContainerInNavigationMode.propTypes = propTypes;