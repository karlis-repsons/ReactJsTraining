import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';

export default class FakeDCInMaximizedModeConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.navigationButton = {
         settings: {
            shared: getSharedSettingsForInput(settingsInput.navigationButton),
            private: settingsInput.navigationButton.private
         },
         content: {
            title: 'navigation'
         }
      };
   }
}