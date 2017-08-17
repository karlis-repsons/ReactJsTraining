import {SystemException} from 'exceptionTypes_mjS3d_v0';

import getSharedSettingsForInput from '../settings/getSharedSettingsForInput';
import FakePresenterHeaderConnection from './FakePresenterHeaderConnection/FakePresenterHeaderConnection';
import FakeDemosNavigationConnection from './FakeDemosNavigationConnection/FakeDemosNavigationConnection';
import FakeDemoContainerConnection from './FakeDemoContainerConnection/FakeDemoContainerConnection';
import FakePresenterFooterConnection from './FakePresenterFooterConnection/FakePresenterFooterConnection';
import FakeRouterConnection from './FakeRouterConnection/FakeRouterConnection';
import FakeSelectedDemoConnection from './FakeSelectedDemoConnection/FakeSelectedDemoConnection';

export default class FakePresenterConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.header = new FakePresenterHeaderConnection({
         settings: settingsInput.header
      });
      this.demosNavigation = new FakeDemosNavigationConnection({
         settings: settingsInput.demosNavigation
      });
      this.demoContainer = new FakeDemoContainerConnection({
         settings: settingsInput.demoContainer
      });
      this.footer = new FakePresenterFooterConnection({
         settings: settingsInput.footer
      });
      this.router = new FakeRouterConnection();
      this.selectedDemo = new FakeSelectedDemoConnection();
   }
   
   onDemoRequest(demoPathOnServer) {
      const matchingRoute = this.router.routes.find(
         route => route.demoPathOnServer === demoPathOnServer);
      
      if (!matchingRoute || !matchingRoute.demoUIComponent)
         throw new SystemException(
            'Could not find demo component for '
            + `demoPathOnServer = ${demoPathOnServer}.`);
      
      const demoComponent = matchingRoute.demoUIComponent;
      
      this.header.onDemoRequest(demoComponent);
      this.selectedDemo.onDemoRequest({
         demoComponent, demoPathOnServer
      });
   }
}