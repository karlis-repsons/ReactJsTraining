import getSharedSettingsForInput from '../settings/getSharedSettingsForInput';
import FakeDemosNavigationConnection from './FakeDemosNavigationConnection/FakeDemosNavigationConnection';
import FakeDemoContainerConnection from './FakeDemoContainerConnection/FakeDemoContainerConnection';
import FakeRouterConnection from './FakeRouterConnection/FakeRouterConnection';

export default class FakePresenterConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.demosNavigation = new FakeDemosNavigationConnection({
         settings: settingsInput.demosNavigation
      });
      this.demoContainer = new FakeDemoContainerConnection({
         settings: settingsInput.demoContainer
      });
      this.router = new FakeRouterConnection();
   }
}