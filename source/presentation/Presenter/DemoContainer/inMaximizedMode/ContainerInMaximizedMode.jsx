import PropTypes from 'prop-types';

import DCInMaximizedMode from './impl/DCInMaximizedMode';

export default class ContainerInMaximizedMode extends DCInMaximizedMode { }

export const propTypes = {
   connection: PropTypes.object.isRequired, // IDCInMaximizedModeConnection
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired,
   children: PropTypes.node,
   isDemoSelected: PropTypes.bool.isRequired,
   onNavigationRequest: PropTypes.func // f()
};

ContainerInMaximizedMode.propTypes = propTypes;