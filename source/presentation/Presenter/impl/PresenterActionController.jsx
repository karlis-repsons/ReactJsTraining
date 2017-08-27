import React from 'react';

import {bindMethodsBaseExtends} from 'BindMethodsBase_h436s_v0';

import {propTypes} from '../Presenter';
import PresenterLayoutController from './layout/PresenterLayoutController';
import PresenterView from './view/PresenterView';

export default class PresenterActionController
   extends bindMethodsBaseExtends(React.Component)
{
   constructor(props) {
      super(props);
      this.state = {
         selectedDemo: {
            pathOnServer: undefined
         }
      };
      this._layoutController = new PresenterLayoutController({
         isDemoSelected: false,
         commitLayout: newLayout => this.setState({layout: newLayout}),
         presenterConnection: props.connection
      });
      this.bindMethods([this._onDemoRequest]);
   }
   
   get _parameters() {
      return {
         p: this.props,
         s: this.state,
         lCtrl: this._layoutController,
         lat: this.state.layout
      };
   }
   
   _onDemoRequest({selectedDemoPathOnServer}) {
      const {p, lCtrl} = this._parameters;
      
      p.connection.onDemoRequest(selectedDemoPathOnServer);
      this.setState({
         selectedDemo: {
            pathOnServer: selectedDemoPathOnServer
         }
      });
      lCtrl.onDemoRequest();
   }
   
   get shouldRenderContent() {
      const {lCtrl} = this._parameters;
      return lCtrl.isInitialized;
   }
   
   render() {
      const {p, s, lCtrl, lat} = this._parameters;
      
      return (
         <PresenterView
            ref={lCtrl.saveViewRef}
            connection={p.connection}
            className={p.className}
            style={p.style}
            shouldRenderContent={this.shouldRenderContent}
            layoutParameters={lat}
            onUpdatedBounds={lCtrl.onUpdatedPresenterBounds}
            onUpdatedDemoBounds={lCtrl.onUpdatedDemoBounds}
            onUpdatedNavigationTreeWidth={lCtrl.onUpdatedNavigationTreeWidth}
            onDemoRequest={this._onDemoRequest}
            onHideNavigationRequest={lCtrl.onHideNavigationRequest}
            onMaximizeDemoContainerRequest={
               lCtrl.onMaximizeDemoContainerRequest}
            onNavigationRequest={lCtrl.onNavigationRequest}
            afterDemoScroll={lCtrl.afterDemoScroll}
            selectedDemoPathOnServer={s.selectedDemo.pathOnServer}
         />
      );
   }
}

PresenterActionController.propTypes = propTypes;