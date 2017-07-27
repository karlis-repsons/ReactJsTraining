import React from 'react';

import DemoNavigationItem from '../../navigationItems/DemoNavigationItem/DemoNavigationItem';
import GroupingNavigationItem from '../../navigationItems/GroupingNavigationItem/GroupingNavigationItem';

/**
 * @param demosNavigationConnection - IDemosNavigationConnection
 * @param onDemoRequest - ?f({selectedDemoPathOnServer})
 * @param selectedDemoPathOnServer - string
 * @return input of react-sortable-tree - [DemosNavigationUITreeNode]
 */
export default function makeUITree(
   {
      demosNavigationConnection,
      onDemoRequest,
      selectedDemoPathOnServer
   }
) {
   const sourceTree = demosNavigationConnection.data.sourceNavigationTree
      // [DemosNavigationSourceTreeNode]
   ;
   return makeUITree_impl(
      {
         sourceTree,
         demosNavigationConnection,
         onDemoRequest,
         selectedDemoPathOnServer
      });
}

function makeUITree_impl(
   {
      sourceTree, demosNavigationConnection,
      onDemoRequest, selectedDemoPathOnServer
   }
) {
   let uiTree = [];
   sourceTree.forEach(node =>
      uiTree.push(makeUINode({
         sourceTreeNode: node,
         demosNavigationConnection,
         onDemoRequest, selectedDemoPathOnServer
      })));
   return uiTree;
}

/**
 * @param sourceTreeNode - DemosNavigationSourceTreeNode
 * @returns DemosNavigationUITreeNode
 */
function makeUINode(
   {
      sourceTreeNode, demosNavigationConnection: nc,
      onDemoRequest, selectedDemoPathOnServer
   }
) {
   let uiSubtree = {};
   
   if (!sourceTreeNode.demoPathOnServer)
      uiSubtree.title = (
         <GroupingNavigationItem
            connection={nc.groupingNavigationItem}
            title={sourceTreeNode.title}
         />);
   else
   {
      let onClick;
      if (selectedDemoPathOnServer !== sourceTreeNode.demoPathOnServer)
         onClick = () => onDemoRequest({
            selectedDemoPathOnServer: sourceTreeNode.demoPathOnServer});
      
      uiSubtree.title = (
         <DemoNavigationItem
            connection={nc.demoNavigationItem}
            title={sourceTreeNode.title}
            isSelected={selectedDemoPathOnServer ===
                        sourceTreeNode.demoPathOnServer}
            routePath={sourceTreeNode.demoPathOnServer}
            onClick={onClick}
         />);
   }
   
   if (sourceTreeNode.children
       && typeof sourceTreeNode.children.length === 'number'
       && sourceTreeNode.children.length > 0
   ) {
      uiSubtree.expanded = nc.settings.private.ux.expandTreeOnInitialization;
      uiSubtree.children = makeUITree_impl({
         sourceTree: sourceTreeNode.children,
         demosNavigationConnection: nc,
         onDemoRequest
      });
   }
   return uiSubtree;
}