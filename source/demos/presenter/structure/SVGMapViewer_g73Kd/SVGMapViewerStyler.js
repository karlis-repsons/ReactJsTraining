export default class SVGMapViewerStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      
      return {
         p
      };
   }
   
   get container() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({
               backgroundColor: 'white'
            },
            p.style
         )
      };
   }
   
   get content() {
      return {
         css: Object.assign({
               width: '100%', height: '100%'
            }
         )
      };
   }
   
   get image() {
      return {
         css: Object.assign({
               width: '100%', height: '100%'
            }
         )
      };
   }
}