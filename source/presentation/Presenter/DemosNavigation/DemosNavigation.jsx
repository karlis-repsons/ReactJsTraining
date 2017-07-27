import PropTypes from 'prop-types';

import DemosNavigationController from './impl/controller/DemosNavigationController';

/*
Instance methods:
   * predictWidthRem
   
Static Methods:
   * predictWidthRem ( demosNavigationConnection )
 */

export default class DemosNavigation extends DemosNavigationController { }

export const propTypes = {
   connection: PropTypes.object.isRequired, // IDemosNavigationConnection
   className: PropTypes.string,
   style: PropTypes.object,
   contentStyle: PropTypes.object,
   selectedDemoPathOnServer: PropTypes.string,
   onUpdatedUITreeData: PropTypes.func, // f()
   onDemoRequest: PropTypes.func // f({selectedDemoPathOnServer})
};

DemosNavigation.propTypes = propTypes;