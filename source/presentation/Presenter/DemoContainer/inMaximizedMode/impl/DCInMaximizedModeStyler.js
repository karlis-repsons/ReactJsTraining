export default class DCInMaximizedModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const conn = p.connection;
      
      return {
         p,
         bPrUISet: conn.navigationButton.settings.private.ui
      };
   }
   
   get containerDiv() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({}, p.style,
            {
               position: 'absolute',
               backgroundColor: '#3B633A'
            })
      };
   }
   
   get navigationButton() {
      const {bPrUISet} = this._parameters;
      const font = bPrUISet.style.font;
      
      return {
         css: {
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            fontSize: `${font.size}rem`,
            fontFamily: `${font.names}`,
            cursor: 'pointer',
            
            backgroundColor: 'white'
         }
      };
   }
}