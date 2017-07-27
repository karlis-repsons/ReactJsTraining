export default class DCInNavigationModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      
      return {
         p
      };
   }
   
   get containerDiv() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({}, p.style,
            {
               position: 'absolute',
               backgroundColor: '#633A3A'
            })
      };
   }
   
   get maximizeButton() {
      const {p} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '2rem',
            height: '2rem',
            cursor: p.isDemoSelected ? 'pointer' : undefined,
            
            backgroundColor: 'white'
         }
      };
   }
   
   get maximizeIcon() {
      const {p} = this._parameters;
      
      return {
         color: p.isDemoSelected ? 'blue' : 'gray',
         css: {
            width: '100%', height: '100%'
         }
      };
   }
}