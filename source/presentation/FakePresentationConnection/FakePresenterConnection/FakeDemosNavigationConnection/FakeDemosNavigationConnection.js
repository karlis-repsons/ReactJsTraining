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
      this.content = {
         sourceNavigationTree: this.getSourceNavigationTree()
      };
   }
   
   getSourceNavigationTree() {
      return [
         {
            title: 'reusables',
            children: [
               {
                  title: 'SquareContainer',
                  children: [
                     {
                        title: 'Simple',
                        demoPathOnServer: '/demos/square-container-kU7d2/v1/simple'
                     }
                  ]
               },
               {
                  title: 'SquareTable',
                  children: [
                     {
                        title: 'Table',
                        demoPathOnServer: '/demos/square-table-zW3Ec/v0/background-color-borders'
                     },
                     {
                        title: 'Fractal of tables',
                        demoPathOnServer: '/demos/square-table-zW3Ec/v0/fractal'
                     }
                  ]
               }
            ]
         },
         {
            title: 'Tic Tac Toe game',
            demoPathOnServer: '/demos/tic-tac-toe-ndO3g/v0'
         },
         {
            title: 'presenter features',
            children: [
               {
                  title: 'controlled scrolling',
                  children: [
                     {
                        title: 'short text',
                        demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-0'
                     },
                     {
                        title: 'long text',
                        demoPathOnServer: '/demos/controlled-scrolling-jy437/repeat-14'
                     }
                  ]
               }
            ]
         }
      ];
   }
}