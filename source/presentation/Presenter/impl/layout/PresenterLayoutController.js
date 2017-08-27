import isDeepEqual from 'deep-equal';

import {BindMethodsBase} from 'BindMethodsBase_h436s_v0';
import {SystemException} from 'exceptionTypes_mjS3d_v0';

import DemosNavigation from '../../DemosNavigation/DemosNavigation';
import PresenterHeader from '../../PresenterHeader/PresenterHeader';
import PresenterFooter from '../../PresenterFooter/PresenterFooter';
import {convertPxToRem} from '../../share/convertPxAndRem';

import empty from './impl/emptyLayoutStructures/emptyLayoutStructures';
import StaticLayoutCalculator from './impl/StaticLayoutCalculator';

export const preferDemo = 'demo';
export const preferNavigation = 'navigation';

export default class PresenterLayoutController extends BindMethodsBase {
   constructor(
      {isDemoSelected, commitLayout, presenterConnection}
   )
   {
      super();
      
      this._connection = presenterConnection;
      Object.assign(this, {
         _layoutInput: this._makeInitialLayoutInput({isDemoSelected}),
         _layout: undefined,
         _commitLayout: commitLayout
      });
      
      this._staticLayoutCalculator =
         new StaticLayoutCalculator({presenterConnection});
      
      this.bindMethods([
         this.onUpdatedPresenterBounds,
         this.onUpdatedDemoBounds,
         this.saveViewRef,
         this.onUpdatedNavigationTreeWidth,
         this.onDemoRequest,
         this.onHideNavigationRequest,
         this.onNavigationRequest,
         this.onMaximizeDemoContainerRequest,
         this.afterDemoScroll
      ]);
   }
   
   get _parameters() {
      const Set = this._connection.settings;
      const LI = this._layoutInput;
      
      return {
         staticLayoutCalculator: this._staticLayoutCalculator,
         
         prUISet: Set.private.ui,
         prUXSet: Set.private.ux,
         
         lat: this._layout,
         
         LI,
         navLI: LI.demosNavigation,
         dcLI: LI.demoContainer,
         sccLI: LI.demoContainer.scrollContainer,
         dLI: LI.demoContainer.scrollContainer.demo
      };
   }
   
   onUpdatedPresenterBounds(updatePx) {
      const {LI} = this._parameters;
      
      LI.widthRem = convertPxToRem(updatePx.bounds.width);
      LI.heightRem = convertPxToRem(updatePx.bounds.height);
      
      LI.header.heightRem = PresenterHeader.predictHeightRem({
         connection: this._connection.header,
         widthRem: LI.widthRem
      });
      
      LI.footer.heightRem = PresenterFooter.predictHeightRem({
         connection: this._connection.footer,
         widthRem: LI.widthRem
      });
      
      this._updateIfStaticLayout();
   }
   
   onUpdatedDemoBounds(updatePx) {
      const {dLI} = this._parameters;
      
      dLI.currentSize.widthWithMarginsRem
         = convertPxToRem(updatePx.bounds.width);
      dLI.currentSize.heightWithMarginsRem
         = convertPxToRem(updatePx.bounds.height);
      
      this._updateIfStaticLayout();
   }
   
   saveViewRef(r) {
      this._view = r;
   }
   
   onUpdatedNavigationTreeWidth() {
      const {navLI} = this._parameters;
      navLI.tree.widthRem = this._predictNavigationTreeWidthRem();
      this._updateIfStaticLayout();
   }
   
   _resetScrollPosition() {
      // TODO s5eek
      // Remove this by implementing
      // recalculation of scroll position, taking into account the
      // width and height of maximized and non-maximized demo.
      
      const {sccLI} = this._parameters;
      
      sccLI.verticalScrollDistanceRem = 0;
      if (this._view)
         this._view.setDemoScrollHeightPx(0);
   }
   
   onNavigationRequest() {
      const {LI, prUXSet} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferNavigation;
      LI.demoContainer.preferMaximized =
         prUXSet.preferMaximizedDemoView.later;
      
      this._resetScrollPosition(); // TODO s5eek
      
      this._updateIfStaticLayout();
   }
   
   onDemoRequest() {
      const {LI, sccLI} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferDemo;
      LI.demoContainer.isDemoSelected = true;
      sccLI.verticalScrollDistanceRem = 0;
      if (this._view)
         this._view.setDemoScrollHeightPx(0);
      
      this._updateIfStaticLayout();
   }
   
   onHideNavigationRequest() {
      const {LI, dcLI} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferDemo;
      dcLI.preferMaximized = true;
      
      this._resetScrollPosition(); // TODO s5eek
      
      this._updateIfStaticLayout();
   }
   
   onMaximizeDemoContainerRequest() {
      const {LI, dcLI} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferDemo;
      dcLI.preferMaximized = true;
      
      this._resetScrollPosition(); // TODO s5eek
      
      this._updateIfStaticLayout();
   }
   
   afterDemoScroll(verticalScrollDistancePx) {
      const {sccLI} = this._parameters;
      
      sccLI.verticalScrollDistanceRem
         = convertPxToRem(verticalScrollDistancePx);
      
      this._updateIfStaticLayout();
   }
   
   get isInitialized() {
      const {LI} = this._parameters;
      const i = parameter => parameter !== undefined;
      
      return i(LI.widthRem) && i(LI.heightRem)
             && i(LI.preferShowingDemoOrNavigation)
             && i(LI.header.heightRem)
             && i(LI.demosNavigation.tree.widthRem)
             && i(LI.demoContainer.preferMaximized)
             && i(LI.demoContainer.isDemoSelected)
             && i(LI.demoContainer.scrollContainer.verticalScrollDistanceRem)
             && i(LI.footer.heightRem);
   }
   
   get isAnimating() {
      return false;
   }
   
   _makeInitialLayoutInput({isDemoSelected}) {
      // do not use this._parameters yet
      const prUXSet = this._connection.settings.private.ux;
      
      let LI = JSON.parse(JSON.stringify(empty.layoutInput));
      let dcLI = LI.demoContainer;
      
      LI.preferShowingDemoOrNavigation =
         isDemoSelected ? preferDemo : preferNavigation;
      
      LI.demosNavigation.tree.widthRem =
         this._predictNavigationTreeWidthRem();
      
      dcLI.preferMaximized = prUXSet.preferMaximizedDemoView.initially;
      dcLI.isDemoSelected = isDemoSelected;
      dcLI.scrollContainer.verticalScrollDistanceRem = 0;
      
      return LI;
   }
   
   _updateIfStaticLayout() {
      if (this.isAnimating)
         return false;
      
      const {LI, lat, staticLayoutCalculator} = this._parameters;
      
      const newLayout = staticLayoutCalculator.getLayout(LI);
      if (!isDeepEqual(newLayout, lat)) {
         this._layout = newLayout;
         this._commitLayout(this._layout);
      }
   }
   
   _predictNavigationTreeWidthRem() {
      try {
         if (this._view && this._view.demosNavigation)
            return this._view.demosNavigation.predictWidthRem();
         else
            return DemosNavigation.predictWidthRem({
               demosNavigationConnection: this._connection.demosNavigation,
               selectedDemoConnection: this._connection.selectedDemo
            });
      }
      catch (e) {
         console.error(e)/*TODO: production change*/; // eslint-disable-line no-console
         
         const {prUISet, LI} = this._parameters;
         
         const defaultRatio = (prUISet.desktop
         ).navigationToPresenterWidthRatio.default;
         
         if (typeof LI.widthRem !== 'number'
             || typeof defaultRatio !== 'number'
         )
            throw new SystemException();
         
         return LI.widthRem * defaultRatio;
      }
   }
}