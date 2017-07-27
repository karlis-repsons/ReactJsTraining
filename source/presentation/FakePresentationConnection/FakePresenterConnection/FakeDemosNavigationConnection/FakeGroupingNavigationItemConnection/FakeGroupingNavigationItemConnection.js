import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';

export default class FakeGroupingNavigationItemConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
   }
}