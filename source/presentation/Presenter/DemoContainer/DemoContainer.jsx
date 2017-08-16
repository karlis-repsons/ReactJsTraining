import PropTypes from 'prop-types';

import DemoContainerController from './impl/DemoContainerController';

/*
Static methods:
   predictPaddingRem ({
      demoContainerConnection,
      selectedDemoConnection,
      isDemoContainerMaximized })
*/

export default class DemoContainer extends DemoContainerController { }
export const propTypes = {
   connection: PropTypes.object.isRequired, // IDemoContainerConnection
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired,
   children: PropTypes.node,
   isDemoSelected: PropTypes.bool.isRequired,
   showMaximized: PropTypes.bool.isRequired,
   onMaximizeRequest: PropTypes.func, // f()
   onNavigationRequest: PropTypes.func // f()
};
DemoContainer.propTypes = propTypes;