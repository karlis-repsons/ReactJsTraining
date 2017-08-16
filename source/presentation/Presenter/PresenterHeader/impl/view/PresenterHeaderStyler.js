// do NOT cache this
export default class PresenterHeaderStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const Set = p.connection.settings;
      
      return {
         p,
         
         prUISet: Set.private.ui,
         
         prUISty: Set.private.ui.style,
         tPrUISty: Set.private.title.ui.style
      };
   }
   
   get container() {
      const {p, prUISty} = this._parameters;
      
      let settingsCSS = {};
      if (prUISty.backgroundColorCSSValue)
         settingsCSS.backgroundColor = prUISty.backgroundColorCSSValue;
      
      if (!p.style.width)
         settingsCSS.width = `${p.widthRem}rem`;
      if (!p.style.height)
         settingsCSS.height = `${p.heightRem}rem`;
      
      return {
         css: Object.assign(
            settingsCSS,
            {
               overflow: 'hidden'
            },
            p.style
         )
      };
   }
   
   get content() {
      const {p} = this._parameters;
      
      return {
         css: p.contentStyle
      };
   }
   
   get title() {
      const {tPrUISty} = this._parameters;
      
      let settingsCSS = {};
      if (tPrUISty.marginRem) {
         const m = tPrUISty.marginRem;
         Object.assign(settingsCSS, {
            marginTop: `${m.top}rem`,
            marginRight: `${m.right}rem`,
            marginBottom: `${m.bottom}rem`,
            marginLeft: `${m.left}rem`
         });
      }
      
      if (tPrUISty.paddingEm) {
         const p = tPrUISty.paddingEm;
         Object.assign(settingsCSS, {
            paddingTop: `${p.top}em`,
            paddingRight: `${p.right}em`,
            paddingBottom: `${p.bottom}em`,
            paddingLeft: `${p.left}em`
         });
      }
      
      if (tPrUISty.font.names)
         settingsCSS.fontFamily = tPrUISty.font.names;
      
      if (tPrUISty.color)
         settingsCSS.color = tPrUISty.color;
      
      return {
         css: Object.assign(
            settingsCSS,
            {
               fontSize: `${tPrUISty.font.sizeRem}rem`,
               lineHeight: `${tPrUISty.lineHeightRem}rem`
            }
         )
      };
   }
}