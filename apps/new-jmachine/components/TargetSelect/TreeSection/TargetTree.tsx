'use client';

import { useCallback } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { TreeView } from '@common/ui';
import { type DeptsType, getSearchDeptClientFetch } from '../../../services/common/getSearchDept';
import { useSetDeptTreeData } from './hooks/useSetDeptTreeData';
import { type AssetDivisionTreeType, getDivisionTreeClientFetch } from '../../../services/asset/getDivisionTree';
import { type TargetCategoryType } from '../TargetSelectContent';

type TargetTreeProps = {
  type?: Exclude<TargetCategoryType, 'exceptionGroup'>;
  onSelectedNodeId?: (id: string) => void;
  onSelectedNode?: (data: DeptsType[]) => void;
  onSelectedAssetNode?: (data: AssetDivisionTreeType[]) => void;
};

export default function TargetTree({
  type = 'user',
  onSelectedNodeId,
  onSelectedNode,
  onSelectedAssetNode,
}: TargetTreeProps) {
  const getInitData = async () => [];

  const isEmpolyee = ['user', 'depts'].includes(type);
  const isInfra = ['asset', 'assetGroup'].includes(type);
  const typeKey = isEmpolyee ? 'employee' : 'assets';

  const { data } = useSuspenseQuery({
    queryKey: ['seach', 'depts', typeKey],
    queryFn: isEmpolyee ? () => getSearchDeptClientFetch() : () => getInitData(),
  });

  const { data: assetData } = useSuspenseQuery({
    queryKey: ['asset', 'division', 'tree', typeKey],
    queryFn: isInfra ? () => getDivisionTreeClientFetch() : () => getInitData(),
  });

  const treeData = useSetDeptTreeData(data);

  const flattenAssetTree = (nodes: AssetDivisionTreeType[]): Omit<AssetDivisionTreeType, 'children'>[] =>
    nodes.flatMap(({ children, ...rest }) => [rest, ...(children ? flattenAssetTree(children) : [])]);

  const assetsFlattened: Omit<AssetDivisionTreeType, 'children'>[] = flattenAssetTree(assetData);

  const handleSelectedNodes = useCallback(
    (selectedIds?: string[]) => {
      const targetId = selectedIds?.at(0);

      const targetData = data.filter((tree) => tree.deptFullPath.split('>').includes(targetId ?? ''));
      const targetAssetData = assetsFlattened.filter((tree) => tree.id === targetId || tree.passtDvnCd === targetId);

      if (type === 'user' && targetId) {
        onSelectedNodeId?.(targetId);
      }

      if (type === 'depts' && targetData) {
        onSelectedNode?.(targetData);
      }

      if (type === 'asset' && targetId) {
        onSelectedNodeId?.(targetId);
      }

      if (type === 'assetGroup' && targetAssetData) {
        onSelectedAssetNode?.(targetAssetData);
      }
    },
    [type, data, assetsFlattened, onSelectedNodeId, onSelectedNode, onSelectedAssetNode],
  );

  return (
    <div className="overflow-auto h-full">
      <TreeView
        variant="primary"
        size="small"
        showIcons
        isAllLine
        treeData={isInfra ? assetData : treeData}
        defaultExpandAll
        quickSearchEnabled
        onSelectedNodes={(selectedIds) => handleSelectedNodes(selectedIds)}
      />
    </div>
  );
}
