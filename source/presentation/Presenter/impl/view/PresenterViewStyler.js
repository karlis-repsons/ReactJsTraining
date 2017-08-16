export default class PresenterViewStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const connection = this._props.connection;
      const lat = this._props.layoutParameters;
      
      return {
         shUISet: connection.settings.shared.ui,
         lat,
         
         hLat: lat.header,
         hcLat: lat.header.content,
         dnLat: lat.demosNavigation,
         dncLat: lat.demosNavigation.content,
         dcLat: lat.demoContainer,
         dccLat: lat.demoContainer.content,
         sccLat: lat.demoContainer.content.scrollContainer,
         fLat: lat.footer,
         fcLat: lat.footer.content
      };
   }
   
   get presenter() {
      const {shUISet} = this._parameters;
      const font = shUISet.style.font;
      
      return {
         css: Object.assign({
               position: 'relative',
               overflow: 'hidden',
               fontSize: `${font.baseFontSizeRem}rem`,
               fontFamily: font.defaultFontNames
            },
            this._props.style
         )
      };
   }
   
   get header() {
      const {hLat, hcLat} = this._parameters;
      
      return {
         css: Object.assign({
               position: 'absolute'
            },
            this._makeRemBoundsCSS(hLat.boundsRem)
         ),
         content: {
            css: Object.assign({
                  position: 'absolute'
               },
               this._makeRemBoundsCSS(hcLat.boundsRem)
            )
         }
      };
   }
   
   get demosNavigation() {
      const {dnLat, dncLat} = this._parameters;
      
      return {
         css: Object.assign({
               position: 'absolute',
               display: dnLat.isHidden ? 'none' : 'block',
               backgroundColor: 'paleturquoise'
            },
            this._makeRemBoundsCSS(dnLat.boundsRem)
         ),
         content: {
            css: Object.assign({
                  position: 'absolute'
               },
               this._makeRemBoundsCSS(dncLat.boundsRem)
            )
         }
      };
   }
   
   get demoContainer() {
      const {dcLat, dccLat, sccLat} = this._parameters;
      
      return {
         css: Object.assign({
               position: 'absolute',
               display: dcLat.isHidden ? 'none' : 'block',
               backgroundColor: 'palegoldenrod'
            },
            this._makeRemBoundsCSS(dcLat.boundsRem)
         ),
         content: {
            css: Object.assign({
                  position: 'absolute'
               },
               this._makeRemBoundsCSS(dccLat.boundsRem)
            ),
            scrollContainer: {
               css: Object.assign(
                  {
                     position: 'absolute',
                     overflow: sccLat.hasScroll ? 'auto' : 'hidden',
                     zIndex: 0,
                     backgroundColor: 'lightgray'
                  },
                  this._makeRemBoundsCSS(sccLat.boundsRem)
               ),
               demo: {
                  css: {
                     overflow: 'visible'
                  }
               }
            }
         }
      };
   }
   
   get footer() {
      const {fLat, fcLat} = this._parameters;
      
      return {
         css: Object.assign({
               position: 'absolute'
            },
            this._makeRemBoundsCSS(fLat.boundsRem)
         ),
         content: {
            css: Object.assign({
                  position: 'absolute'
               },
               this._makeRemBoundsCSS(fcLat.boundsRem)
            )
         }
      };
   }
   
   _makeRemBoundsCSS(boundsRem)
   {
      let css = {};
      if (typeof boundsRem.top === 'number')
         css.top = `${boundsRem.top}rem`;
      
      if (typeof boundsRem.bottom === 'number')
         css.bottom = `${boundsRem.bottom}rem`;
      
      if (typeof boundsRem.right === 'number')
         css.right = `${boundsRem.right}rem`;
      
      if (typeof boundsRem.left === 'number')
         css.left = `${boundsRem.left}rem`;
      
      if (typeof boundsRem.width === 'number')
         css.width = `${boundsRem.width}rem`;
      
      if (typeof boundsRem.height === 'number')
         css.height = `${boundsRem.height}rem`;
      
      return css;
   }
}