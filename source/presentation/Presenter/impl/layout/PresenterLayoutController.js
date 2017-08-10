import isDeepEqual from 'deep-equal';

import {BindMethodsBase} from 'BindMethodsBase_h436s_v0';
import {SystemException} from 'exceptionTypes_mjS3d_v0';

import DemosNavigation from '../../DemosNavigation/DemosNavigation';
import {convertPxToRem} from '../../share/convertPxAndRem';

import empty from './impl/emptyLayoutStructures/emptyLayoutStructures';
import StaticLayoutCalculator from './impl/StaticLayoutCalculator';

export const preferDemo = 'demo';
export const preferNavigation = 'navigation';

export default class PresenterLayoutController extends BindMethodsBase {
   constructor(
      {isDemoSelected, commitLayout, presenterConnection}
   ) {
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
         this.onNavigationRequest,
         this.onDemoRequest,
         this.onMaximizeDemoContainerRequest,
         this.afterDemoScroll
      ]);
   }
   
   get _parameters() {
      const Set = this._connection.settings;
      const LI = this._layoutInput;
      
      return {
         staticLayoutCalculator: this._staticLayoutCalculator,
         lat: this._layout,
         
         prUISet: Set.private.ui,
         prUXSet: Set.private.ux,
         
         LI,
         treeLI: LI.navigation.tree,
         dcLI: LI.demoContainer,
         dLI: LI.demoContainer.demo
      };
   }
   
   onUpdatedPresenterBounds(updatePx) {
      const {LI} = this._parameters;
      
      LI.widthRem = convertPxToRem(updatePx.bounds.width);
      LI.heightRem = convertPxToRem(updatePx.bounds.height);
      
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
      const {treeLI} = this._parameters;
      treeLI.widthRem = this._predictNavigationTreeWidthRem();
      this._updateIfStaticLayout();
   }
   
   onNavigationRequest() {
      const {LI, prUXSet} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferNavigation;
      LI.demoContainer.preferMaximized =
         prUXSet.preferMaximizedDemoView.later;
      
      this._updateIfStaticLayout();
   }
   
   onDemoRequest() {
      const {LI} = this._parameters;
      LI.preferShowingDemoOrNavigation = preferDemo;
      LI.demoContainer.isDemoSelected = true;
      
      this._updateIfStaticLayout();
   }
   
   onMaximizeDemoContainerRequest() {
      const {dcLI} = this._parameters;
      dcLI.preferMaximized = true;
      this._updateIfStaticLayout();
   }
   
   afterDemoScroll(verticalScrollDistancePx) {
      const {dLI} = this._parameters;
      
      dLI.verticalScrollDistanceRem
         = convertPxToRem(verticalScrollDistancePx);
      
      this._updateIfStaticLayout();
   }
   
   get isInitialized() {
      const {LI} = this._parameters;
      const i = parameter => parameter !== undefined;
      
      return i(LI.widthRem) && i(LI.heightRem)
             && i(LI.preferShowingDemoOrNavigation)
             //&& i(LI.header.heightRem) // TODO
             && i(LI.navigation.tree.widthRem)
             && i(LI.demoContainer.preferMaximized)
             && i(LI.demoContainer.isDemoSelected)
             && i(LI.demoContainer.demo.verticalScrollDistanceRem)
             //&& i(LI.footer.heightRem); // TODO
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
      
      LI.header.heightRem = undefined; // TODO
      LI.footer.heightRem = undefined; // TODO
      LI.navigation.tree.widthRem =
         this._predictNavigationTreeWidthRem();
      
      dcLI.preferMaximized = prUXSet.preferMaximizedDemoView.initially;
      dcLI.isDemoSelected = isDemoSelected;
      
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
         if (this._view && this._view.navigation)
            return this._view.navigation.predictWidthRem();
         else
            return DemosNavigation.predictWidthRem(
               this._connection.demosNavigation
            );
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