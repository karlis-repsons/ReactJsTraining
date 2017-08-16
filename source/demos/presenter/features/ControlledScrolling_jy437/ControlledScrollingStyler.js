export default class ControlledScrollingStyler {
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
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'center',
               backgroundColor: 'white'
            },
            p.style
         )
      };
   }
   
   get content() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({
               width: `${Math.min(28, p.widthRem)}rem`,
               padding: '4.8rem 3rem',
               color: 'hsla(61, 32%, 29%, 1)'
            }
         )
      };
   }
   
   get title() {
      return {
         css: {
            width: '100%',
            paddingBottom: '1.5em',
            textAlign: 'center',
            fontSize: '2rem'
         }
      };
   }
   
   get text() {
      return {
         css: {
            width: '100%',
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            textIndent: '2.3em'
         }
      };
   }
}