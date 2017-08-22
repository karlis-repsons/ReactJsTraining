export default class DCInMaximizedModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const shUISet = p.connection.settings.shared.ui;
      const prUISet = p.connection.settings.private.ui;
      
      return {
         p, shUISet, prUISet
      };
   }
   
   get container() {
      const {p, prUISet} = this._parameters;
      
      let settingsCSS = {};
      
      if (prUISet.backgroundColor)
         settingsCSS.backgroundColor = prUISet.backgroundColor;
      
      return {
         css: Object.assign(settingsCSS, p.style)
      };
   }
   
   get content() {
      const {p} = this._parameters;
      const pcs = p.contentStyle;
      
      let styleCSS = {};
      if (!pcs.position || !/^(relative|absolute|fixed)$/.test(pcs.position))
         styleCSS.position = 'relative';
      
      return {
         css: Object.assign(styleCSS, p.contentStyle)
      };
   }
   
   get navigationButton() {
      const {p} = this._parameters;
      const nbPrUISet = p.connection.settings.private.navigationButton.ui;
      const nbFont = nbPrUISet.style.font;
      
      return {
         css: {
            position: 'absolute',
            top: `${nbPrUISet.marginRem.top}rem`,
            left: `${nbPrUISet.marginRem.left}rem`,
            zIndex: 1,
            cursor: 'pointer',
            
            backgroundColor: nbPrUISet.style.backgroundColor
         },
         title: {
            css: {
               paddingTop: `${nbPrUISet.paddingEm.top}em`,
               paddingLeft: `${nbPrUISet.paddingEm.left}em`,
               paddingBottom: `${nbPrUISet.paddingEm.bottom}em`,
               paddingRight: `${nbPrUISet.paddingEm.right}em`,
               fontSize: `${nbFont.sizeRem}rem`,
               lineHeight: `${nbFont.sizeRem}rem`,
               fontFamily: `${nbFont.names}`,
               color: nbPrUISet.style.color
            }
         }
      };
   }
}