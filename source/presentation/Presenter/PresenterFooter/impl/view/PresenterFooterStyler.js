// do NOT cache this
export default class PresenterFooterStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const Set = p.connection.settings;
      
      return {
         p,
         prUISet: Set.private.ui,
         prUISty: Set.private.ui.style
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
}