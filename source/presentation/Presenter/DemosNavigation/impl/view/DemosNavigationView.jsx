import React from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import makeClassNames from 'classnames';

import {convertRemToPx} from '../../../share/convertPxAndRem';

import DemosNavigationViewStyler from './DemosNavigationViewStyler';
import DemosNavigationTreeStyler from './tree/DemosNavigationTreeStyler';

export default class DemosNavigationView extends React.Component {
   constructor(props) {
      super(props);
      this._ensureStyleOverridesAreInDOM();
   }
   
   _ensureStyleOverridesAreInDOM(shouldRemake) {
      const elementId = `style-overrides-for-${
         DemosNavigationView.baseClassNames.replace(/\s+/g, '-')}`;
      
      if (!shouldRemake && document.getElementById(elementId))
         return;
      
      const overridingElement = document.createElement('style');
      overridingElement.setAttribute('id', elementId);
      overridingElement.innerHTML =
         new DemosNavigationTreeStyler(
            this.props.privateUISettings.tree
         ).overrideCSS;
      
      const domHead = document.getElementsByTagName('head').item(0);
      domHead.appendChild(overridingElement);
   }
   
   updateStyleOverrides() {
      this._ensureStyleOverridesAreInDOM(true);
   }
   
   render() {
      const p = this.props;
      const prUISet = p.privateUISettings;
      
      const classNames = makeClassNames(
         DemosNavigationView.baseClassNames, this.props.className);
      
      const styler = new DemosNavigationViewStyler();
      
      return (
         <div className={classNames} style={this.props.style}>
            <div className='content' style={this.props.contentStyle}>
               <SortableTree
                  style={styler.sortableTree.css}
                  treeData={this.props.uiTreeData}
                  onChange={this.props.gotNewUITreeData}
                  canDrag={false}
                  scaffoldBlockPxWidth={
                     convertRemToPx(prUISet.tree.structureLines.blockWidthRem)}
                  rowHeight={
                     convertRemToPx(prUISet.tree.rowHeightRem)}
               />
            </div>
         </div>
      );
   }
}

DemosNavigationView.baseClassNames = 'demos navigation zJ7k3';

DemosNavigationView.propTypes = {
   className: PropTypes.string,
   style: PropTypes.object,
   contentStyle: PropTypes.object,
   privateUISettings: PropTypes.object.isRequired,
   uiTreeData: PropTypes.array.isRequired, // [ DemosNavigationUITreeNode ]
   gotNewUITreeData: PropTypes.func // f ( uiTreeData )
};