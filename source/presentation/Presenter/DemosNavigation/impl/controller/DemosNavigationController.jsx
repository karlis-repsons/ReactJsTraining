import React from 'react';

import {bindMethodsBaseExtends} from 'BindMethodsBase_h436s_v0';

import propTypes from '../../DemosNavigation';
import makeUITree from './makeUITree';
import predictDemosNavigationWidthRem from './predictDemosNavigationWidthRem';
import DemosNavigationView from '../view/DemosNavigationView';

export default class DemosNavigationController
   extends bindMethodsBaseExtends(React.Component)
{
   constructor(props) {
      super(props);
      this.state = {
         uiTreeData: makeUITree({
            demosNavigationConnection: props.connection,
            selectedDemoConnection: props.selectedDemoConnection,
            onDemoRequest: props.onDemoRequest
         })
      };
      this.bindMethods([this.gotNewUITreeData]);
   }
   
   static predictWidthRem(
      {demosNavigationConnection, selectedDemoConnection}
   )
   {
      return predictDemosNavigationWidthRem({
         demosNavigationConnection, selectedDemoConnection
      });
   }
   
   predictWidthRem() {
      return predictDemosNavigationWidthRem({
         demosNavigationConnection: this.props.connection,
         selectedDemoConnection: this.props.selectedDemoConnection,
         uiTreeData: this.state.uiTreeData
      });
   }
   
   gotNewUITreeData(newUITree) {
      this.setState({uiTreeData: newUITree},
         () => this.props.onUpdatedUITreeData());
   }
   
   render() {
      return (
         <DemosNavigationView
            connection={this.props.connection}
            style={this.props.style}
            contentStyle={this.props.contentStyle}
            uiTreeData={this.state.uiTreeData}
            gotNewUITreeData={this.gotNewUITreeData}
         />
      );
   }
}

DemosNavigationController.propTypes = propTypes;