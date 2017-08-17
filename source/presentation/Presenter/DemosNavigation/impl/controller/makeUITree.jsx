import React from 'react';

import DemoNavigationItem from '../../navigationItems/DemoNavigationItem/DemoNavigationItem';
import GroupingNavigationItem from '../../navigationItems/GroupingNavigationItem/GroupingNavigationItem';

/**
 * @param demosNavigationConnection - IDemosNavigationConnection
 * @param selectedDemoConnection - ISelectedDemoConnection
 * @param onDemoRequest - ?f({selectedDemoPathOnServer})
 * @return input of react-sortable-tree - [DemosNavigationUITreeNode]
 */
export default function makeUITree(
   {
      demosNavigationConnection,
      selectedDemoConnection,
      onDemoRequest
   }
) {
   const sourceTree = demosNavigationConnection.content.sourceNavigationTree
      // [DemosNavigationSourceTreeNode]
   ;
   return makeUITree_impl(
      {
         sourceTree,
         demosNavigationConnection,
         selectedDemoConnection,
         onDemoRequest
      });
}

function makeUITree_impl(
   {
      sourceTree, demosNavigationConnection,
      selectedDemoConnection, onDemoRequest
   }
)
{
   let uiTree = [];
   sourceTree.forEach(node =>
      uiTree.push(makeUINode({
         sourceTreeNode: node,
         demosNavigationConnection,
         selectedDemoConnection,
         onDemoRequest
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
      selectedDemoConnection: sdConn, onDemoRequest
   }
)
{
   let uiSubtree = {};
   
   if (!sourceTreeNode.demoPathOnServer)
      uiSubtree.title = (
         <GroupingNavigationItem
            connection={nc.groupingNavigationItem}
            title={sourceTreeNode.title}
         />);
   else {
      const onClick = () => onDemoRequest({
         selectedDemoPathOnServer: sourceTreeNode.demoPathOnServer
      });
      
      uiSubtree.title = (
         <DemoNavigationItem
            connection={nc.demoNavigationItem}
            selectedDemoConnection={sdConn}
            title={sourceTreeNode.title}
            routePath={sourceTreeNode.demoPathOnServer}
            onClick={onClick}
         />);
   }
   
   if (sourceTreeNode.children
       && typeof sourceTreeNode.children.length === 'number'
       && sourceTreeNode.children.length > 0
   ) {
      uiSubtree.expanded = nc.settings.private.tree.ux.expandOnInitialization;
      uiSubtree.children = makeUITree_impl({
         sourceTree: sourceTreeNode.children,
         demosNavigationConnection: nc,
         selectedDemoConnection: sdConn,
         onDemoRequest
      });
   }
   return uiSubtree;
}