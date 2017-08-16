export default class DCInMaximizedModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const conn = p.connection;
      
      return {
         p
      };
   }
   
   get container() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({
               backgroundColor: '#3B633A'
            },
            p.style
         )
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
      const nbPrUISet = p.connection.navigationButton.settings.private.ui;
      const nbFont = nbPrUISet.style.font;
      
      return {
         css: {
            position: 'absolute',
            top: `${nbPrUISet.marginRem.top}rem`,
            left: `${nbPrUISet.marginRem.left}rem`,
            zIndex: 1,
            cursor: 'pointer',
            
            backgroundColor: 'white'
         },
         title: {
            css: {
               paddingTop: `${nbPrUISet.paddingEm.top}em`,
               paddingLeft: `${nbPrUISet.paddingEm.left}em`,
               paddingBottom: `${nbPrUISet.paddingEm.bottom}em`,
               paddingRight: `${nbPrUISet.paddingEm.right}em`,
               fontSize: `${nbFont.sizeRem}rem`,
               lineHeight: `${nbFont.sizeRem}rem`,
               fontFamily: `${nbFont.names}`
            }
         }
      };
   }
}