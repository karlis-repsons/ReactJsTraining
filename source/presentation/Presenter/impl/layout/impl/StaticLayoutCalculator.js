import {convertPxToRem} from '../../../share/convertPxAndRem';

import DemoContainer from '../../../DemoContainer/DemoContainer'
import empty from './emptyLayoutStructures/emptyLayoutStructures';
import {preferDemo, preferNavigation} from '../PresenterLayoutController';

export default class StaticLayoutCalculator {
   constructor({presenterConnection}) {
      this._presenterConnection = presenterConnection;
      Object.assign(this, {
         _layoutInput: undefined,
         _derivedLayoutInput: undefined,
         _layout: undefined
      });
   }
   
   get _parameters() {
      const pConn = this._presenterConnection;
      const LI = this._layoutInput;
      const lat = this._layout;
      
      return {
         prUISet: pConn.settings.private.ui,
         hSet: pConn.header.settings,
         dcNavPrUISet: pConn.demoContainer.inNavigationMode.settings.private.ui,
         dcMaxPrUISet: pConn.demoContainer.inMaximizedMode.settings.private.ui,
         deSet: pConn.selectedDemo.settings,
         fSet: pConn.footer.settings,
         
         LI,
         DLI: this._derivedLayoutInput,
         
         hLI: LI.header,
         treeLI: LI.demosNavigation.tree,
         dcLI: LI.demoContainer,
         sccLI: LI.demoContainer.scrollContainer,
         deLI: LI.demoContainer.scrollContainer.demo,
         fLI: LI.footer,
         
         lat,
         rLat: lat.root,
         hLat: lat.header,
         navLat: lat.demosNavigation,
         dcLat: lat.demoContainer,
         dccLat: lat.demoContainer.content,
         sccLat: lat.demoContainer.content.scrollContainer,
         fLat: lat.footer
      };
   }
   
   getLayout(layoutInput) {
      this._layoutInput = layoutInput;
      this._layout = JSON.parse(JSON.stringify(empty.layout));
      this._derivedLayoutInput = {};
      
      this._setDerivedLayoutInput();
      
      this._setDisplayMode();
      this._setRoot();
      this._setHeader();
      this._setNavigation();
      if (this._layoutInput.demoContainer.isDemoSelected)
         this._setDemoContainer();
      this._setFooter();
      
      return this._layout;
   }
   
   _setDerivedLayoutInput() {
      const {
         prUISet, hSet, deSet, fSet, LI, DLI, hLI, dcLI, sccLI, deLI, fLI
      } = this._parameters;
      
      const setDerivedDisplayMode = () => {
         const navigationWidthRem = LI.demosNavigation.tree.widthRem;
         const presenterWidthRem = LI.widthRem;
         const maxRatio = (prUISet.desktop
         ).navigationToPresenterWidthRatio.max;
         
         DLI.isMobileUIMode =
            navigationWidthRem / presenterWidthRem > maxRatio;
      };
      
      // requires DLI.isMobileUIMode
      const setDemoContainerMode = () => {
         DLI.isDemoContainerMaximized = DLI.isMobileUIMode ?
            LI.preferShowingDemoOrNavigation === preferDemo
            :
            dcLI.isDemoSelected && dcLI.preferMaximized;
      };
      
      // requires DLI.isDemoContainerMaximized
      const setDemoContainerPadding = () => {
         DLI.demoContainerPaddingRem =
            DemoContainer.predictPaddingRem({
               demoContainerConnection: this._presenterConnection.demoContainer,
               selectedDemoConnection: this._presenterConnection.selectedDemo,
               isDemoContainerMaximized: DLI.isDemoContainerMaximized
            });
      };
      
      const setVisibleHeaderHeight = () => {
         const scrollSet = hSet.private.ux.scrolling;
         const accelerationFactor = scrollSet.verticalAccelerationFactor;
         
         const calcVHeight =
            hLI.heightRem
            - sccLI.verticalScrollDistanceRem * accelerationFactor;
         
         DLI.visibleHeaderHeightRem = Math.max(0, calcVHeight);
      };
      
      // requires DLI.visibleHeaderHeightRem, ?DLI.demoContainerPaddingRem
      const setVisibleFooterHeight = () => {
         let result;
         
         if (!deSet)
            result = fLI.heightRem;
         else {
            if (deSet.presentation.ui.allDemoFitsInsideAnyContainer)
               result = fLI.heightRem;
            else if (!deLI.currentSize ||
                     typeof deLI.currentSize.heightWithMarginsRem !== 'number'
            )
               result = 0;
            else {
               const scrollSet = fSet.private.ux.scrolling;
               const accelerationFactor = scrollSet.verticalAccelerationFactor;
               const cf = 1 / (1 + accelerationFactor);
               const dcPaddingRem = DLI.demoContainerPaddingRem;
               const calcVHeight =
                  (1 - cf) * (
                              LI.heightRem - DLI.visibleHeaderHeightRem
                              - deLI.currentSize.heightWithMarginsRem
                              + sccLI.verticalScrollDistanceRem
                              - dcPaddingRem.top - dcPaddingRem.bottom
                           )
                  + cf * fLI.heightRem;
               
               result = Math.min(fLI.heightRem, Math.max(0, calcVHeight));
            }
         }
         
         DLI.visibleFooterHeightRem = result;
      };
      
      setDerivedDisplayMode();
      setDemoContainerMode();
      if (dcLI.isDemoSelected)
         setDemoContainerPadding();
      setVisibleHeaderHeight();
      setVisibleFooterHeight();
   }
   
   _setDisplayMode() {
      const {DLI, lat} = this._parameters;
      lat.isMobileUIMode = DLI.isMobileUIMode;
   }
   
   _setRoot() {
      const {rLat} = this._parameters;
      
      rLat.containsHeader = false;
      rLat.containsFooter = false;
   }
   
   _setHeader() {
      const {LI, hLI, DLI, hLat} = this._parameters;
      
      hLat.boundsRem = {
         top: DLI.visibleHeaderHeightRem - hLI.heightRem,
         left: 0,
         width: LI.widthRem,
         height: hLI.heightRem
      };
      
      hLat.content = {
         boundsRem: {
            top: 0, right: 0, bottom: 0, left: 0
         }
      };
   }
   
   _setNavigation() {
      const {LI, DLI, treeLI, navLat} = this._parameters;
      
      navLat.isMaximized = DLI.isMobileUIMode ?
         ( LI.preferShowingDemoOrNavigation === preferNavigation
           || LI.demoContainer.isDemoSelected === false)
         :
         LI.demoContainer.isDemoSelected === false;
      
      navLat.boundsRem = {
         top: DLI.visibleHeaderHeightRem,
         bottom: DLI.visibleFooterHeightRem,
         left: 0,
         width: navLat.isMaximized ?
            LI.widthRem
            :
            Math.min(treeLI.widthRem, LI.widthRem)
      };
      
      navLat.isHidden = DLI.isMobileUIMode ?
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
   
   _setDemoContainer() {
      const {
         dcNavPrUISet, dcMaxPrUISet, deSet,
         LI, DLI, dcLI, deLI, dcLat, dccLat, sccLat
      } = this._parameters;
      
      const setOuterLat = () => {
         dcLat.isMaximized = DLI.isDemoContainerMaximized;
         
         const demoContainerWidthRem = DLI.isDemoContainerMaximized ?
            LI.widthRem
            :
            LI.widthRem - LI.demosNavigation.tree.widthRem;
         
         dcLat.boundsRem = {
            top: DLI.visibleHeaderHeightRem,
            left: LI.widthRem - demoContainerWidthRem,
            width: demoContainerWidthRem,
            height: LI.heightRem
                    - DLI.visibleHeaderHeightRem - DLI.visibleFooterHeightRem
         };
         
         dcLat.isHidden = DLI.isMobileUIMode ?
            LI.preferShowingDemoOrNavigation === preferNavigation
            :
            dcLI.isDemoSelected === false;
         
         dcLat.containsHeader = true;
         dcLat.containsFooter = true;
      };
      
      // depends on dcLat.boundsRem.{width,height}
      const setOuterContentLat = () => {
         dcLat.content.boundsRem = {
            top: 0, bottom: 0, left: 0, right: 0,
            width: dcLat.boundsRem.width,
            height: dcLat.boundsRem.height
         };
      };
      
      // depends on dcLat.isMaximized, dccLat.boundsRem.{width,height}
      const setScrollContainerLat = () => {
         const dcPadPrRem = DLI.demoContainerPaddingRem;
         const getBorderThicknessAtSidesPx = () => {
            const prUISet = dcLat.isMaximized ? dcMaxPrUISet : dcNavPrUISet;
            const brdSet = prUISet.bordersIfDemoWantsBorder;
            const deUISet = deSet.presentation.ui;
            let result = {top: 0, right: 0, bottom: 0, left: 0};
            if (deUISet.demoPreferences.wantsBorder === true) {
               result = {
                  top: dcPadPrRem.top < Number.EPSILON && brdSet.top ?
                     convertPxToRem(brdSet.top.thicknessPx)
                     : 0,
                  right: dcPadPrRem.right < Number.EPSILON && brdSet.right ?
                     convertPxToRem(brdSet.right.thicknessPx)
                     : 0,
                  bottom: dcPadPrRem.bottom < Number.EPSILON && brdSet.bottom ?
                     convertPxToRem(brdSet.bottom.thicknessPx)
                     : 0,
                  left: dcPadPrRem.left < Number.EPSILON && brdSet.left ?
                     convertPxToRem(brdSet.left.thicknessPx)
                     : 0,
               };
            }
            return result;
         };
         
         const borderThicknessRemAt = getBorderThicknessAtSidesPx();
         const sccHeightRem = dccLat.boundsRem.height
                              - dcPadPrRem.top - dcPadPrRem.bottom
                              - borderThicknessRemAt.top
                              - borderThicknessRemAt.bottom;
         sccLat.boundsRem = {
            top: dcPadPrRem.top,
            bottom: dcPadPrRem.bottom,
            left: dcPadPrRem.left,
            right: dcPadPrRem.right,
            width: dccLat.boundsRem.width
                   - dcPadPrRem.left - dcPadPrRem.right
                   - borderThicknessRemAt.left - borderThicknessRemAt.right,
            height: sccHeightRem
         };
         
         if (deSet.presentation.ui.allDemoFitsInsideAnyContainer)
            sccLat.hasScroll = false;
         else if (!deLI.currentSize
                  || !deLI.currentSize.heightWithMarginsRem
         )
            sccLat.hasScroll = false;
         else
            sccLat.hasScroll =
               sccHeightRem < deLI.currentSize.heightWithMarginsRem;
      };
      
      setOuterLat();
      setOuterContentLat();
      setScrollContainerLat();
   }
   
   _setFooter() {
      const {LI, DLI, fLI, fLat} = this._parameters;
      
      fLat.boundsRem = {
         bottom: DLI.visibleFooterHeightRem - fLI.heightRem,
         left: 0,
         width: LI.widthRem,
         height: fLI.heightRem
      };
      
      fLat.content = {
         boundsRem: {
            top: 0, right: 0, bottom: 0, left: 0
         }
      };
   }
}