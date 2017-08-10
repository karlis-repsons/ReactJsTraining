import DemoContainer from '../../../DemoContainer/DemoContainer'
import empty from './emptyLayoutStructures/emptyLayoutStructures';
import {preferDemo, preferNavigation} from '../PresenterLayoutController';

export default class StaticLayoutCalculator {
   constructor({presenterConnection}) {
      this._presenterConnection = presenterConnection;
      Object.assign(this, {
         _layoutInput: undefined,
         _layout: undefined
      });
   }
   
   get _parameters() {
      const Set = this._presenterConnection.settings;
      const LI = this._layoutInput;
      const lat = this._layout;
      
      return {
         prUISet: Set.private.ui,
         
         LI,
         treeLI: LI.navigation.tree,
         dcLI: LI.demoContainer,
         
         lat,
         rLat: lat.root,
         hLat: lat.header,
         navLat: lat.navigation,
         dcLat: lat.demoContainer,
         //fLat: lat.footer
      };
   }
   
   getLayout(layoutInput) {
      this._layoutInput = layoutInput;
      this._layout = JSON.parse(JSON.stringify(empty.layout));
      
      this._setDisplayMode();
      this._setRoot();
      this._setHeader();
      this._setNavigation();
      this._setDemoContainer();
      this._setFooter();
      
      return this._layout;
   }
   
   _setDisplayMode() {
      const {prUISet, LI, lat} = this._parameters;
      
      const navigationWidthRem = LI.navigation.tree.widthRem;
      const presenterWidthRem = LI.widthRem;
      const maxRatio = (prUISet.desktop
      ).navigationToPresenterWidthRatio.max;
      
      lat.isMobileUIMode =
         navigationWidthRem / presenterWidthRem > maxRatio;
   }
   
   _setRoot() {
      const {rLat} = this._parameters;
      
      rLat.containsHeader = false;
      rLat.containsFooter = false;
   }
   
   _setHeader() {
      // TODO
   }
   
   // requires lat.isMobileUIMode
   _setNavigation() {
      const {LI, treeLI, lat, navLat} = this._parameters;
      
      navLat.isMaximized = lat.isMobileUIMode ?
         ( LI.preferShowingDemoOrNavigation === preferNavigation
           || LI.demoContainer.isDemoSelected === false)
         :
         LI.demoContainer.isDemoSelected === false;
      
      navLat.boundsRem = {
         top: 0, bottom: 0,
         left: 0,
         width: navLat.isMaximized ?
            LI.widthRem
            :
            Math.min(treeLI.widthRem, LI.widthRem)
      };
      
      navLat.isHidden = lat.isMobileUIMode ?
         LI.preferShowingDemoOrNavigation === preferDemo
         :
         ( LI.demoContainer.isDemoSelected
           && LI.demoContainer.preferMaximized);
      
      navLat.content = {
         boundsRem: {
            top: 0, right: 0, bottom: 0, left: 0
         }
      };
   }
   
   // requires lat.isMobileUIMode
   _setDemoContainer() {
      const {LI, dcLI, lat, dcLat} = this._parameters;
      
      dcLat.isMaximized = lat.isMobileUIMode ?
         LI.preferShowingDemoOrNavigation === preferDemo
         :
         dcLI.isDemoSelected && dcLI.preferMaximized;
      
      const demoContainerWidthRem = dcLat.isMaximized ?
         LI.widthRem
         :
         LI.widthRem - LI.navigation.tree.widthRem;
      
      dcLat.boundsRem = {
         top: 0, bottom: 0,
         left: LI.widthRem - demoContainerWidthRem,
         width: demoContainerWidthRem
      };
      
      dcLat.isHidden = lat.isMobileUIMode ?
         LI.preferShowingDemoOrNavigation === preferNavigation
         :
         dcLI.isDemoSelected === false;
      
      const dcPadPrRem =
         DemoContainer.predictPaddingRem({
            connection: this._presenterConnection.demoContainer,
            isDemoContainerMaximized: dcLat.isMaximized
         });
      
      dcLat.containsHeader = true;
      dcLat.containsFooter = true;
      
      dcLat.content.boundsRem = {
         top: dcPadPrRem.top,
         bottom: dcPadPrRem.bottom,
         left: dcPadPrRem.left,
         right: dcPadPrRem.right,
         width: demoContainerWidthRem
                - dcPadPrRem.left - dcPadPrRem.right,
         height: LI.heightRem
                 - dcPadPrRem.top - dcPadPrRem.bottom
      };
   }
   
   _setFooter() {
      // TODO
   }
}