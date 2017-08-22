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
      
      return {
         css: p.contentStyle
      };
   }
   
   get hideButton() {
      const {p} = this._parameters;
      
      return {
         css: {
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
            width: '3rem',
            height: '3rem',
            zIndex: 1,
            borderRadius: '3rem',
            backgroundColor: 'hsla(203, 32%, 86%, 1)',
            cursor: 'pointer'
         },
         icon: {
            css: {
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)',
               fontSize: '1.7rem',
               color: 'hsla(0, 25%, 50%, 1)'//'hsla(10, 40%, 70%, 1)'
            },
         }
      };
   }
   
   get sortableTree() {
      return {
         css: {
            width: '100%', height: '100%',
            zIndex: 0
         }
      };
   }
}