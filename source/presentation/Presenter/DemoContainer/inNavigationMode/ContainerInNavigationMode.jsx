import PropTypes from 'prop-types';

import DCInNavigationMode from './impl/DCInNavigationMode';

export default class ContainerInNavigationMode extends DCInNavigationMode { }

export const propTypes = {
   connection: PropTypes.object.isRequired, // IDCInNavigationModeConnection
   selectedDemoConnection: PropTypes.object.isRequired, // ISelectedDemoConnection
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired,
   children: PropTypes.node,
   isDemoSelected: PropTypes.bool.isRequired,
   onMaximizeRequest: PropTypes.func // f()
};

ContainerInNavigationMode.propTypes = propTypes;