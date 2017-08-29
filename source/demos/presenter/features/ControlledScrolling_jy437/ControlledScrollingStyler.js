const textColor = 'hsla(203, 32%, 29%, 1)';

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
               justifyContent: 'center'
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
               marginTop: '4.5rem',
               marginBottom: '4.5rem',
               padding: '4.8rem 3rem',
               color: textColor,
               backgroundColor: 'hsla(214, 40%, 100%, 0.9)',
               boxShadow: '0 0 16rem 0 hsla(214, 40%, 100%, 1)'
            }
         )
      };
   }
   
   get author() {
      return {
         css: {
            width: '100%',
            paddingBottom: '0.3rem',
            textAlign: 'center',
            fontSize: '1.1rem'
         },
         link: {
            css: {
               color: textColor
            }
         }
      };
   }
   
   get title() {
      return {
         css: {
            width: '100%',
            paddingBottom: '3.5rem',
            textAlign: 'center',
            fontSize: '1.9rem'
         }
      };
   }
   
   get dedication() {
      return {
         css: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingBottom: '3.5rem',
         },
         text: {
            css: {
               maxWidth: '14.5rem',
               width: '70%',
               textAlign: 'right',
               fontSize: '1rem',
            }
         }
         
      };
   }
   
   get h2() {
      return {
         css: {
            width: '100%',
            paddingBottom: '2rem',
            textAlign: 'left',
            fontSize: '1.3rem',
            fontWeight: 'normal',
            textIndent: '2.3rem'
         }
      }
      
   }
   
   get text() {
      return {
         block: {
            width: '100%',
            textAlign: 'left',
            paddingBottom: '6rem'
         },
         paragraph: {
            fontSize: '1rem',
            textIndent: '2.3rem',
         }
      };
   }
}