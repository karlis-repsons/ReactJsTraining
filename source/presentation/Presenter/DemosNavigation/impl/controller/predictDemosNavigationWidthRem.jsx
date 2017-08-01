import {SystemException, ArgumentException} from 'exceptionTypes_mjS3d_v0';

import DemoNavigationItem from '../../navigationItems/DemoNavigationItem/DemoNavigationItem';
import GroupingNavigationItem from '../../navigationItems/GroupingNavigationItem/GroupingNavigationItem';
import TreeViewCalculator from '../view/tree/DemosNavigationTreeCalculator';

/**
 * @param demosNavigationConnection - IDemosNavigationConnection
 * @param uiTreeData - ?[DemosNavigationUITreeNode]
 * @throws SystemException, ArgumentException
 * @returns rem units - number
 */
export default function predictDemosNavigationWidthRem(
   {demosNavigationConnection: nc, uiTreeData}
) {
   return getMaxSubtreeWidthRem({nc, uiTreeData});
}

/**
 * @param nc - IDemosNavigationConnection
 */
function getMaxSubtreeWidthRem({nc, uiTreeData}) {
   const treeViewCalculator = new TreeViewCalculator(
      nc.settings.private.ui.tree);
   
   return getMaxSubtreeWidthRem_impl({
      isUITreeAvailable: typeof uiTreeData === 'object',
      treeData: uiTreeData ? uiTreeData : nc.data.sourceNavigationTree,
      accumulatedLeftPaddingRem: treeViewCalculator.leftMarginRem,
      treeViewCalculator,
      nc
   });
}

/**
 * @param isUITreeAvailable - bool
 * @param treeData - [DemosNavigation(UI|Source)TreeNode]
 * @param accumulatedLeftPaddingRem - number
 * @param treeViewCalculator - DemosNavigationTreeCalculator
 */
function getMaxSubtreeWidthRem_impl(
   {
      isUITreeAvailable, treeData,
      accumulatedLeftPaddingRem,
      treeViewCalculator, nc
   }
) {
   if (typeof isUITreeAvailable !== 'boolean')
      throw new ArgumentException();
   if (!treeData || typeof treeData.length !== 'number')
      throw new ArgumentException('Got bad tree data.');
   if (typeof accumulatedLeftPaddingRem !== 'number')
      throw new ArgumentException(
         'Got non-number accumulated left padding.');
   
   let maxSubtreeWidthRem = 0;
   for (const nodeData of treeData) {
      const w = getSubtreeWidthRem({
         isUITreeAvailable, nodeData,
         accumulatedLeftPaddingRem,
         treeViewCalculator, nc
      });
      if (w > maxSubtreeWidthRem)
         maxSubtreeWidthRem = w;
   }
   return maxSubtreeWidthRem;
}

/**
 * Get subtree width including tree margin on the left
 * and tree padding on the right.
 * @param nodeData - DemosNavigation(UI|Source)TreeNode
 */
function getSubtreeWidthRem(
   {
      isUITreeAvailable, nodeData,
      accumulatedLeftPaddingRem,
      treeViewCalculator, nc
   }
) {
   const treeSet = nc.settings.private.ui.tree;
   
   accumulatedLeftPaddingRem += treeSet.structureLines.blockWidthRem;
   
   let navigationItemWidthRem;
   if (isUITreeAvailable)
      navigationItemWidthRem =
         nodeData.title.type.predictWidthRem({
            title: nodeData.title.props.title,
            connection: nodeData.title.props.connection
         });
   else {
      const title = nodeData.title;
      if (nodeData.demoPathOnServer)
         navigationItemWidthRem =
            DemoNavigationItem.predictWidthRem(
               {title, connection: nc.demoNavigationItem});
      else
         navigationItemWidthRem =
            GroupingNavigationItem.predictWidthRem(
               {title, connection: nc.groupingNavigationItem});
   }
   
   const navigationItemContainerWidthRem = (
      navigationItemWidthRem
      + treeViewCalculator.itemContainerExtraWidthRem);
   
   const subtreeWidth = (accumulatedLeftPaddingRem
                         + navigationItemContainerWidthRem
                         + treeSet.paddingRem.right);
   
   let result;
   const isNodeExpanded = isUITreeAvailable ?
      nodeData.expanded
      : nc.settings.private.ux.expandTreeOnInitialization;
   
   if (!isNodeExpanded || !nodeData.children)
      result = subtreeWidth;
   else {
      const maxWidthIncludingChildren =
         getMaxSubtreeWidthRem_impl({
            isUITreeAvailable,
            treeData: nodeData.children,
            accumulatedLeftPaddingRem,
            treeViewCalculator,
            nc
         });
      
      result = Math.max(subtreeWidth, maxWidthIncludingChildren);
   }
   
   if (typeof result !== 'number')
      throw new SystemException(
         'Got non-number subtree width.');
   
   return result;
}