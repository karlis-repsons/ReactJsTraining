export default class FakeSelectedDemoConnection {
   onDemoRequest({demoComponent, demoPathOnServer}) {
      this._settings = demoComponent.settings;
      this._demoPathOnServer = demoPathOnServer;
   }
   
   get settings() {
      return this._settings;
   }
   
   get isDemoSelected() {
      return !!this._settings;
   }
   
   get demoPathOnServer() {
      return this._demoPathOnServer;
   }
}