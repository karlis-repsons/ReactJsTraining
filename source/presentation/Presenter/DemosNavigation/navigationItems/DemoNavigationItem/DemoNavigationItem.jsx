import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import measureTextWidthRem from '../../../share/measureTextWidthRem';

export default class DemoNavigationItem extends React.Component {
   _renderLink() {
      const p = this.props;
      
      if (p.isSelected)
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

DemoNavigationItem.predictWidthRem = function (
   {
      title, // string
      connection // IDemoNavigationItemConnection
   }
) {
   return measureTextWidthRem(
      title, {cssFont: getCssFont(connection)});
};

DemoNavigationItem.propTypes = {
   connection: PropTypes.object.isRequired,
   title: PropTypes.string.isRequired,
   isSelected: PropTypes.bool,
   routePath: PropTypes.string.isRequired,
   onClick: PropTypes.func // f()
};
DemoNavigationItem.defaultProps = {
   isSelected: false
};

function getCssFont(connection) {
   const shUISet = connection.settings.shared.ui;
   const font = shUISet.style.navigationItemFont;
   
   return `${font.sizeRem}rem ${font.names}`;
}