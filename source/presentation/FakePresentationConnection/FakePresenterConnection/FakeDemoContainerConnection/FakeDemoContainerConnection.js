import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';
import FakeDCInNavigationModeConnection from './FakeDCInNavigationModeConnection/FakeDCInNavigationModeConnection';
import FakeDCInMaximizedModeConnection from './FakeDCInMaximizedModeConnection/FakeDCInMaximizedModeConnection';

export default class FakeDemoContainerConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.inNavigationMode = new FakeDCInNavigationModeConnection({
         settings: settingsInput.inNavigationMode
      });
      this.inMaximizedMode = new FakeDCInMaximizedModeConnection({
         settings: settingsInput.inMaximizedMode
      });
   }
}