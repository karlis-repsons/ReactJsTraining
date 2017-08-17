import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import measureTextWidthRem from '../../../share/measureTextWidthRem';

export default class DemoNavigationItem extends React.Component {
   static predictWidthRem(
      {
         connection, // IDemoNavigationItemConnection
         title, // string
         //isSelected // ISelectedDemoConnection // TODO - make this available
      }
   )
   {
      return measureTextWidthRem(
         title, {cssFont: getCssFont(connection)});
   }
   
   _renderLink() {
      const p = this.props;
      const sdConn = p.selectedDemoConnection;
      
      if (sdConn.demoPathOnServer === p.routePath)
         return p.title;
      else
         return (
            <NavLink to={p.routePath}>{
               p.title
            }</NavLink>
         );
   }
   
   render() {
      const p = this.props;
      
      return (
         <div className='demo nav item kYe4r'>
         <span
            style={{
               font: getCssFont(p.connection),
               color: 'blue'
            }}
            onClick={p.onClick}
         >{
            this._renderLink()
         }</span>
         </div>
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

function getCssFont(connection) {
   const shUISet = connection.settings.shared.ui;
   const font = shUISet.style.navigationItemFont;
   
   return `${font.sizeRem}rem ${font.names}`;
}