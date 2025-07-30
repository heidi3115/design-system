import { Button, Separator, TreeView, type TreeViewProps, treeViewVariants } from '@common/ui';
import {
  assetDivisionTreeData,
  basicTreeData1,
  fileTypeTreeData,
  highriskGroupTreeData,
  responseStatusTreeData,
} from '@common/ui/__tests__/testTreeData.ts';
import type { TreeViewStateInfo } from '@common/ui/components/TreeView';
import type { TreeViewRef } from '@common/ui/components/TreeView/TreeView';
import { getAllNodeIds } from '@common/ui/components/TreeView/utils.ts';
import { EyeIcon, EyeOffIcon, UserFilledIcon } from '@common/ui/icons';
import { cn } from '@common/ui/lib/utils.ts';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

// 공통 스타일 클래스
const flexRow = 'relative flex flex-row size-max gap-4 text-juiText-primary';
const flexCol = 'relative flex flex-col size-max gap-4 text-juiText-primary';
const blueTxt = 'text-xs text-juiText-blue';

const sizeOptions = Object.keys(treeViewVariants.variants.size) as (keyof typeof treeViewVariants.variants.size)[];
const variantOptions = Object.keys(
  treeViewVariants.variants.variant,
) as (keyof typeof treeViewVariants.variants.variant)[];

// meta 정의
const meta: Meta<typeof TreeView> = {
  title: 'UI/DataDisplay/Compound/TreeView',
  component: TreeView,
  args: {
    treeData: basicTreeData1,
    variant: 'default',
    size: 'basic',
    disabled: false,
    multiSelect: false,
    leafOnlySelect: false,
    showIcons: true,
    defaultIcon: undefined,
    expandedIcon: undefined,
    endIcon: undefined,
    showLineLevel: undefined,
    defaultSelectedIds: undefined,
    selectedIds: undefined,
    defaultExpandedIds: undefined,
    expandedIds: undefined,
    onSelectedNodes: undefined,
    onToggledNodes: undefined,
    nodeClassName: '',
    className: '',
  },
  argTypes: {
    treeData: {
      control: false,
      table: {
        type: {
          summary: `TreeNodeProps<T>[]`,
          detail: `\`
type TreeNodeProps<T> = {
  id: string;
  name: string;
  children?: TreeNodeProps<T>[];
  [key: string]: unknown;
}
\``.trim(),
        },
      },
      description: [
        '트리 형태로 렌더링할 계층적 데이터 배열입니다.',
        '자식 노드가 있을 경우 `children` 속성에 배열로 하위 노드를 넣어야 합니다.',
        '예: [{ id: "1", name: "Parent", children: [{ id: "1-1", name: "Child" }] }, ...]',
      ].join('\n'),
    },
    variant: {
      control: 'select',
      options: variantOptions,
      table: { type: { summary: `${variantOptions.join(' | ')}` }, defaultValue: { summary: 'default' } },
      description: [
        '트리의 테마/색상 스타일을 지정합니다.',
        '브랜드 컬러, 에러 컬러 등 다양한 variant로 스타일을 제어할 수 있습니다.',
      ].join('\n'),
    },
    size: {
      control: 'select',
      options: sizeOptions,
      table: { type: { summary: `${sizeOptions.join(' | ')}` }, defaultValue: { summary: 'basic' } },
      description: [
        'TreeView 전체의 크기 및 폰트, 아이콘, 패딩의 scale을 조절합니다.',
        `기본값은 'basic' 이며, ${sizeOptions.join(' | ')} 등 다양한 옵션이 있습니다.`,
      ].join('\n'),
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        '전체 TreeView를 비활성화할지 여부입니다.',
        'true일 때 노드 선택/확장 등 모든 상호작용이 비활성화됩니다.',
      ].join('\n'),
    },
    multiSelect: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: ['다중 선택 모드를 활성화합니다.', 'true 활성화 시 여러 노드를 동시에 선택할 수 있습니다.'].join(
        '\n',
      ),
    },
    leafOnlySelect: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'multiSelect가 true일 때 leaf 노드만 선택 가능하도록 제한합니다.',
        'leaf 노드는 자식이 없는 노드를 의미합니다.',
      ].join('\n'),
    },
    showIcons: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        '노드 이름 좌측에 아이콘을 표시할지 여부입니다.',
        '아이콘은 각 노드 타입에 맞는 것으로 매핑할 수 있습니다.',
      ].join('\n'),
    },
    defaultIcon: {
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 이름 좌측에 아이콘 중 기본적인 축소 상태일 때의 아이콘을 일컫습니다.',
        '아이콘은 각 노드 타입에 맞는 것으로 매핑할 수 있으며, undefined로 지정하지 않을 경우 기본 아이콘으로 적용됩니다.',
      ].join('\n'),
    },
    expandedIcon: {
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 이름 좌측에 아이콘 중 확장된 상태일 때의 아이콘을 일컫습니다.',
        '아이콘은 각 노드 타입에 맞는 것으로 매핑할 수 있으며, undefined로 지정하지 않을 경우 기본 아이콘으로 적용됩니다.',
      ].join('\n'),
    },
    endIcon: {
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 이름 좌측에 아이콘 중 leaf node 로써, 자식이 없는 상일 때의 아이콘을 일컫습니다.',
        '아이콘은 각 노드 타입에 맞는 것으로 매핑할 수 있으며, undefined로 지정하지 않을 경우 기본 아이콘으로 적용됩니다.',
      ].join('\n'),
    },
    showLineLevel: {
      control: 'number',
      table: { type: { summary: 'number | undefined' }, defaultValue: { summary: 'undefined' } },
      description: [
        '노드 간 연결선(수직선)을 적용할 depth 레벨을 지정합니다.',
        '0일 때 root 부터, undefined 이면 연결선을 표시하지 않습니다.',
      ].join('\n'),
    },
    defaultSelectedIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '기본 선택된 노드 ID 들 입니다. (Uncontrolled 모드용).',
        'selectedIds가 제공되지 않을 때 초기 선택 상태를 설정합니다.',
      ].join('\n'),
    },
    selectedIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '현재 선택된 노드 ID 들입니다 (Controlled 모드용).',
        'onSelectedNodes와 함께 사용하여 선택 상태를 외부에서 제어합니다.',
      ].join('\n'),
    },
    defaultExpandedIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '기본 확장된 노드 ID 들 입니다. (Uncontrolled 모드용).',
        'expandedIds가 제공되지 않을 때 초기 확장 상태를 설정합니다.',
      ].join('\n'),
    },
    expandedIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '현재 확장된 노드 ID 들 입니다. (Controlled 모드용).',
        'onToggledNodes와 함께 사용하여 확장 상태를 외부에서 제어합니다.',
      ].join('\n'),
    },
    onSelectedNodes: {
      control: false,
      table: {
        type: { summary: '(selectedIds?: string[], selectedNodes?: TreeNodeProps<T>[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 선택 시 호출되는 콜백함수입니다.',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('\n'),
    },
    onToggledNodes: {
      control: false,
      table: {
        type: { summary: '(expandedIds?: string[], expandedNodes?: TreeNodeProps<T>[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 확장/축소 시 호출되는 콜백함수입니다.',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('\n'),
    },
    nodeClassName: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: 'TreeItem 컴포넌트에 추가할 CSS 클래스명입니다. Tailwind CSS 클래스를 사용할 수 있습니다.',
    },
    className: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      description: 'TreeView 컴포넌트에 추가할 CSS 클래스명입니다. Tailwind CSS 클래스를 사용할 수 있습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'TreeView 컴포넌트는 계층적/트리 구조 데이터를 시각적으로 탐색하거나 관리할 수 있도록 도와드리는 UI 요소입니다.',
          '폴더, 조직도, 네비게이션, 분류, 설정 트리 등 다양한 곳에 활용하실 수 있습니다.',
          '트리 노드 데이터는 `id`, `name`, `children`(재귀) 속성이 필수이며, 필요시 확장 필드를 사용하실 수 있습니다.',
        ].join('\n\n'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    treeData: basicTreeData1,
    size: 'basic',
  },
  parameters: {
    docs: {
      description: {
        story: [
          '기본적인 TreeView 구조 예시입니다. 트리 데이터를 전달하시면 계층적으로 노드가 렌더링됩니다.',
          '현재로서는 자식이 있으면 폴더 아이콘을 보여주고 가장 마지막 endIcon은 PlayIcon 으로 기본값이 설정되어 있습니다.',
        ].join('\n'),
      },
    },
  },
};

export const Variants: Story = {
  args: {
    treeData: fileTypeTreeData,
    showLineLevel: 0,
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
    treeData: {
      table: { disable: true },
    },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    defaultSelectedIds: {
      table: { disable: true },
    },
    selectedIds: {
      table: { disable: true },
    },
    defaultExpandedIds: {
      table: { disable: true },
    },
    expandedIds: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          'TreeView 컴포넌트의 variant 값에 따른 스타일 변경 예시입니다.',
          '각 변형마다 다른 색상 테마가 적용됩니다. 현재로서는 아이콘 뒤의 배경과 hover, active 상태에 대해서만 적용되어 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexRow, 'items-start justify-center py-25 text-juiText-primary')}>
      {variantOptions.map((variant) => (
        <div key={variant} className={cn(flexRow)}>
          <div className={'flex flex-col gap-1 mr-4'}>
            <span className={'text-xs text-juiText-blue'}>variant : {variant}</span>
            <TreeView {...args} variant={variant} />
          </div>
          <Separator orientation={'vertical'} position={'absolute'} size={'small'} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    treeData: fileTypeTreeData,
    showLineLevel: 0,
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
    treeData: {
      table: { disable: true },
    },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: ['여러 size 옵션별 TreeView 결과를 확인하실 수 있는 예시입니다.'].join('\n'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, 'items-center justify-center')}>
      <div className={'relative grid grid-cols-3 gap-6'}>
        {sizeOptions.map((size) => (
          <div key={size} className={cn(flexCol, 'items-start')}>
            <div className={cn(flexCol, 'h-100 overflow-y-auto')}>
              <span className={'text-xs text-juiText-blue'}>size : {size}</span>
              <TreeView {...args} size={size} />
            </div>
            <Separator orientation={'horizontal'} size={'small'} />
          </div>
        ))}
      </div>
    </div>
  ),
};

function UncontrolledExample({ ...args }: TreeViewProps) {
  const treeViewRef = useRef<TreeViewRef>(null);
  const [lastAction, setLastAction] = useState<string>('');
  const [stateInfo, setStateInfo] = useState<
    | (TreeViewStateInfo & {
        selectedIds: string[];
        expandedIds: string[];
      })
    | null
  >(null);

  const handleGetState = () => {
    if (treeViewRef.current) {
      const state = treeViewRef.current.getState();
      const selectedIds = treeViewRef.current.getSelectedIds();
      const expandedIds = treeViewRef.current.getExpandedIds();

      setStateInfo({ ...state, selectedIds, expandedIds });
      setLastAction('상태 조회 완료');
    }
  };

  const handleClearState = () => {
    setStateInfo(null);
    setLastAction('');
  };

  return (
    <div className={cn(flexCol, 'items-center justify-center size-full')} key={JSON.stringify(args)}>
      <h3 className="text-lg font-semibold">비제어 (Uncontrolled)</h3>
      <div className={cn(flexRow, 'relative items-start justify-center gap-6 size-full')}>
        <div className={cn(flexCol, 'gap-4 flex-1 text-xs')}>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>설정되어 있던 defaultSelectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultSelectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>설정되어 있던 defaultExpandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultExpandedIds)}</span>
          </p>
          <p className={cn(flexRow)}>
            <pre className={'text-xs py-4 whitespace-pre-wrap'}>
              {`현재 TreeView 상태 정보:
- 제어 모드: ${stateInfo?.isControlled.selected ? 'Controlled' : 'Uncontrolled'} (선택) / ${stateInfo?.isControlled.expanded ? 'Controlled' : 'Uncontrolled'} (확장)
- 전체 노드: ${stateInfo?.totalNodes || 0}개
- 선택된 노드: ${stateInfo?.selectedCount || 0}개 [${stateInfo?.selectedIds.join(', ') || '없음'}]
- 확장된 노드: ${stateInfo?.expandedCount || 0}개 [${stateInfo?.expandedIds.join(', ') || '없음'}]
- 비활성화된 노드: ${stateInfo?.disabledCount || 0}개
- 마지막 선택: ${stateInfo?.lastSelectedId || '없음'}`}
            </pre>
          </p>
          <p className={'flex flex-wrap gap-2'}>
            <Button
              variant={'primary'}
              size={'small'}
              className={'text-xs '}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleGetState();
              }}>
              ref로 상태 조회
            </Button>
            <Button
              variant={'secondary'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleClearState();
              }}>
              정보 지우기
            </Button>
          </p>
          {lastAction && (
            <p className={blueTxt}>
              <span className={'text-juiText-primary'}>마지막 액션:</span> {lastAction}
            </p>
          )}
        </div>
        <div className={cn(flexCol, 'flex-1')}>
          <div className={cn(flexCol, 'items-start overflow-y-auto w-full h-150 p-4 border border-juiText-primary')}>
            <TreeView
              {...args}
              treeViewRef={treeViewRef}
              onSelectedNodes={(ids) => {
                setStateInfo((prev) =>
                  !prev
                    ? {
                        isControlled: { selected: false, expanded: false },
                        totalNodes: 0,
                        selectedCount: ids?.length || 0,
                        expandedCount: 0,
                        disabledCount: 0,
                        lastSelectedId: '',
                        selectedIds: ids || [],
                        expandedIds: [],
                      }
                    : {
                        ...prev,
                        selectedIds: ids || [],
                        selectedCount: ids?.length || 0,
                      },
                );

                setLastAction(`선택 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
              onToggledNodes={(ids) => {
                setStateInfo((prev) =>
                  !prev
                    ? {
                        isControlled: { selected: false, expanded: false },
                        totalNodes: 0,
                        selectedCount: 0,
                        expandedCount: ids?.length || 0,
                        disabledCount: 0,
                        lastSelectedId: '',
                        selectedIds: [],
                        expandedIds: ids || [],
                      }
                    : {
                        ...prev,
                        expandedIds: ids || [],
                        expandedCount: ids?.length || 0,
                      },
                );

                setLastAction(`확장 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Uncontrolled: Story = {
  args: {
    treeData: highriskGroupTreeData,
    multiSelect: true,
    leafOnlySelect: true,
    showLineLevel: 0,
    defaultSelectedIds: ['H100', 'H112', 'H109'],
    defaultExpandedIds: ['H100'],
  },
  argTypes: {
    treeData: { table: { disable: true } },
    multiSelect: { table: { disable: true } },
    leafOnlySelect: { table: { disable: true } },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    defaultSelectedIds: {
      table: { disable: true },
    },
    defaultExpandedIds: {
      table: { disable: true },
    },
    selectedIds: {
      table: { disable: true },
    },
    expandedIds: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`defaultSelectedIds`와 `defaultExpandedIds`를 통해 초기값을 이용한 TreeView 컴포넌트의 비제어(Uncontrolled) 예시입니다.',
          '비제어 모드에서는 TreeView 컴포넌트가 선택 및 확장 상태를 자체적으로 관리합니다.',
          '기본 선택과 확장 상태는 `defaultSelectedIds`와 `defaultExpandedIds`를 통해 초기값을 설정하실 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args) => {
    return <UncontrolledExample {...args} />;
  },
};

function ControlledExample({ ...args }: TreeViewProps) {
  const treeViewRef = useRef<TreeViewRef>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(args?.selectedIds || []);
  const [expandedIds, setExpandedIds] = useState<string[]>(args?.expandedIds || []);
  const [stateInfo, setStateInfo] = useState<TreeViewStateInfo | null>(null);
  const [lastAction, setLastAction] = useState<string>('');
  const allKeys = getAllNodeIds(args?.treeData || []);

  const handleGetState = () => {
    if (treeViewRef.current) {
      setSelectedIds(treeViewRef.current.getSelectedIds());
      setExpandedIds(treeViewRef.current.getExpandedIds());
      setStateInfo(treeViewRef.current.getState());
      setLastAction('상태 조회 완료');
    }
  };

  const handleResetSelection = () => {
    setSelectedIds([]);
    setLastAction('선택 초기화');
  };

  const handleSelectAll = () => {
    setSelectedIds(allKeys);
    setLastAction(`모든 Leaf 노드 선택: ${allKeys.length}개`);
  };

  const handleExpandAll = () => {
    setExpandedIds(allKeys);
    setLastAction(`모든 노드 확장: ${allKeys.length}개`);
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
    setLastAction('모든 노드 축소');
  };

  useEffect(() => {
    handleGetState();
  }, []);

  return (
    <div className={cn(flexCol, 'items-center justify-center size-full')} key={JSON.stringify(args)}>
      <h3 className="text-lg font-semibold">제어 (Controlled)</h3>
      <div className={cn(flexRow, 'relative items-start justify-center gap-6 size-full')}>
        <div className={cn(flexCol, 'gap-4 flex-1 text-xs max-w-1/2')}>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>설정되어 있던 defaultSelectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultSelectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>설정되어 있던 defaultExpandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultExpandedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>현재 selectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.selectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>현재 expandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.expandedIds)}</span>
          </p>
          <p className={cn(flexRow, 'w-full')}>
            <pre className={'w-full text-xs py-4 whitespace-pre-line'}>
              {`현재 TreeView 상태 정보:
- 제어 모드: ${stateInfo?.isControlled.selected ? 'Controlled' : 'Uncontrolled'} (선택) / ${stateInfo?.isControlled.expanded ? 'Controlled' : 'Uncontrolled'} (확장)
- 전체 노드: ${stateInfo?.totalNodes || 0}개
- 선택된 노드: ${stateInfo?.selectedCount || 0}개 [${selectedIds.join(', ') || '없음'}]
- 확장된 노드: ${stateInfo?.expandedCount || 0}개 [${expandedIds.join(', ') || '없음'}]
- 비활성화된 노드: ${stateInfo?.disabledCount || 0}개
- 마지막 선택: ${stateInfo?.lastSelectedId || '없음'}`}
            </pre>
          </p>
          <p className={'flex flex-wrap gap-2'}>
            <Button
              variant={'primary'}
              size={'small'}
              className={'text-xs '}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleGetState();
              }}>
              ref로 상태 조회
            </Button>
            <Button
              variant={'secondary'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleSelectAll();
              }}>
              모두 선택하기
            </Button>
            <Button
              variant={'transparentGrey'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleResetSelection();
              }}>
              모든 선택 초기화하기
            </Button>
            <Button
              variant={'gradient'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleExpandAll();
              }}>
              모두 확장하기
            </Button>
            <Button
              variant={'default'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleCollapseAll();
              }}>
              모두 축소하기
            </Button>
          </p>
          {lastAction && (
            <p className={blueTxt}>
              <span className={'text-juiText-primary'}>마지막 액션:</span> {lastAction}
            </p>
          )}
        </div>
        <div className={cn(flexCol, 'flex-1')}>
          <div className={cn(flexCol, 'items-start overflow-y-auto w-full h-150 p-4 border border-juiText-primary')}>
            <TreeView
              {...args}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              treeViewRef={treeViewRef}
              onSelectedNodes={(ids) => {
                setStateInfo((prev) =>
                  !prev
                    ? {
                        isControlled: { selected: false, expanded: false },
                        totalNodes: 0,
                        selectedCount: ids?.length || 0,
                        expandedCount: 0,
                        disabledCount: 0,
                        lastSelectedId: '',
                        selectedIds: ids || [],
                        expandedIds: [],
                      }
                    : {
                        ...prev,
                        selectedIds: ids || [],
                        selectedCount: ids?.length || 0,
                      },
                );

                setLastAction(`선택 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
              onToggledNodes={(ids) => {
                setStateInfo((prev) =>
                  !prev
                    ? {
                        isControlled: { selected: false, expanded: false },
                        totalNodes: 0,
                        selectedCount: 0,
                        expandedCount: ids?.length || 0,
                        disabledCount: 0,
                        lastSelectedId: '',
                        selectedIds: [],
                        expandedIds: ids || [],
                      }
                    : {
                        ...prev,
                        expandedIds: ids || [],
                        expandedCount: ids?.length || 0,
                      },
                );

                setLastAction(`확장 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Controlled: Story = {
  args: {
    treeData: highriskGroupTreeData,
    defaultSelectedIds: ['H100', 'H112', 'H109'],
    selectedIds: ['H201', 'H203'],
    defaultExpandedIds: ['H100'],
    expandedIds: ['H200'],
    multiSelect: true,
    leafOnlySelect: true,
    showLineLevel: 0,
  },
  argTypes: {
    treeData: { table: { disable: true } },
    multiSelect: { table: { disable: true } },
    leafOnlySelect: { table: { disable: true } },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    defaultSelectedIds: {
      table: { disable: true },
    },
    defaultExpandedIds: {
      table: { disable: true },
    },
    selectedIds: {
      table: { disable: true },
    },
    expandedIds: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`selectedIds`와 `expandedIds`를 통해 외부에서 상태를 제어하는 TreeView 컴포넌트의 제어(Controlled) 예시입니다.',
          '제어 모드에서는 부모 컴포넌트가 선택 및 확장 상태를 완전히 관리합니다.',
          '노드를 클릭/토글하실 때 onSelectedNodes, onToggledNodes 콜백이 호출되며, 부모 컴포넌트가 상태를 관합니다.',
        ].join('\n'),
      },
    },
  },
  render: (args) => {
    return <ControlledExample {...args} />;
  },
};

export const IconAndLine: Story = {
  name: 'Icon/Line Overview',
  args: {
    treeData: responseStatusTreeData,
    defaultIcon: <EyeIcon />,
    expandedIcon: <EyeOffIcon />,
    endIcon: <UserFilledIcon />,
    showLineLevel: 0,
  },
  argTypes: {
    showLineLevel: { table: { disable: true } },
    treeData: { table: { disable: true } },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    defaultSelectedIds: {
      table: { disable: true },
    },
    defaultExpandedIds: {
      table: { disable: true },
    },
    selectedIds: {
      table: { disable: true },
    },
    expandedIds: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: ['다양한 커스텀 된 iconMap의 예시들과, showLineLevel 의 예시를 확인하실 수 있습니다.'].join('\n'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, 'items-start justify-center size-full')}>
      <div className={cn(flexRow, 'items-start gap-6 w-full')}>
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            key={idx}
            className={cn(flexCol, 'min-w-1/3 h-100 overflow-y-auto p-2 border border-juiText-primary rounded-md')}>
            <div>
              <p className={blueTxt}>
                <pre className={'w-full text-xs py-4 whitespace-pre-line'}>
                  {`지정된 아이콘 정보 :
defaultIcon: <EyeIcon />
    expandedIcon: <EyeOffIcon />
    endIcon: <UserFilledIcon />`}
                </pre>
              </p>
              <p className={blueTxt}>showLineLevel : {idx}</p>
            </div>
            <TreeView {...args} showLineLevel={idx} />
          </div>
        ))}
      </div>
    </div>
  ),
};

function LeafOnlySelectRender(args: TreeViewProps) {
  const cases = [
    { multiSelect: false, leafOnlySelect: false },
    { multiSelect: true, leafOnlySelect: false },
    { multiSelect: true, leafOnlySelect: true },
    { multiSelect: false, leafOnlySelect: true }, // leafOnlySelect만 true인 경우는 실제로 의미 없긴 함.
  ];

  return (
    <div className={cn(flexCol, 'gap-6 text-juiText-primary')}>
      <h3 className={''}>Leaf Only Selection (multiSelect + leafOnlySelect)</h3>
      <p className={''}>multiSelect와 leafOnlySelect의 모든 조합별 TreeView 동작을 한 번에 비교할 수 있습니다.</p>
      <div className={cn(flexRow, 'gap-6 flex-wrap items-start justify-center w-full')}>
        {cases.map(({ multiSelect, leafOnlySelect }, idx) => (
          <div
            key={idx}
            className={cn(flexCol, 'min-w-1/3 h-100 overflow-y-auto p-4 border border-juiText-primary rounded-md')}>
            <div className={cn('mb-2')}>
              <span className={'font-semibold'}>
                multiSelect: {String(multiSelect)}, leafOnlySelect: {String(leafOnlySelect)}
              </span>
              <p className={'text-xs text-juiText-secondary'}>
                {multiSelect
                  ? leafOnlySelect
                    ? '여러 노드 중 leaf만 선택 가능'
                    : '모든 노드 다중 선택 가능'
                  : leafOnlySelect
                    ? 'leafOnlySelect만 true인 경우: 단일 선택만 가능(leaf 제한 없음)'
                    : '모든 노드 단일 선택 가능'}
              </p>
            </div>
            <TreeView {...args} multiSelect={multiSelect} leafOnlySelect={leafOnlySelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const Selections: Story = {
  name: 'Selection Overview',
  args: {
    treeData: assetDivisionTreeData,
  },
  argTypes: {
    treeData: { table: { disable: true } },
    multiSelect: { table: { disable: true } },
    leafOnlySelect: { table: { disable: true } },
    defaultIcon: {
      table: { disable: true },
    },
    expandedIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
    defaultSelectedIds: {
      table: { disable: true },
    },
    defaultExpandedIds: {
      table: { disable: true },
    },
    selectedIds: {
      table: { disable: true },
    },
    expandedIds: {
      table: { disable: true },
    },
    onSelectedNodes: {
      table: { disable: true },
    },
    onToggledNodes: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: ['multiSelect 와 leafOnlySelect 의 다양한 조합을 확인할 수 있는 예시입니다.'].join('\n'),
      },
    },
  },
  render: (args) => <LeafOnlySelectRender {...args} />,
};
