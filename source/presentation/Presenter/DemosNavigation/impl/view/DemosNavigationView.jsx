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
            this.props.connection.settings.private.tree.ui
         ).overrideCSS;
      
      const domHead = document.getElementsByTagName('head').item(0);
      domHead.appendChild(overridingElement);
   }
   
   updateStyleOverrides() {
      this._ensureStyleOverridesAreInDOM(true);
   }
   
   render() {
      const p = this.props;
      const prSet = p.connection.settings.private;
      
      const classNames = DemosNavigationView.baseClassNames;
      const styler = new DemosNavigationViewStyler({props: p});
      
      let maximizeSelectedDemoButton;
      if (p.selectedDemoConnection.isDemoSelected)
         maximizeSelectedDemoButton = (
            <div style={styler.hideButton.css} onClick={p.onHideRequest}>
               <i className='fa fa-times'
                  style={styler.hideButton.icon.css} />
            </div>
         );
      
      return (
         <div className={classNames} style={styler.container.css}>
            <div className='content' style={styler.content.css}>
               
               {maximizeSelectedDemoButton}
               
               <SortableTree
                  style={styler.sortableTree.css}
                  treeData={this.props.uiTreeData}
                  onChange={this.props.gotNewUITreeData}
                  canDrag={false}
                  scaffoldBlockPxWidth={
                     convertRemToPx(prSet.tree.ui.structureLines.blockWidthRem)}
                  rowHeight={
                     convertRemToPx(prSet.tree.ui.rowHeightRem)}
               />
            
            </div>
         </div>
      );
   }
}

DemosNavigationView.baseClassNames = 'demos navigation zJ7k3';

DemosNavigationView.propTypes = {
   connection: PropTypes.object.isRequired, // IDemosNavigationConnection
   selectedDemoConnection: PropTypes.object.isRequired
   // ISelectedDemoConnection -
   // the first given value will stay cached in react sortable tree
   ,
   style: PropTypes.object.isRequired,
   contentStyle: PropTypes.object.isRequired,
   uiTreeData: PropTypes.array.isRequired, // [ DemosNavigationUITreeNode ]
   gotNewUITreeData: PropTypes.func, // f ( uiTreeData )
   onHideRequest: PropTypes.func  // f()
};