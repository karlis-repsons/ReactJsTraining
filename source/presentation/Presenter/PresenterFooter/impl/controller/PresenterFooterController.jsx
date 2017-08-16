import React from 'react';

import PresenterFooterView from '../view/PresenterFooterView';

export default class PresenterFooterController
   extends React.Component
{
   static predictHeightRem({connection, widthRem}) {
      return 1; // TODO
   }
   
   render() {
      const p = this.props;
      
      return (
         <PresenterFooterView
            connection={p.connection}
            widthRem={p.widthRem}
            heightRem={p.heightRem}
            style={p.style}
            contentStyle={p.contentStyle} />
      );
   }
}