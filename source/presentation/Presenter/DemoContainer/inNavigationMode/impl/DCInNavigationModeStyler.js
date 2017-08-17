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
   
   get container() {
      const {p} = this._parameters;
      
      return {
         css: Object.assign({
               backgroundColor: '#633A3A'
            },
            p.style
         )
      };
   }
   
   get content() {
      const {p} = this._parameters;
      const pcs = p.contentStyle;
      
      let styleCSS = {};
      if (!pcs.position || !/^(relative|absolute|fixed)$/.test(pcs.position))
         styleCSS.position = 'relative';
      
      return {
         css: Object.assign(styleCSS, p.contentStyle)
      };
   }
   
   get maximizeButton() {
      const {p} = this._parameters;
      const demoSet = p.selectedDemoConnection.settings;
      const mbPrUISet = p.connection.maximizeButton.settings.private.ui;
      
      let remFromRightSide = mbPrUISet.marginRem.right;
      if (demoSet.presentation.ui.allDemoFitsInsideAnyContainer === false)
         remFromRightSide += 2; // TODO - set scroll bar width
      
      return {
         css: {
            position: 'absolute',
            top: `${mbPrUISet.marginRem.top}rem`,
            right: `${remFromRightSide}rem`,
            width: `${mbPrUISet.sizeRem.width}rem`,
            height: `${mbPrUISet.sizeRem.height}rem`,
            zIndex: 1,
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