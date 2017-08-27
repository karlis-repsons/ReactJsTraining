import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import measureTextWidthRem from '../../../share/measureTextWidthRem';

import {getFontCSSValue} from '../share/getNavigationItemSharedCSS';

import Styler from './impl/DemoNavigationItemStyler';

export default class DemoNavigationItem extends React.Component {
   static predictWidthRem(
      {
         connection, // IDemoNavigationItemConnection
         title, // string
         //isSelected // ISelectedDemoConnection // TODO - make this available
      }
   )
   {
      const fontCSSValue = getFontCSSValue(connection);
      const textWidthRem = measureTextWidthRem(
         title, {cssFont: fontCSSValue});
      
      const niShUISty = connection.settings.shared.navigationItem.ui.style;
      const pdRem = niShUISty.paddingRem;
      const resultRem = textWidthRem + pdRem.left + pdRem.right;
      
      return resultRem;
   }
   
   _renderLink(isSelected, styler) {
      const p = this.props;
      
      if (isSelected)
         return <span style={styler.text.css}>{
            p.title
         }</span>;
      else
         return <NavLink to={p.routePath} style={styler.text.css}>{
            p.title
         }</NavLink>;
   }
   
   render() {
      const p = this.props;
      
      const isSelected =
         p.selectedDemoConnection.demoPathOnServer === p.routePath;
      const styler = new Styler({
         props: this.props,
         isSelected
      });
      
      return (
         <div className='demo nav item kYe4r'
              style={styler.container.css}
              onClick={p.onClick}
         >{
               this._renderLink(isSelected, styler)
         }</div>
      );
   }
}

DemoNavigationItem.propTypes = {
   connection: PropTypes.object.isRequired,
   selectedDemoConnection: PropTypes.object.isRequired
   // ISelectedDemoConnection -
   // the first given value will stay cached in react sortable tree
   ,
   title: PropTypes.string.isRequired,
   routePath: PropTypes.string.isRequired,
   onClick: PropTypes.func // f()
};