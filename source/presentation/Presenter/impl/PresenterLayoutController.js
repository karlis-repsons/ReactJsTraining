import {BindMethodsBase} from 'BindMethodsBase_h436s';
import {SystemException} from 'exceptionTypes_mjS3d';

import DemosNavigation from '../DemosNavigation/DemosNavigation';
import {convertPxToRem} from '../share/convertPxAndRem';
import DemoContainer from '../DemoContainer/DemoContainer'

const u = undefined;
const emptyLayoutStructure = {
   navigation: {
      boundsRem: {
         top: u,
         right: u,
         bottom: u,
         left: u,
         width: u,
         height: u
      },
      content: {
         boundsRem: {
            top: u,
            right: u,
            bottom: u,
            left: u,
            width: u,
            height: u
         },
         sizeRem: {
            width: u
         }
      },
      isMaximized: u,
      isHidden: u
   },
   demoContainer: {
      boundsRem: {
         top: u,
         right: u,
         bottom: u,
         left: u,
         width: u,
         height: u
      },
      content: {
         boundsRem: {
            top: u,
            right: u,
            bottom: u,
            left: u,
            width: u,
            height: u
         }
      },
      isMaximized: u,
      isHidden: u
   },
   isMobileUIMode: u
};

const preferDemo = 'demo';
const preferNavigation = 'navigation';

export default class PresenterLayoutController extends BindMethodsBase {
   constructor(
      {isDemoSelected, commitLayout, presenterConnection}
   ) {
      super();
      this._connection = presenterConnection;
      
      const prUXSet = presenterConnection.settings.private.ux;
      
      Object.assign(this, {
         _commitLayout: () => commitLayout(this._layout),
         _layoutInput: {
            presenter: {
               widthRem: undefined,
               heightRem: undefined,
               preferShowingDemoOrNavigation: isDemoSelected
                  ? preferDemo : preferNavigation,
               navigation: {
                  tree: {
                     widthRem: this._predictNavigationTreeWidthRem()
                  }
               },
               demoContainer: {
                  preferMaximized: prUXSet.preferMaximizedDemoView.initially,
                  isDemoSelected
               }
            }
         },
         _layout: emptyLayoutStructure
      });
      
      this.bindMethods([
         this.onUpdatedPresenterBounds,
         this.saveNavigationRef,
         this.onUpdatedNavigationTreeWidth,
         this.onMaximizeDemoContainerRequest,
         this.onNavigationRequest,
         this.onDemoRequest
      ]);
   }
   
   get _parameters() {
      const settings = this._connection.settings;
      
      return {
         prUISet: settings.private.ui,
         prUXSet: settings.private.ux,
         prLI: this._layoutInput.presenter,
         treeLI: this._layoutInput.presenter.navigation.tree,
         dcLI: this._layoutInput.presenter.demoContainer,
         lat: this._layout,
         nav: this._layout.navigation,
         dc: this._layout.demoContainer
      };
   }
   
   onUpdatedPresenterBounds(sizePx) {
      const {prLI} = this._parameters;
      prLI.widthRem = convertPxToRem(sizePx.bounds.width);
      prLI.heightRem = convertPxToRem(sizePx.bounds.height);
      
      this._updateStaticLayout();
   }
   
   saveNavigationRef(r) { this._navigation = r; }
   
   onUpdatedNavigationTreeWidth() {
      const {treeLI} = this._parameters;
      treeLI.widthRem = this._predictNavigationTreeWidthRem();
      
      this._updateStaticLayout();
   }
   
   onMaximizeDemoContainerRequest() {
      const {dcLI} = this._parameters;
      dcLI.preferMaximized = true;
      
      this._updateStaticLayout();
   }
   
   onNavigationRequest() {
      const {prLI, prUXSet} = this._parameters;
      prLI.preferShowingDemoOrNavigation = preferNavigation;
      prLI.demoContainer.preferMaximized =
         prUXSet.preferMaximizedDemoView.later;
      
      this._updateStaticLayout();
   }
   
   onDemoRequest() {
      const {prLI} = this._parameters;
      prLI.preferShowingDemoOrNavigation = preferDemo;
      prLI.demoContainer.isDemoSelected = true;
      
      this._updateStaticLayout();
   }
   
   get isInitialized() {
      const i = parameter => parameter !== undefined;
      const {prLI} = this._parameters;
      
      return i(prLI.widthRem) && i(prLI.heightRem)
             && i(prLI.preferShowingDemoOrNavigation)
             && i(prLI.navigation.tree.widthRem)
             && i(prLI.demoContainer.preferMaximized);
   }
   
   get isAnimating() {
      return false;
   }
   
   _updateStaticLayout() {
      const updateDisplayMode = () => {
         const {prUISet, prLI, lat} = this._parameters;
         const navigationWidthRem = prLI.navigation.tree.widthRem;
         const presenterWidthRem = prLI.widthRem;
         
         const maxRatio = (prUISet.desktop
         ).navigationToPresenterWidthRatio.max;
         
         lat.isMobileUIMode =
            navigationWidthRem / presenterWidthRem > maxRatio;
      };
      
      // requires lat.isMobileUIMode
      const updateNavigation = () => {
         const {prLI, treeLI, lat, nav} = this._parameters;
         
         nav.isMaximized = lat.isMobileUIMode ?
            ( prLI.preferShowingDemoOrNavigation === preferNavigation
              || prLI.demoContainer.isDemoSelected === false)
            :
            prLI.demoContainer.isDemoSelected === false;
         
         nav.boundsRem = {
            top: 0, bottom: 0,
            left: 0,
            width: nav.isMaximized ?
               prLI.widthRem
               :
               Math.min(treeLI.widthRem, prLI.widthRem)
         };
         
         nav.isHidden = lat.isMobileUIMode ?
            prLI.preferShowingDemoOrNavigation === preferDemo
            :
            ( prLI.demoContainer.isDemoSelected
              && prLI.demoContainer.preferMaximized);
         
         nav.content = {
            boundsRem: {
               top: 0, right: 0, bottom: 0, left: 0
            },
            sizeRem: {
               width: treeLI.widthRem
            }
         };
      };
      
      // requires lat.isMobileUIMode
      const updateDemoContainer = () => {
         const {prLI, dcLI, lat, dc} = this._parameters;
         
         dc.isMaximized = lat.isMobileUIMode ?
            prLI.preferShowingDemoOrNavigation === preferDemo
            :
            dcLI.isDemoSelected && dcLI.preferMaximized;
         
         const demoContainerWidthRem = dc.isMaximized ?
            prLI.widthRem
            :
            prLI.widthRem - prLI.navigation.tree.widthRem;
         
         dc.boundsRem = {
            top: 0, bottom: 0,
            left: prLI.widthRem - demoContainerWidthRem,
            width: demoContainerWidthRem
         };
         
         dc.isHidden = lat.isMobileUIMode ?
            prLI.preferShowingDemoOrNavigation === preferNavigation
            :
            dcLI.isDemoSelected === false;
         
         const dcPadPrRem =
            DemoContainer.predictPaddingRem({
               connection: this._connection.demoContainer,
               isDemoContainerMaximized: dc.isMaximized
            });
         
         dc.content.boundsRem = {
            top: dcPadPrRem.top,
            bottom: dcPadPrRem.bottom,
            left: dcPadPrRem.left,
            right: dcPadPrRem.right,
            width: demoContainerWidthRem
                   - dcPadPrRem.left - dcPadPrRem.right,
            height: prLI.heightRem
                    - dcPadPrRem.top - dcPadPrRem.bottom
         };
      };
      
      updateDisplayMode();
      updateNavigation();
      updateDemoContainer();
      
      this._commitLayout(this._layout);
   }
   
   _predictNavigationTreeWidthRem() {
      try {
         if (this._navigation)
            return this._navigation.predictWidthRem();
         else
            return DemosNavigation.predictWidthRem(
               this._connection.demosNavigation
            );
      }
      catch (e) {
         console.error(e)/*TODO: production change*/; // eslint-disable-line no-console
         
         const {prUISet, prLI} = this._parameters;
         
         const defaultRatio = (prUISet.desktop
         ).navigationToPresenterWidthRatio.default;
         
         if (typeof prLI.widthRem !== 'number'
             || typeof defaultRatio !== 'number'
         )
            throw new SystemException();
         
         return prLI.widthRem * defaultRatio;
      }
   }
}