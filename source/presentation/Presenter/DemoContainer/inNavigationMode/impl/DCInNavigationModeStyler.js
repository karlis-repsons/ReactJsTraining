import {predictPaddingRem} from './DCInNavigationMode';
import getContentBorderCSS from '../../share/styler/getContentBorderCSS';

export default class DCInNavigationModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const shUISty = p.connection.settings.shared.ui.style;
      const prUISet = p.connection.settings.private.ui;
      const deUISet = p.selectedDemoConnection.settings.presentation.ui;
      
      return {
         p, shUISty, prUISet, deUISet
      };
   }
   
   get container() {
      const {p, shUISty, prUISet} = this._parameters;
      
      let settingsCSS = {};
      if (shUISty.color.background)
         settingsCSS.backgroundColor = shUISty.color.background;
      if (prUISet.backgroundColor)
         settingsCSS.backgroundColor = prUISet.backgroundColor;
      
      return {
         css: Object.assign(settingsCSS, p.style)
      };
   }
   
   get content() {
      const {p, prUISet, deUISet} = this._parameters;
      
      let styleCSS = {};
      
      if (!p.contentStyle.position
          || !/^(relative|absolute|fixed)$/.test(p.contentStyle.position)
      )
         styleCSS.position = 'relative';
      
      const brdSet = prUISet.bordersIfDemoWantsBorder;
      Object.assign(styleCSS,
         getContentBorderCSS({
            borderSettings: brdSet,
            demoUISettings: deUISet,
            demoContainerPaddingRem: predictPaddingRem({
               connection: p.connection,
               selectedDemoConnection: p.selectedDemoConnection
            })
         }));
      
      return {
         css: Object.assign(styleCSS, p.contentStyle)
      };
   }
}