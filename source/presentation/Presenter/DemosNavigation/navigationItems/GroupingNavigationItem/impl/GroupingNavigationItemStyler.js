import getSharedCSS from '../../share/getNavigationItemSharedCSS';

// do NOT cache this
export default class GroupingNavigationItemStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get text() {
      const p = this._props;
      const prUISty = p.connection.settings.private.ui.style;
      
      const sharedCSS = getSharedCSS(p.connection);
      let privateCSS = {};
      if (prUISty.backgroundColor)
         privateCSS.backgroundColor = prUISty.backgroundColor;
      if (prUISty.textDecoration)
         privateCSS.textDecoration = prUISty.textDecoration;
      else
         privateCSS.textDecoration = 'none';
      
      return {
         css: Object.assign({}, sharedCSS, privateCSS,
            {
               color: prUISty.color,
               textShadow: '0 0 1px hsla(91, 0%, 18%, 0.2)'
            })
      };
   }
}