import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure'
import makeClassNames from 'classnames';
import {
   BrowserRouter as Router,
   Route as ActivableRouterContent
} from 'react-router-dom';

import {bindMethodsBaseExtends} from 'BindMethodsBase_h436s_v0';
import {convertRemToPx} from '../../share/convertPxAndRem';

import PresenterHeader from '../../PresenterHeader/PresenterHeader';
import PresenterFooter from '../../PresenterFooter/PresenterFooter';
import DemosNavigation from '../../DemosNavigation/DemosNavigation';
import DemoContainer from '../../DemoContainer/DemoContainer';

import PresenterViewStyler from './PresenterViewStyler';

export default class PresenterView
   extends bindMethodsBaseExtends(React.Component)
{
   constructor() {
      super();
      this.bindMethods([
         this._saveDemosNavigationRef,
         this._saveScrollContainerRef
      ]);
   }
   
   get _parameters() {
      const lat = this.props.layoutParameters;
      
      return {
         p: this.props,
         
         hLat: lat && lat.header,
         dcLat: lat && lat.demoContainer,
         sccLat: lat && lat.demoContainer.content.scrollContainer,
         fLat: lat && lat.footer
      };
   }
   
   render() {
      const {p} = this._parameters;
      
      const presenterClassNames = makeClassNames(
         'presenter Fh3r6 ', p.className);
      
      let styler;
      let content = null;
      if (p.shouldRenderContent) {
         styler = new PresenterViewStyler({props: p});
         content = [
            this._renderHeader(styler.header),
            this._renderNavigation(styler.demosNavigation),
            this._renderDemoContainer(styler.demoContainer),
            this._renderFooter(styler.footer)
         ];
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
                     {content}
                  </div>
               }
            </Measure>
         </Router>
      );
   }
   
   _saveDemosNavigationRef(r) { this.demosNavigation = r; }
   
   _renderHeader(style) {
      const {p, hLat} = this._parameters;
      
      return (
         <PresenterHeader
            connection={p.connection.header}
            widthRem={hLat.boundsRem.width}
            heightRem={hLat.boundsRem.height}
            style={style.css}
            contentStyle={style.content.css}
            key='PresenterHeader'
         />
      );
   }
   
   _renderNavigation(style) {
      const {p} = this._parameters;
      
      if (!p.shouldRenderContent)
         return;
      
      return (
         <DemosNavigation
            ref={this._saveDemosNavigationRef}
            connection={p.connection.demosNavigation}
            selectedDemoConnection={p.connection.selectedDemo}
            style={style.css}
            contentStyle={style.content.css}
            selectedDemoPathOnServer={p.selectedDemoPathOnServer}
            onUpdatedUITreeData={p.onUpdatedNavigationTreeWidth}
            onDemoRequest={p.onDemoRequest}
            onHideRequest={p.onMaximizeDemoContainerRequest}
            key='DemosNavigation'
         />);
   }
   
   _renderDemoContainer(style) {
      const {p, dcLat} = this._parameters;
      
      const isDemoSelected = !!p.selectedDemoPathOnServer;
      
      if (!this.props.shouldRenderContent || !isDemoSelected)
         return;
      
      return (
         <DemoContainer
            connection={p.connection.demoContainer}
            selectedDemoConnection={p.connection.selectedDemo}
            style={style.css}
            contentStyle={style.content.css}
            isDemoSelected={isDemoSelected}
            showMaximized={dcLat.isMaximized}
            onMaximizeRequest={p.onMaximizeDemoContainerRequest}
            onNavigationRequest={p.onNavigationRequest}
            key='DemoContainer'
         >
            {this._renderDemoScrollContainer(style.content.scrollContainer)}
         </DemoContainer>);
   }
   
   _renderDemoScrollContainer(style) {
      const {p, sccLat} = this._parameters;
      
      const demos = (
         p.connection.router.routes.map(
            (uiRoute, i) =>
               <ActivableRouterContent
                  path={uiRoute.demoPathOnServer}
                  render={
                     () => React.createElement(
                        uiRoute.demoUIComponent,
                        Object.assign(
                           {
                              style: style.demo.css,
                              widthRem: sccLat.boundsRem.width,
                              heightRem: sccLat.boundsRem.height,
                              widthPx: convertRemToPx(sccLat.boundsRem.width),
                              heightPx: convertRemToPx(sccLat.boundsRem.height)
                           },
                           uiRoute.demoOwnPropValues
                        ),
                        null)
                  }
                  key={i} />)
      );
      
      const demoPresentationSet =
         p.connection.selectedDemo.settings.presentation;
      
      let scrollContent;
      if (demoPresentationSet.ui.allDemoFitsInsideAnyContainer === true)
         scrollContent = demos;
      else
         scrollContent = (
            <Measure bounds onResize={p.onUpdatedDemoBounds}>
               {({measureRef}) =>
                  <div className='demo measurer' ref={measureRef}>
                     {demos}
                  </div>
               }
            </Measure>
         );
      
      return (
         <div className='demo scroll container'
              style={style.css}
              onScroll={() => {
                 p.afterDemoScroll(
                    this._scrollContainer.scrollTop);
              }}
              ref={this._saveScrollContainerRef}
         >
            {scrollContent}
         </div>
      );
   }
   
   _saveScrollContainerRef(r) {
      this._scrollContainer = r;
   }
   
   setDemoScrollHeightPx(h) {
      this._scrollContainer.scrollTop = h;
   }
   
   _renderFooter(style) {
      const {p, fLat} = this._parameters;
      
      return (
         <PresenterFooter
            connection={p.connection.footer}
            widthRem={fLat.boundsRem.width}
            heightRem={fLat.boundsRem.height}
            style={style.css}
            contentStyle={style.content.css}
            key='PresenterFooter'
         />
      );
   }
}

PresenterView.propTypes = {
   connection: PropTypes.object.isRequired,
   className: PropTypes.string,
   style: PropTypes.object,
   shouldRenderContent: PropTypes.bool.isRequired,
   layoutParameters: PropTypes.object,
   onUpdatedBounds: PropTypes.func,
   onUpdatedDemoBounds: PropTypes.func, // TODO
   onUpdatedNavigationTreeWidth: PropTypes.func,
   onMaximizeDemoContainerRequest: PropTypes.func,
   onNavigationRequest: PropTypes.func,
   onDemoRequest: PropTypes.func, // f({selectedDemoPathOnServer})
   afterDemoScroll: PropTypes.func, // f(verticalScrollDistancePx) TODO
   selectedDemoPathOnServer: PropTypes.string
};