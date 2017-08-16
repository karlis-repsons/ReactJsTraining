export default class FakeSelectedDemoConnection {
   onDemoRequest(demoComponent) {
      this._settings = demoComponent.settings;
   }
   
   get settings() {
      return this._settings;
   }
   
   get isDemoSelected() {
      return !!this._settings;
   }
}