import React from 'react';

import {bindMethodsBaseExtends} from 'BindMethodsBase_h436s';

import {propTypes} from '../Presenter';
import PresenterLayoutController from './PresenterLayoutController';
import PresenterView from './PresenterView';

export default class PresenterActionController
   extends bindMethodsBaseExtends(React.Component)
{
   constructor(props) {
      super(props);
      this.state = {
         selectedDemoPathOnServer: undefined
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
      const {lCtrl} = this._parameters;
      
      this.setState({selectedDemoPathOnServer});
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
            className={p.className}
            sharedUISettings={p.connection.settings.shared.ui}
            style={p.style}
            shouldRenderContent={this.shouldRenderContent}
            layoutParameters={lat}
            onUpdatedBounds={lCtrl.onUpdatedPresenterBounds}
            navigationRefSaver={lCtrl.saveNavigationRef}
            onUpdatedNavigationTreeWidth={lCtrl.onUpdatedNavigationTreeWidth}
            onMaximizeDemoContainerRequest={
               lCtrl.onMaximizeDemoContainerRequest}
            onNavigationRequest={lCtrl.onNavigationRequest}
            onDemoRequest={this._onDemoRequest}
            selectedDemoPathOnServer={s.selectedDemoPathOnServer}
            demosNavigationConnection={p.connection.demosNavigation}
            demoContainerConnection={p.connection.demoContainer}
            routerConnection={p.connection.router}
         />
      );
   }
}

PresenterActionController.propTypes = propTypes;