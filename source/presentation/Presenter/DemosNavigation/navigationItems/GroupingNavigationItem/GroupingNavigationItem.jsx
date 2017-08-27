import React from 'react';
import PropTypes from 'prop-types';

import measureTextWidthRem from '../../../share/measureTextWidthRem';

import {getFontCSSValue} from '../share/getNavigationItemSharedCSS';

import Styler from './impl/GroupingNavigationItemStyler';

export default function GroupingNavigationItem(props) {
   const styler = new Styler({props});
   
   return (
      <div className='nav item zy42l' style={styler.text.css}>{
         props.title
      }</div>
   );
}

GroupingNavigationItem.predictWidthRem = function (
   {
      title, // string
      connection // IDemoNavigationItemConnection
   }
) {
   const fontCSSValue = getFontCSSValue(connection);
   const textWidthRem = measureTextWidthRem(
      title, {cssFont: fontCSSValue});
   
   const niShUISty = connection.settings.shared.navigationItem.ui.style;
   const pdRem = niShUISty.paddingRem;
   const resultRem = textWidthRem + pdRem.left + pdRem.right;
   
   return resultRem;
};

GroupingNavigationItem.propTypes = {
   connection: PropTypes.object.isRequired,
   title: PropTypes.string.isRequired,
};