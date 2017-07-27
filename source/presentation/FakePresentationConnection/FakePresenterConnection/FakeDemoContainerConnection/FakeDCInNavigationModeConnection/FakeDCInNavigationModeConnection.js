import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';

export default class FakeDCInNavigationModeConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.maximizeButton = {
         settings: {
            shared: getSharedSettingsForInput(settingsInput.maximizeButton),
            private: settingsInput.maximizeButton.private
         }
      };
   }
}