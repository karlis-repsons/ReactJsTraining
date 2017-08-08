import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';

export default class FakePresenterHeaderConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.content = {
         title: 'Kārlis React training',
         backgroundImageCSSValue: undefined
      };
   }
   
   onDemoRequest(demoComponent) {
      //
   }
}