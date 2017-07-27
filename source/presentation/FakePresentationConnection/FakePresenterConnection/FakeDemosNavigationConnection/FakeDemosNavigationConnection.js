import getSharedSettingsForInput from 'presentation/FakePresentationConnection/settings/getSharedSettingsForInput';
import FakeDemoNavigationItemConnection from './FakeDemoNavigationItemConnection/FakeDemoNavigationItemConnection';
import FakeGroupingNavigationItemConnection from './FakeGroupingNavigationItemConnection/FakeGroupingNavigationItemConnection';

export default class FakeDemosNavigationConnection {
   constructor({settings: settingsInput}) {
      this.settings = {
         shared: getSharedSettingsForInput(settingsInput),
         private: settingsInput.private
      };
      this.demoNavigationItem = new FakeDemoNavigationItemConnection({
         settings: settingsInput.demoNavigationItem
      });
      this.groupingNavigationItem = new FakeGroupingNavigationItemConnection({
         settings: settingsInput.groupingNavigationItem
      });
      this.data = {
         sourceNavigationTree: this.getSourceNavigationTree()
      };
   }
   
   getSourceNavigationTree() {
      return [
         {
            title: 'Reusables',
            children: [
               {
                  title: 'SquareContainer',
                  demoPathOnServer: '/demos/square-container-kU7d2/r3lMw'
               },
               {
                  title: 'SquareTable',
                  children: [
                     {
                        title: 'Table',
                        demoPathOnServer: '/demos/square-table-zW3Ec/kT324'
                     },
                     {
                        title: 'Fractal of tables',
                        demoPathOnServer: '/demos/square-table-zW3Ec/fractal-wpo03'
                     }
                  ]
               }
            ]
         },
         {
            title: 'Tic Tac Toe game',
            demoPathOnServer: '/demos/tic-tac-toe-ndO3g'
         }
      ];
   }
}