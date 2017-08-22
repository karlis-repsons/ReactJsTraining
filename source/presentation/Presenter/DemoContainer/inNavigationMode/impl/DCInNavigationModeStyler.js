export default class DCInNavigationModeStyler {
   constructor({props}) {
      this._props = props;
   }
   
   get _parameters() {
      const p = this._props;
      const shUISet = p.connection.settings.shared.ui;
      const prUISet = p.connection.settings.private.ui;
      const demoSet = p.selectedDemoConnection.settings;
      
      return {
         p, demoSet, shUISet, prUISet
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
      const pcs = p.contentStyle;
      
      let styleCSS = {};
      if (!pcs.position || !/^(relative|absolute|fixed)$/.test(pcs.position))
         styleCSS.position = 'relative';
      
      return {
         css: Object.assign(styleCSS, p.contentStyle)
      };
   }
}