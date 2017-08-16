import React from 'react';
import PropTypes from 'prop-types';

import {
   SystemException,
   InvalidOperationException
} from 'exceptionTypes_mjS3d_v0';

const demoBaseProps = {
   widthRem: PropTypes.number.isRequired,
   heightRem: PropTypes.number.isRequired,
   widthPx: PropTypes.number.isRequired,
   heightPx: PropTypes.number.isRequired,
   style: PropTypes.object.isRequired
};

const demoBaseDefaultProps = { };

export default class DemoBase extends React.Component {
   constructor(props) {
      super(props);
      
      if (typeof this.constructor.displayName !== 'string')
         throw new SystemException(
            `Missing display name for demo "${this.constructor.name}".`);
      
      const set = this.constructor.settings;
      if (!set || typeof set !== 'object')
         throw new SystemException(
            `Missing settings for demo "${this.constructor.displayName}". `
            + 'Add them as a static class property "settings" '
            + 'of type DemoComponentSettings.');
      
      this._baseStyle = Object.assign({}, props.style, {
         width: `${props.widthRem}rem`,
         height: `${props.heightRem}rem`
      });
   }
   
   get baseStyle() { return this._baseStyle; }
   
   set baseStyle(s) { throw new InvalidOperationException(); }
}

DemoBase.propTypes = demoBaseProps;
DemoBase.defaultProps = demoBaseDefaultProps;