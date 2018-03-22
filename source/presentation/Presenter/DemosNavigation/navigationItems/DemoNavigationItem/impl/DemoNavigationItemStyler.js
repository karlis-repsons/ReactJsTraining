import getSharedCSS from '../../share/getNavigationItemSharedCSS';

// do NOT cache this
export default class DemoNavigationItemStyler {
   constructor({props, isSelected}) {
      this._props = props;
      this._isSelected = isSelected;
      
      this._sharedCSS = getSharedCSS(props.connection);
   }
   
   get _parameters() {
      const p = this._props;
      const prSet = p.connection.settings.private;
      
      let prUISty;
      if (this._isSelected)
         prUISty = prSet.selected.ui.style;
      else
         prUISty = prSet.notSelected.ui.style;
      
      return {
         prUISty
      }
   }
   
   get container() {
      const {prUISty} = this._parameters;
      
      const privateCSS = {
         cursor: 'pointer'
      };
      if (prUISty.backgroundColor)
         privateCSS.backgroundColor = prUISty.backgroundColor;
      
      return {
         css: Object.assign({}, this._sharedCSS, privateCSS)
      };
   }
   
   get text() {
      const {prUISty} = this._parameters;
      
      let privateCSS = {};
      if (prUISty.textDecoration)
         privateCSS.textDecoration = prUISty.textDecoration;
      else
         privateCSS.textDecoration = 'none';
      
      return {
         css: Object.assign({}, privateCSS,
            {
               color: prUISty.color,
               textShadow: '0 0 1px hsla(91, 0%, 18%, 0.2)'
            })
      };
   }
}