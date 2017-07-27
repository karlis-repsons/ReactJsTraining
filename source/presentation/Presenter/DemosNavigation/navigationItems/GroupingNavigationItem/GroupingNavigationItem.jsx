import React from 'react';
import PropTypes from 'prop-types';

import measureTextWidthRem from '../../../share/measureTextWidthRem';

export default function GroupingNavigationItem(props) {
   return (
      <div className='nav item zy42l'>
         <span
            style={{
               font: getCssFont(props.connection),
               color: 'gray'
            }}
         >{
            props.title
         }</span>
      </div>
   );
}

GroupingNavigationItem.predictWidthRem = function (
   {
      title, // string
      connection // IDemoNavigationItemConnection
   }
) {
   return measureTextWidthRem(
      title, {cssFont: getCssFont(connection)});
};

GroupingNavigationItem.propTypes = {
   connection: PropTypes.object.isRequired,
   title: PropTypes.string.isRequired,
};

function getCssFont(connection) {
   const shUISet = connection.settings.shared.ui;
   const font = shUISet.style.navigationItemFont;
   
   return `${font.sizeRem}rem ${font.names}`;
}