export default class DemosNavigationViewStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const Set = p.connection.settings;
      
      return {
         p,
         shUISet: Set.shared.ui,
         prUISet: Set.private.ui
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
      
      // TODO: correct settings and use of them
      
      return {
         css: Object.assign({
               display: 'flex',
               flexDirection: 'column'
            },
            p.contentStyle
         )
      };
   }
   
   get topRow() {
      const {p} = this._parameters;

      // TODO: take settings from connection
      
      const visibilityCSSValue = p.selectedDemoConnection.isDemoSelected ?
         'visible' : 'hidden';
      
      return {
         css: {
            visibility: visibilityCSSValue,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            padding: '1.3rem',
            boxSizing: 'border-box'
         }
      };
   }
   
   get hideButton() {
      const {p} = this._parameters;

      // TODO: take settings from connection

      // For some reason, width and height CSS values were needed on outer div
      // to make the button appear right in chrome.
      
      const bgPaddingRem = 0.3;
      const backgroundSizeRem = {
         width: 1.4805,
         height: 1.4805
      };
      const shadowSizeRem = {
         width: backgroundSizeRem.width + bgPaddingRem,
         height: backgroundSizeRem.height + bgPaddingRem
      };
      
      return {
         css: {
            position: 'relative',
            width: `${shadowSizeRem.width}rem`,
            height: `${shadowSizeRem.height}rem`,
            padding: `${bgPaddingRem}rem`,
            borderRadius: `${
               Math.min(shadowSizeRem.width, shadowSizeRem.height)}rem`,
            backgroundColor: 'hsla(214, 50%, 15%, 0.5)'
         },
         background: {
            css: {
               position: 'absolute',
               top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
               width: `${backgroundSizeRem.width}rem`,
               height: `${backgroundSizeRem.height}rem`,
               borderRadius: `${Math.min(
                  backgroundSizeRem.width, backgroundSizeRem.height)
                  }rem`,
               boxShadow: '0 0 0.4rem 0.3rem white, inset 0 0 0.4rem white',
               backgroundColor: 'hsla(214, 50%, 99%, 0.75)',
               cursor: 'pointer'
            }
         },
         icon: {
            css: {
               position: 'absolute',
               top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
               width: `${0.7 * backgroundSizeRem.width}rem`,
               height: `${0.7 * backgroundSizeRem.height}rem`,
               color: 'hsla(0, 25%, 31%, 1)'
            },
         }
      };
   }
   
   get sortableTree() {
      return {
         css: {
            flexGrow: 1,
            width: '100%'
         }
      };
   }
}