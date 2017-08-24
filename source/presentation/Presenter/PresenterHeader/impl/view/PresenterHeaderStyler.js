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
      if (prUISty.backgroundColor)
         settingsCSS.backgroundColor = prUISty.backgroundColor;
      if (prUISty.backgroundImageCSSValue)
         settingsCSS.backgroundImage = prUISty.backgroundImageCSSValue;
      if (prUISty.backgroundPositionCSSValue)
         settingsCSS.backgroundPosition = prUISty.backgroundPositionCSSValue;
      
      if (!p.style.width)
         settingsCSS.width = `${p.widthRem}rem`;
      if (!p.style.height)
         settingsCSS.height = `${p.heightRem}rem`;
      
      return {
         css: Object.assign(
            settingsCSS,
            {
               overflow: 'hidden',
               backgroundSize: 'cover',
            },
            p.style
         )
      };
   }
   
   get content() {
      const {p} = this._parameters;
      
      let styleCSS = {};
      if (!p.contentStyle.position
          || !/^(relative|absolute|fixed)$/.test(p.contentStyle.position)
      )
         styleCSS.position = 'relative';
      
      return {
         css: Object.assign(p.contentStyle, styleCSS)
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
      
      if (tPrUISty.textShadowCSSValue)
         settingsCSS.textShadow = tPrUISty.textShadowCSSValue;
      
      return {
         css: Object.assign(
            settingsCSS,
            {
               position: 'absolute',
               left: 0, top: 0, zIndex: 1,
               fontSize: `${tPrUISty.font.sizeRem}rem`,
               lineHeight: `${tPrUISty.lineHeightRem}rem`
            }
         )
      };
   }
   
   get accents() {
      // TODO: take settings from connection
      
      return {
         top: {
            css: {
               position: 'absolute',
               left: 0, bottom: '0.9rem',
               zIndex: 0,
               width: '100%',
               height: '0.8rem',
               background: 'linear-gradient(to right, hsla(27, 38%, 17%, 0.25), hsla(27, 38%, 17%, 0.25), hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0))'
            }
         },
         middle: {
            css: {
               position: 'absolute',
               left: 0, bottom: '0.6rem',
               zIndex: 0,
               width: '100%',
               height: '0.1rem',
               background: 'linear-gradient(to right, hsla(27, 38%, 9%, 0.25)'
                           + ', hsla(27, 38%, 9%, 0.1))'
            }
         },
         bottom: {
            css: {
               position: 'absolute',
               left: 0, bottom: '0.3rem',
               zIndex: 0,
               width: '100%',
               height: '0.1rem',
               background: 'linear-gradient(to right, hsla(27, 38%, 98%, 0.25)'
                           + ', hsla(27, 38%, 98%, 0.1))'
            }
         }
      };
   }
}