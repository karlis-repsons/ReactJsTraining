import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure'
import makeClassNames from 'classnames';
import {
   BrowserRouter as Router,
   Route as ActivableRouterContent
} from 'react-router-dom';

import DemosNavigation from '../DemosNavigation/DemosNavigation';
import DemoContainer from '../DemoContainer/DemoContainer';
import PresenterViewStyler from './PresenterViewStyler';
import {convertRemToPx} from '../share/convertPxAndRem';

export default class PresenterView extends React.Component {
   get _parameters() {
      const lat = this.props.layoutParameters;
      
      return {
         p: this.props,
         dcLat: lat && lat.demoContainer,
         dccLat: lat && lat.demoContainer.content
      };
   }
   
   render() {
      const {p} = this._parameters;
      
      const presenterClassNames = makeClassNames(
         'presenter Fh3r6 ', p.className);
      
      let styler;
      if (p.shouldRenderContent) {
         styler = new PresenterViewStyler({
            styleFromProp: p.style,
            layoutParameters: p.layoutParameters,
            sharedUISettings: p.sharedUISettings
         });
      }
      
      return (
         <Router>
            <Measure bounds onResize={p.onUpdatedBounds}>
               {({measureRef}) =>
                  <div
                     className={presenterClassNames}
                     style={styler && styler.presenter.css}
                     ref={measureRef}
                  >
                     {this._renderNavigation(styler)}
                     {this._renderDemoContainer(styler)}
                  </div>
               }
            </Measure>
         </Router>
      );
   }
   
   _renderNavigation(viewStyler) {
      const {p} = this._parameters;
      
      if (!p.shouldRenderContent)
         return;
      
      return (
         <DemosNavigation
            ref={p.navigationRefSaver}
            connection={p.demosNavigationConnection}
            style={viewStyler.demosNavigation.css}
            contentStyle={viewStyler.navigationContent.css}
            selectedDemoPathOnServer={p.selectedDemoPathOnServer}
            onUpdatedUITreeData={p.onUpdatedNavigationTreeWidth}
            onDemoRequest={p.onDemoRequest}
         />);
   }
   
   _renderDemoContainer(viewStyler) {
      if (!this.props.shouldRenderContent)
         return;
      
      const {p, dcLat, dccLat} = this._parameters;
      
      return (
         <DemoContainer
            connection={p.demoContainerConnection}
            style={viewStyler.demoContainer.css}
            isDemoSelected={!!p.selectedDemoPathOnServer}
            showMaximized={dcLat.isMaximized}
            onMaximizeRequest={p.onMaximizeDemoContainerRequest}
            onNavigationRequest={p.onNavigationRequest}
         >
            {p.routerConnection.routes.map(
               (uiRoute, i) =>
                  <ActivableRouterContent
                     path={uiRoute.demoPathOnServer}
                     render={
                        () => React.createElement(
                           uiRoute.demoUIComponent,
                           {
                              style: viewStyler.demoContent.css,
                              widthRem: dccLat.boundsRem.width,
                              heightRem: dccLat.boundsRem.height,
                              widthPx: convertRemToPx(dccLat.boundsRem.width),
                              heightPx: convertRemToPx(dccLat.boundsRem.height)
                           },
                           null)
                     }
                     key={i} />)}
         </DemoContainer>);
   }
}

PresenterView.propTypes = {
   sharedUISettings: PropTypes.object.isRequired,
   className: PropTypes.string,
   style: PropTypes.object,
   shouldRenderContent: PropTypes.bool.isRequired,
   layoutParameters: PropTypes.object,
   onUpdatedBounds: PropTypes.func,
   navigationRefSaver: PropTypes.func,
   onUpdatedNavigationTreeWidth: PropTypes.func,
   onMaximizeDemoContainerRequest: PropTypes.func,
   onNavigationRequest: PropTypes.func,
   onDemoRequest: PropTypes.func, // f({selectedDemoPathOnServer})
   selectedDemoPathOnServer: PropTypes.string,
   demosNavigationConnection: PropTypes.object.isRequired,
   demoContainerConnection: PropTypes.object.isRequired,
   routerConnection: PropTypes.object.isRequired
};