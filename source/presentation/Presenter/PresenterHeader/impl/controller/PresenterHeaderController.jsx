import React from 'react';

import predictHeaderHeightRem from './impl/predictHeaderHeightRem';
import PresenterHeaderView from '../view/PresenterHeaderView';

export default class PresenterHeaderController
   extends React.Component
{
   static predictHeightRem({connection, widthRem}) {
      return predictHeaderHeightRem({connection, widthRem});
   }
   
   render() {
      const p = this.props;
      
      return (
         <PresenterHeaderView
            connection={p.connection}
            widthRem={p.widthRem}
            heightRem={p.heightRem}
            style={p.style}
            contentStyle={p.contentStyle} />
      );
   }
}