import React from 'react';

import propTypes from '../DemoContainer';
import ContainerInNavigationMode from '../inNavigationMode/ContainerInNavigationMode';
import ContainerInMaximizedMode from '../inMaximizedMode/ContainerInMaximizedMode';

export default class DemoContainerController extends React.Component {
   static predictPaddingRem(
      {connection, isDemoContainerMaximized}
   ) {
      let dcClass, dcConnection;
      if (isDemoContainerMaximized) {
         dcClass = ContainerInMaximizedMode;
         dcConnection = connection.inMaximizedMode;
      }
      else {
         dcClass = ContainerInNavigationMode;
         dcConnection = connection.inNavigationMode;
      }
      
      return dcClass.predictPaddingRem({
         connection: dcConnection
      });
   }
   
   render() {
      const p = this.props;
      
      if (p.showMaximized)
         return (
            <ContainerInMaximizedMode
               className={p.className}
               connection={p.connection.inMaximizedMode}
               style={p.style}
               isDemoSelected={p.isDemoSelected}
               onNavigationRequest={p.onNavigationRequest}
            >
               {p.children}
            </ContainerInMaximizedMode>
         );
      else
         return (
            <ContainerInNavigationMode
               className={p.className}
               connection={p.connection.inNavigationMode}
               style={p.style}
               isDemoSelected={p.isDemoSelected}
               onMaximizeRequest={p.onMaximizeRequest}
            >
               {p.children}
            </ContainerInNavigationMode>
         );
   }
}

DemoContainerController.propTypes = propTypes;