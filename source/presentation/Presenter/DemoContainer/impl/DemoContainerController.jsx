import React from 'react';

import propTypes from '../DemoContainer';
import ContainerInNavigationMode from '../inNavigationMode/ContainerInNavigationMode';
import ContainerInMaximizedMode from '../inMaximizedMode/ContainerInMaximizedMode';

export default class DemoContainerController extends React.Component {
   static predictPaddingRem({
                               demoContainerConnection,
                               selectedDemoConnection,
                               isDemoContainerMaximized
                            })
   {
      if (isDemoContainerMaximized)
         return ContainerInMaximizedMode.predictPaddingRem({
            connection: demoContainerConnection.inMaximizedMode,
            selectedDemoConnection
         });
      else
         return ContainerInNavigationMode.predictPaddingRem({
            connection: demoContainerConnection.inNavigationMode,
            selectedDemoConnection
         });
   }
   
   render() {
      const p = this.props;
      
      if (p.showMaximized)
         return (
            <ContainerInMaximizedMode
               connection={p.connection.inMaximizedMode}
               style={p.style}
               contentStyle={p.contentStyle}
               isDemoSelected={p.isDemoSelected}
               onNavigationRequest={p.onNavigationRequest}
            >
               {p.children}
            </ContainerInMaximizedMode>
         );
      else
         return (
            <ContainerInNavigationMode
               connection={p.connection.inNavigationMode}
               style={p.style}
               contentStyle={p.contentStyle}
               isDemoSelected={p.isDemoSelected}
               onMaximizeRequest={p.onMaximizeRequest}
            >
               {p.children}
            </ContainerInNavigationMode>
         );
   }
}

DemoContainerController.propTypes = propTypes;