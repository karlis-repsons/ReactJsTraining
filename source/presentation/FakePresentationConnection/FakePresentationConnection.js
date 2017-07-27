import getSettingsInput from './settings/presentationSettings';
import FakePresenterConnection from './FakePresenterConnection/FakePresenterConnection';

export default class FakePresentationConnection {
   constructor() {
      const settingsInput = getSettingsInput();
      this.presenter = new FakePresenterConnection({
         settings: settingsInput.presenter
      });
   }
}