import {predictPaddingRem} from './DCInMaximizedMode';
import getContentBorderCSS from '../../share/styler/getContentBorderCSS';

export default class DCInMaximizedModeStyler {
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
   
   get navigationButton() {
      const {p} = this._parameters;
      const nbPrUISet = p.connection.settings.private.navigationButton.ui;
      const nbFont = nbPrUISet.style.font;
      
      // TODO: take values from settings
      // TODO: adjust predict DC padding if needed
      
      return {
         css: {
            position: 'absolute',
            top: `${nbPrUISet.marginRem.top}rem`,
            left: `${nbPrUISet.marginRem.left}rem`,
            zIndex: 1,
            padding: '0.44rem',
            borderRadius: '1.5rem',
            backgroundColor: 'hsla(214, 50%, 15%, 0.5)'
         },
         title: {
            css: {
               paddingTop: `${nbPrUISet.paddingEm.top}em`,
               paddingLeft: `${nbPrUISet.paddingEm.left}em`,
               paddingBottom: `${nbPrUISet.paddingEm.bottom}em`,
               paddingRight: `${nbPrUISet.paddingEm.right}em`,
               borderRadius: '0.7rem',
               fontSize: `${nbFont.sizeRem}rem`,
               lineHeight: `${nbFont.sizeRem}rem`,
               fontFamily: `${nbFont.names}`,
               backgroundColor: nbPrUISet.style.backgroundColor,
               color: nbPrUISet.style.color,
               boxShadow: '0 0 0.4rem 0.3rem white, inset 0 0 0.4rem white',
               cursor: 'pointer'
            }
         }
      };
   }
}