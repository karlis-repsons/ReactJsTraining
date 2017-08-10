export default class PresenterViewStyler {
   constructor({props}) {
      this._styleFromProp = props.style;
      this._layout = props.layoutParameters;
      this._sharedUISettings = props.connection.settings.shared.ui;
   }
   
   get _parameters() {
      const lat = this._layout;
      
      return {
         shUISet: this._sharedUISettings,
         lat,
         nav: lat.navigation,
         navc: lat.navigation.content,
         dc: this._layout.demoContainer,
         dcc: this._layout.demoContainer.content
      };
   }
   
   get presenter() {
      const {shUISet} = this._parameters;
      const font = shUISet.style.font;
      
      return {
         css: Object.assign({}, this._styleFromProp,
            {
               position: 'relative',
               overflow: 'hidden',
               fontSize: `${font.baseFontSizeRem}rem`,
               fontFamily: font.defaultFontNames
            })
      };
   }
   
   get demosNavigation() {
      const {nav} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            top: `${nav.boundsRem.top}rem`,
            right: `${nav.boundsRem.right}rem`,
            bottom: `${nav.boundsRem.bottom}rem`,
            left: `${nav.boundsRem.left}rem`,
            width: `${nav.boundsRem.width}rem`,
            height: `${nav.boundsRem.height}rem`,
            
            display: nav.isHidden ? 'none' : 'block',
            
            backgroundColor: 'paleturquoise'
         }
      };
   }
   
   get demoContainer() {
      const {dc} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            top: `${dc.boundsRem.top}rem`,
            right: `${dc.boundsRem.right}rem`,
            bottom: `${dc.boundsRem.bottom}rem`,
            left: `${dc.boundsRem.left}rem`,
            width: `${dc.boundsRem.width}rem`,
            height: `${dc.boundsRem.height}rem`,
            
            display: dc.isHidden ? 'none' : 'block',
            
            backgroundColor: 'palegoldenrod'
         }
      };
   }
   
   get navigationContent() {
      const {navc} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            top: `${navc.boundsRem.top}rem`,
            right: `${navc.boundsRem.right}rem`,
            bottom: `${navc.boundsRem.bottom}rem`,
            left: `${navc.boundsRem.left}rem`,
            width: `${navc.boundsRem.width}rem`,
            height: `${navc.boundsRem.height}rem`,
         }
      };
   }
   
   get demoContent() {
      const {dcc} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            top: `${dcc.boundsRem.top}rem`,
            right: `${dcc.boundsRem.right}rem`,
            bottom: `${dcc.boundsRem.bottom}rem`,
            left: `${dcc.boundsRem.left}rem`,
            width: `${dcc.boundsRem.width}rem`,
            height: `${dcc.boundsRem.height}rem`,
         }
      };
   }
}