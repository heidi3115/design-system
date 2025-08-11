import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@common/ui/lib/utils.ts';
import {
  Button,
  Separator,
  TreeView,
  type TreeViewProps,
  TreeViewSearchInput,
  type TreeViewStateType,
  treeViewVariants,
} from '@common/ui';
import {
  AlertTriangleFilledIcon,
  AlertTriangleIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  ShieldIcon,
  UserFilledIcon,
} from '@common/ui/icons';
import { DEFAULT_INDENT_SIZE, flattenTree, getAllNodeIds, isLeafNode } from '@common/ui/components/TreeView';
import {
  assetDivisionTreeData,
  type AssetTreeNodeProps,
  basicTreeData1,
  fileTypeTreeData,
  highriskGroupTreeData,
  responseStatusTreeData,
  sampleTreeData1,
} from '../../../../__tests__/testTreeData.ts';

// 공통 스타일 클래스
const flexRow = 'relative flex flex-row size-max gap-4 text-juiText-primary';
const flexCol = 'relative flex flex-col size-max gap-4 text-juiText-primary';
const blueTxt = 'text-xs text-juiText-blue';

const sizeOptions = Object.keys(treeViewVariants.variants.size) as (keyof typeof treeViewVariants.variants.size)[];
const variantOptions = Object.keys(
  treeViewVariants.variants.variant,
) as (keyof typeof treeViewVariants.variants.variant)[];

const meta: Meta<typeof TreeView> = {
  title: 'UI/DataDisplay/Compound/TreeView',
  component: TreeView,
  args: {
    treeData: basicTreeData1,
    size: 'basic',
    variant: 'default',
    disabled: false,
    multiSelect: false,
    leafOnlySelect: false,
    showIcons: true,
    defaultIcon: undefined,
    expandedIcon: undefined,
    endIcon: undefined,
    indentSize: DEFAULT_INDENT_SIZE,
    showLineLevel: undefined,
    isAllLine: false,
    defaultSelectedIds: undefined,
    selectedIds: undefined,
    defaultExpandedIds: undefined,
    expandedIds: undefined,
    defaultDisabledIds: undefined,
    disabledIds: undefined,
    onSelectedNodes: undefined,
    onToggledNodes: undefined,
    onDisabledNodes: undefined,
    onTreeViewState: undefined,
    nodeClassName: '',
    className: '',
    treeViewRef: undefined,
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
        '트리 형태로 렌더링할 계층적 데이터 배열입니다. id 와 name 이 필수여야 합니다.',
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
        '전체 TreeView 컴포넌트를 비활성화할지 여부입니다.',
        'true일 때 노드 선택/확장 등 모든 상호작용이 비활성화 됩니다.',
      ].join('\n'),
    },
    multiSelect: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'TreeView 컴포넌트에서 다중 선택 모드를 활성화합니다.',
        'true로 활성화 시 여러 노드를 동시에 선택할 수 있습니다.',
      ].join('\n'),
    },
    leafOnlySelect: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      description: [
        'multiSelect가 true일 때 leaf 노드만 선택 가능하도록 제한합니다.',
        'leaf 노드는 자식이 없는 노드를 의미합니다.',
        'multiSelect가 false 일 경우 하나의 노드만이 선택 가능 할 때, 자식이 있는 노드는 선택이 불가합니다.',
      ].join('\n'),
    },
    showIcons: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      description: [
        '노드 이름 좌측에 아이콘을 표시할지 여부입니다.',
        '아이콘은 기본적으로 제공되고 있으며, 각 노드 타입에 맞는 것으로 필요에 따라 defaultIcon, expandedIcon, endIcon 으로 별도로 설정할 수 있습니다.',
        '별도로 아이콘이 지정 되어있어도 showIcons 이 false 면 아이콘이 보이지 않게 됩니다.',
      ].join('\n'),
    },
    defaultIcon: {
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드 중에서 자식이 있는 아이콘 일 경우, 노드 이름 좌측에 아이콘 중 기본적인 축소 상태일 때의 아이콘을 일컫습니다.',
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
        '자식이 있는 아이콘 일 경우, 노드 이름 좌측에 아이콘 중 확장된 상태일 때의 아이콘을 일컫습니다.',
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
        '자식이 없는 리프 노드(leaf node) 의 경우, 노드 이름 좌측에 있는 아이콘을 일컫습니다.',
        '리프 노드의 경우 축소/확장 상태를 보여줄 필요가 없으므로 동일한 아이콘이 유지됩니다.',
        '아이콘은 각 노드 타입에 맞는 것으로 매핑할 수 있으며, undefined로 지정하지 않을 경우 기본 아이콘으로 적용됩니다.',
      ].join('\n'),
    },
    indentSize: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: `${DEFAULT_INDENT_SIZE}` } },
      description: [
        '추가적인 들여쓰기의 간격을 지정하실 수 있습니다.',
        `기본값은 ${DEFAULT_INDENT_SIZE} 이며, px 단위로 추가적인 들여쓰기 간격을 지정하실 수 있습니다.`,
      ].join('\n'),
    },
    showLineLevel: {
      control: 'number',
      table: { type: { summary: 'number | undefined' }, defaultValue: { summary: 'undefined' } },
      description: [
        '노드 간 연결선(수직선)을 적용할 depth 레벨을 지정합니다.',
        '0일 때 root 레벨에서 선이 보이며, 각 보이고 싶은 선의 레벨을 지정할 수 있고, undefined 이면 연결선을 표시하지 않습니다.',
      ].join('\n'),
    },
    isAllLine: {
      control: { type: 'boolean' },
      description: [
        'showLineLevel 부터 자식까지 선을 보여줄 지 여부입니다. True 일 경우, showLineLevel의 숫자부터 선이 계속 보이게 됩니다.',
        '예를 들어 showLineLevel 이 1이고, isAllLine 이 true 라면 depth 1부터 자식인 depth=2,3,4... 등 계속 이어져서 선이 전부 보이게 됩니다.',
        'showLineLevel 이 undefined 라면, isAllLine이 true 여도 선이 보이지 않습니다.',
      ].join('<br/>'),
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'showLineLevel', exists: true },
    },
    defaultSelectedIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '기본값으로 선택된 노드 ID 들 입니다. (Uncontrolled 모드용).',
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
        '기본값으로 확장된 노드 ID 들 입니다. (Uncontrolled 모드용).',
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
    defaultDisabledIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '기본값으로 비활성화 된 노드 ID 들 입니다. (Uncontrolled 모드용).',
        'disabledIds가 제공되지 않을 때 초기 비활성화 상태를 설정합니다.',
      ].join('\n'),
    },
    disabledIds: {
      control: false,
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '현재 비활성화 된 노드 ID 들 입니다. (Controlled 모드용).',
        'onDisabledNodes와 함께 사용하여 비활성화 상태를 외부에서 제어합니다.',
      ].join('\n'),
    },
    onSelectedNodes: {
      control: false,
      table: {
        type: { summary: '(selectedIds?: string[], selectedNodes?: TreeNodeProps<T>[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드가 선택 시 호출되는 콜백 함수입니다.',
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
        '노드의 상태가 확장/축소 변화될 경우 호출되는 콜백 함수입니다.',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('\n'),
    },
    onDisabledNodes: {
      control: false,
      table: {
        type: { summary: '(disabledIds?: string[], disabledNodes?: TreeNodeProps<T>[]) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        '노드의 상태가 비활성화 될 시 호출되는 콜백 함수입니다.',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('\n'),
    },
    onTreeViewState: {
      control: false,
      table: {
        type: { summary: '(state: TreeViewStateType) => void' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        'TreeView 컴포넌트에서 노드의 상태(선택/확장/비활성화)가 변화될 시 호출되는 콜백 함수입니다.',
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
    treeViewRef: {
      control: false,
      table: {
        type: { summary: 'React.Ref<TreeViewStateType>' },
        defaultValue: { summary: 'undefined' },
      },
      description: [
        'TreeView의 현재 상태를 외부에서 참조할 수 있도록 하는 Ref 객체입니다.',
        '부모 컴포넌트에서 트리의 선택/확장/비활성화 등 전체 상태를 실시간으로 조회하거나, 상태 기반 액션에 활용할 수 있습니다.',
        '예: 버튼 클릭 시 treeViewRef.current로 트리 상태 확인',
        'Storybook 에서는 직접 제어하지 않으므로 control을 비활성화합니다.',
      ].join('\n'),
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'TreeView 컴포넌트는 계층적/트리 구조 데이터를 시각적으로 탐색하거나 관리할 수 있도록 도와는 UI 요소입니다.',
          '폴더, 조직도, 네비게이션, 분류, 설정 트리 등 다양한 곳에 활용할 수 있습니다.',
          '트리 노드 데이터는 `id`, `name`속성이 필수이며, 필요시  `children`(재귀) 를 이용하여 확장 필드를 사용할 수 있습니다.',
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
  render: (args) => (
    <div key={JSON.stringify(args)}>
      <TreeView {...args} />
    </div>
  ),
};

export const Variants: Story = {
  args: {
    treeData: fileTypeTreeData,
    showLineLevel: 0,
  },
  argTypes: {
    variant: { table: { disable: true } },
    treeData: { table: { disable: true } },
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
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
    <div
      className={cn(flexRow, 'items-start justify-center flex-wrap gap-10 w-screen py-25 text-juiText-primary')}
      key={JSON.stringify(args)}>
      {variantOptions.map((variant) => (
        <div key={variant} className={cn(flexCol, 'w-100')}>
          <div className={'flex flex-col gap-1'}>
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
    treeData: sampleTreeData1,
    showLineLevel: 0,
  },
  argTypes: {
    size: { table: { disable: true } },
    treeData: { table: { disable: true } },
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: ['여러 size 옵션별 TreeView 결과를 확인할 수 있는 예시입니다.'].join('\n'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, 'items-center justify-center')} key={JSON.stringify(args)}>
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
  const treeViewRef = useRef<TreeViewStateType>(null);
  const [lastAction, setLastAction] = useState<string>('');
  const [treeState, setTreeState] = useState<TreeViewStateType | null>(null);

  return (
    <div className={cn(flexCol, 'items-center justify-center size-full')} key={JSON.stringify(args)}>
      <h3 className="text-lg font-semibold">비제어 (Uncontrolled)</h3>
      <div className={cn(flexRow, 'relative items-start justify-center gap-6 size-full')}>
        <div className={cn(flexCol, 'gap-4 flex-1 text-xs')}>
          <h2 className={'[&_b]:text-juiText-blue'}>
            {`선택에 대한 부분을 확인하기 위하여 현재 `}
            <br />
            multiSelect 는 <b>{`${args.multiSelect}`}</b> 로,
            <br />
            leafOnlySelect 는, <b>{`${args.leafOnlySelect}`}</b> 로 고정되어 있습니다.
          </h2>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>초기 defaultSelectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultSelectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 defaultExpandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultExpandedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 defaultDisabledIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultDisabledIds)}</span>
          </p>
          <div className={cn(flexRow)}>
            <pre className={'text-xs py-4 whitespace-pre-wrap'}>
              {treeState
                ? `현재 TreeView 상태 정보:
- 제어 모드 여부: ${args?.selectedIds ? 'Controlled' : 'Uncontrolled'} (선택) / ${args?.expandedIds ? 'Controlled' : 'Uncontrolled'} (확장) / ${args?.disabled || args?.disabledIds ? 'Controlled' : 'Uncontrolled'} (비활성화) 
- 전체 노드: ${treeState?.totalNodes || 0}개
- 선택된 노드: ${treeState?.selectedCount || 0}개 [${Array.from(treeState?.selectedIds).join(', ') || '없음'}]
- 확장된 노드: ${treeState?.expandedCount || 0}개 [${Array.from(treeState?.expandedIds).join(', ') || '없음'}]
- 비활성화된 노드: ${treeState?.disabledCount || 0}개 [${Array.from(treeState?.disabledIds).join(', ') || '없음'}]
- 마지막 선택 노드(리프 노드 기준): ${treeState?.lastSelectedId || '없음'}`
                : `아직 TreeView 상태 정보 없음.`}
            </pre>
          </div>
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
              onTreeViewState={(state) => {
                setTreeState(state);
                treeViewRef.current = state;
              }}
              onSelectedNodes={(selectedIds) =>
                setLastAction(`선택 변경: ${selectedIds?.length || 0}개 노드 [${selectedIds?.join(', ') || '없음'}]`)
              }
              onToggledNodes={(expandedIds) =>
                setLastAction(`확장 변경: ${expandedIds?.length || 0}개 노드 [${expandedIds?.join(', ') || '없음'}]`)
              }
              onDisabledNodes={(disabledIds) =>
                setLastAction(
                  `비활성화 변경: ${disabledIds?.length || 0}개 노드 [${disabledIds?.join(', ') || '없음'}]`,
                )
              }
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
    defaultDisabledIds: ['H108-1', 'H107'],
  },
  argTypes: {
    treeData: { table: { disable: true } },
    multiSelect: { table: { disable: true } },
    leafOnlySelect: { table: { disable: true } },
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`defaultSelectedIds`와 `defaultExpandedIds`,`defaultDisabledIds` 를 통해 초기값을 이용한 TreeView 컴포넌트의 비제어(Uncontrolled) 예시입니다.',
          '비제어 모드에서는 TreeView 컴포넌트가 선택 및 확장 상태를 자체적으로 관리합니다.',
          '기본 선택과 확장 상태는 `defaultSelectedIds`와 `defaultExpandedIds`, `defaultDisabledIds` 를 통해 초기값을 설정할 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args) => {
    return <UncontrolledExample {...args} />;
  },
};

function ControlledExample({ ...args }: TreeViewProps) {
  const treeViewRef = useRef<TreeViewStateType>(null);
  const [disabled, setDisabled] = useState<boolean>(args?.disabled || false);
  const [selectedIds, setSelectedIds] = useState<string[]>(args.selectedIds ?? []);
  const [expandedIds, setExpandedIds] = useState<string[]>(args.expandedIds ?? []);
  const [disabledIds, setDisabledIds] = useState<string[]>(args?.disabledIds || []);
  const [treeState, setTreeState] = useState<TreeViewStateType | null>(null);
  const [lastAction, setLastAction] = useState<string>('');
  const flatTreeNodeMap = flattenTree(args?.treeData || []);
  const allKeys = getAllNodeIds(args?.treeData || []);
  const allParentKeys = [...flatTreeNodeMap.values()].filter((k) => !isLeafNode(k)).map((d) => d.id);
  const tmpSelect = ['H112', 'H205-2'];
  const tmpExpand = ['H108', 'H205'];
  const tmpDisable = ['H205-1', 'H202', 'H108-3'];

  return (
    <div className={cn(flexCol, 'items-center justify-center size-full')} key={JSON.stringify(args)}>
      <h3 className="text-lg font-semibold">제어 (Controlled)</h3>
      <div className={cn(flexRow, 'relative items-start justify-center gap-6 size-full')}>
        <div className={cn(flexCol, 'gap-4 flex-1 text-xs max-w-1/2')}>
          <h2 className={'[&_b]:text-juiText-blue'}>
            {`선택에 대한 부분을 확인하기 위하여 현재 `}
            <br />
            multiSelect 는 <b>{`${args.multiSelect}`}</b> 로,
            <br />
            leafOnlySelect 는, <b>{`${args.leafOnlySelect}`}</b> 로 고정되어 있습니다.
          </h2>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>초기 defaultSelectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultSelectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 defaultExpandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultExpandedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 defaultDisabledIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.defaultDisabledIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'w-max'}>초기 selectedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.selectedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 expandedIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.expandedIds)}</span>
          </p>
          <p className={cn(flexRow, 'gap-2 w-max')}>
            <span className={'x-max'}>초기 disabledIds :</span>
            <span className={cn(blueTxt)}>{JSON.stringify(args.disabledIds)}</span>
          </p>
          <div className={cn(flexRow, 'w-full')}>
            <pre className={'text-xs py-4 whitespace-pre-wrap'}>
              {treeState
                ? `현재 TreeView 상태 정보:
- 제어 모드 여부: ${args?.selectedIds ? 'Controlled' : 'Uncontrolled'} (선택) / ${args?.expandedIds ? 'Controlled' : 'Uncontrolled'} (확장) / ${args?.disabled || args?.disabledIds ? 'Controlled' : 'Uncontrolled'} (비활성화) 
- 전체 노드: ${treeState?.totalNodes || 0}개
- 선택된 노드: ${treeState?.selectedCount || 0}개 [${Array.from(treeState?.selectedIds).join(', ') || '없음'}]
- 확장된 노드: ${treeState?.expandedCount || 0}개 [${Array.from(treeState?.expandedIds).join(', ') || '없음'}]
- 비활성화된 노드: ${treeState?.disabledCount || 0}개 [${Array.from(treeState?.disabledIds).join(', ') || '없음'}]
- 마지막 선택 노드(리프 노드 기준): ${treeState?.lastSelectedId || '없음'}`
                : `아직 TreeView 상태 정보 없음.`}
            </pre>
          </div>
          <p className={'flex flex-wrap gap-2'}>
            <Button
              variant={'default'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setDisabled((prev) => !prev);
              }}>
              TreeView 컴포넌트 전체를 {`${disabled ? '활성화' : '비활성화'}`} 하기
            </Button>
          </p>
          <p className={'flex flex-wrap gap-2'}>
            <Button
              variant={'secondary'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isAllSelected = selectedIds?.length === allKeys.length;

                setSelectedIds(isAllSelected ? [] : allKeys);
              }}>
              모든 노드 {`${selectedIds?.length === allKeys.length ? '선택 해제 ' : '선택'}`} 하기
            </Button>
            <Button
              variant={'secondary'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isAllExpanded = expandedIds?.length === allParentKeys.length;

                setExpandedIds(isAllExpanded ? [] : allParentKeys);
              }}>
              모든 노드 {`${expandedIds?.length === allParentKeys.length ? '축소' : '확장'}`}하기
            </Button>
            <Button
              variant={'secondary'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isAllDisabled = disabledIds?.length === allKeys.length;

                setDisabledIds(isAllDisabled ? [] : allKeys);
              }}>
              모든 노드 {`${disabledIds?.length === allKeys.length ? '활성화' : '비활성화'}`}하기
            </Button>
          </p>
          <p className={'flex flex-wrap gap-2'}>
            <Button
              variant={'gradient'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isSelected = selectedIds.some((d) => tmpSelect.includes(d));

                setSelectedIds(
                  isSelected ? selectedIds.filter((d) => !tmpSelect.includes(d)) : [...selectedIds, ...tmpSelect],
                );
              }}>{`임의의 노드 [${tmpSelect.join(', ')}] 를 ${selectedIds.some((d) => tmpSelect.includes(d)) ? '선택 해제' : '선택'}하기`}</Button>
            <Button
              variant={'gradient'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isOpen = expandedIds.some((d) => tmpExpand.includes(d));

                setExpandedIds(
                  isOpen ? expandedIds.filter((d) => !tmpExpand.includes(d)) : [...expandedIds, ...tmpExpand],
                );
              }}>{`임의의 노드 [${tmpExpand.join(', ')}] 를 ${expandedIds.some((d) => tmpExpand.includes(d)) ? '축소' : '확장'}하기`}</Button>
            <Button
              variant={'gradient'}
              size={'small'}
              className={'text-xs'}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();

                const isDisabled = disabledIds.some((d) => tmpDisable.includes(d));

                setDisabledIds(
                  isDisabled ? disabledIds.filter((d) => !tmpDisable.includes(d)) : [...disabledIds, ...tmpDisable],
                );
              }}>{`임의의 노드 [${tmpDisable.join(', ')}] 를 ${disabledIds.some((d) => tmpDisable.includes(d)) ? '활성화' : '비활성화'}하기`}</Button>
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
              disabled={disabled}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              disabledIds={disabledIds}
              onSelectedNodes={(ids) => {
                setSelectedIds(ids ?? []);
                setLastAction(`선택 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
              onToggledNodes={(ids) => {
                setExpandedIds(ids ?? []);
                setLastAction(`확장 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
              onDisabledNodes={(ids) => {
                setDisabledIds(ids ?? []);
                setLastAction(`비활성화 변경: ${ids?.length || 0}개 노드 [${ids?.join(', ') || '없음'}]`);
              }}
              onTreeViewState={setTreeState}
              treeViewRef={treeViewRef}
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
    selectedIds: ['H201-1', 'H203'],
    defaultExpandedIds: ['H100'],
    expandedIds: ['H200', 'H201'],
    defaultDisabledIds: ['H202'],
    disabledIds: ['H204', 'H205-3'],
    multiSelect: true,
    leafOnlySelect: true,
    showLineLevel: 0,
  },
  argTypes: {
    treeData: { table: { disable: true } },
    multiSelect: { table: { disable: true } },
    leafOnlySelect: { table: { disable: true } },
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '`selectedIds`와 `expandedIds`, `disabledIds` 를 통해 외부에서 상태를 제어하는 TreeView 컴포넌트의 제어(Controlled) 예시입니다.',
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

const defaultIconArr = [
  <EyeOffIcon key={'EyeOffIcon'} />,
  <AlertTriangleFilledIcon key={'AlertTriangleFilledIcon'} />,
  <LogInIcon key={'LogInIcon'} />,
];
const expandedIconArr = [
  <EyeIcon key={'EyeIcon'} />,
  <AlertTriangleIcon key={'AlertTriangleIcon'} />,
  <LogOutIcon key={'LogOutIcon'} />,
];
const endIconArr = [
  <UserFilledIcon key={'UserFilledIcon'} />,
  <MailIcon key={'MailIcon'} />,
  <ShieldIcon key={'ShieldIcon'} />,
];

export const IconAndLine: Story = {
  name: 'Icon/Line Overview',
  args: {
    treeData: responseStatusTreeData,
    defaultIcon: defaultIconArr[0],
    expandedIcon: expandedIconArr[0],
    endIcon: endIconArr[0],
    showLineLevel: 0,
    isAllLine: true,
  },
  argTypes: {
    treeData: { table: { disable: true } },
    showLineLevel: { table: { disable: true } },
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: [
          '다양한 커스텀 된 iconMap의 예시들과, showLineLevel 의 예시를 확인할 수 있습니다.',
          '또한 control 에서 isAllLine을 조절해서 선의 여부 차이도 확인해 보실 수 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: (args) => (
    <div className={cn(flexCol, 'items-start justify-center size-full')} key={JSON.stringify(args)}>
      <div className={cn(flexRow, 'items-start gap-6 w-full')}>
        {Array.from({ length: 3 }, (_, idx) => (
          <div
            key={idx}
            className={cn(flexCol, 'min-w-1/3 h-100 overflow-y-auto p-2 border border-juiText-primary rounded-md')}>
            <div>
              <div className={blueTxt}>
                <pre className={'w-full text-xs py-4 whitespace-pre-line'}>
                  {`지정된 아이콘 정보 :
defaultIcon: ${defaultIconArr[idx].key}
    expandedIcon: ${expandedIconArr[idx].key}
    endIcon: ${endIconArr[idx].key}`}
                </pre>
              </div>
              <p className={blueTxt}>showLineLevel : {idx}</p>
              <p className={blueTxt}>isAllLine : {`${args.isAllLine}`}</p>
            </div>
            <TreeView
              {...args}
              showLineLevel={idx}
              defaultIcon={defaultIconArr[idx]}
              expandedIcon={expandedIconArr[idx]}
              endIcon={endIconArr[idx]}
            />
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
    <div className={cn(flexCol, 'gap-6 w-full text-juiText-primary')}>
      <h3 className={''}>Leaf Only Selection (multiSelect + leafOnlySelect)</h3>
      <p className={''}>multiSelect와 leafOnlySelect의 모든 조합별 TreeView 동작을 한 번에 비교할 수 있습니다.</p>
      <div className={cn(flexRow, 'gap-6 flex-wrap items-start justify-center w-fit')}>
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
    defaultIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    defaultSelectedIds: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    defaultExpandedIds: { table: { disable: true } },
    expandedIds: { table: { disable: true } },
    defaultDisabledIds: { table: { disable: true } },
    disabledIds: { table: { disable: true } },
    onSelectedNodes: { table: { disable: true } },
    onToggledNodes: { table: { disable: true } },
    onDisabledNodes: { table: { disable: true } },
    onTreeViewState: { table: { disable: true } },
    treeViewRef: { table: { disable: true } },
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

// 내부 검색 vs 외부 API 검색 시뮬레이션
function DemoForInternalVsExternal() {
  const [externalSearchQuery, setExternalSearchQuery] = useState('');
  const [externalTreeData, setExternalTreeData] = useState<AssetTreeNodeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'internal' | 'external'>('internal');

  // 시뮬레이션용 대용량 내부 데이터
  const internalTreeData = sampleTreeData1;

  // 외부 API 검색 시뮬레이션
  const simulateExternalSearch = async (query: string) => {
    setIsLoading(true);

    // API 호출 시뮬레이션 (실제로는 fetch 호출)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 검색 결과 시뮬레이션
    const mockApiResults = assetDivisionTreeData || [];

    setExternalTreeData(query ? mockApiResults : []);
    setIsLoading(false);
  };

  const handleExternalSearch = (value: string) => {
    setExternalSearchQuery(value);

    if (value.trim()) {
      simulateExternalSearch(value);
    } else {
      setExternalTreeData([]);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">내부 검색 vs 외부 API 검색</h2>

      {/* 모드 선택 */}
      <div className="flex gap-4 p-4 bg-juiGrey-a700/40 rounded-lg">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="internal"
            checked={searchMode === 'internal'}
            onChange={(e) => setSearchMode(e.target.value as 'internal')}
          />
          내부 검색 (클라이언트 필터링)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="external"
            checked={searchMode === 'external'}
            onChange={(e) => setSearchMode(e.target.value as 'external')}
          />
          외부 검색 (API 호출)
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 내부 검색 */}
        <div className={`border p-4 rounded-lg ${searchMode === 'internal' ? 'ring-2 ring-blue-200' : 'opacity-50'}`}>
          <h3 className="font-semibold mb-4 text-juiText-blue">내부 검색 (클라이언트 필터링)</h3>
          <div className="mb-4 p-3 bg-juiText-primary rounded text-sm">
            <strong>특징:</strong>
            <br />
            • 모든 데이터가 미리 로드됨
            <br />
            • 실시간 필터링 (디바운싱)
            <br />
            • 빠른 응답 속도
            <br />• 네트워크 요청 없음
          </div>

          {searchMode === 'internal' && (
            <TreeView
              treeData={internalTreeData}
              searchEnabled={true}
              searchPlaceholder="내부 데이터 검색..."
              onSearchChange={(value) => {
                console.warn('내부 검색:', value);
              }}
              size="basic"
            />
          )}
        </div>

        {/* 외부 API 검색 */}
        <div className={`border p-4 rounded-lg ${searchMode === 'external' ? 'ring-2 ring-green-200' : 'opacity-50'}`}>
          <h3 className="font-semibold mb-4 text-juiStatus-complete">외부 API 검색</h3>
          <div className="mb-4 p-3 bg-juiGrey-a400 rounded text-sm">
            <strong>특징:</strong>
            <br />
            • 검색 시마다 API 호출
            <br />
            • 서버 측 검색 및 필터링
            <br />
            • 로딩 상태 표시
            <br />• 대용량 데이터 처리 가능
          </div>

          {searchMode === 'external' && (
            <div>
              {/* 외부 검색용 별도 입력창 */}
              <div className="mb-4">
                <TreeViewSearchInput
                  searchValue={externalSearchQuery}
                  onSearchChange={handleExternalSearch}
                  searchPlaceholder="외부 API 검색..."
                  disabled={isLoading}
                />

                {isLoading && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    API에서 검색 중...
                  </div>
                )}
              </div>

              {/* API 검색 결과 */}
              <div className="border rounded p-2 min-h-48">
                {externalTreeData.length > 0 ? (
                  <TreeView
                    treeData={externalTreeData}
                    searchEnabled={false} // 외부에서 이미 검색됨
                    size="basic"
                  />
                ) : externalSearchQuery && !isLoading ? (
                  <div className="text-center text-gray-500 py-8">
                    {externalSearchQuery} 에 대한 검색 결과가 없습니다.
                  </div>
                ) : !externalSearchQuery ? (
                  <div className="text-center text-gray-500 py-8">검색어를 입력하여 API에서 데이터를 가져오세요.</div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 성능 비교 */}
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-2">성능 및 사용성 비교</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-blue-600">내부 검색 장점:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>즉시 검색 결과 표시</li>
              <li>네트워크 비용 없음</li>
              <li>오프라인에서도 동작</li>
              <li>실시간 타이핑 피드백</li>
            </ul>
          </div>
          <div>
            <strong className="text-green-600">외부 검색 장점:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>대용량 데이터 처리</li>
              <li>서버 측 고급 검색 로직</li>
              <li>실시간 데이터 반영</li>
              <li>메모리 사용량 최적화</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SearchInternalVsExternal: Story = {
  name: 'Search: Internal vs External API',
  parameters: {
    docs: {
      description: {
        story: [
          'TreeView 컴포넌트내부 검색(클라이언트 필터링)과 외부 API 검색의 차이점을 비교할 수 있는 예시입니다.',
          '내부 검색은 즉시 응답, 네트워크 비용 없으나, 외부 검색의 경우 API 호출, 로딩 상태, 대용량 데이터 처리 가능하도록 고려하고 있습니다.',
        ].join('\n'),
      },
    },
  },
  render: () => <DemoForInternalVsExternal />,
};
//
// // TreeViewSearchInput 테스트 컴포넌트
// function SearchInputTest() {
//   const [controlledValue, setControlledValue] = useState('');
//   const [testResults, setTestResults] = useState<string[]>([]);
//
//   const addResult = (test: string, result: boolean) => {
//     setTestResults((prev) => [...prev, `${test}: ${result ? '✅ PASS' : '❌ FAIL'}`]);
//   };
//
//   return (
//     <div className="p-4 space-y-4">
//       <h2 className="text-lg font-bold">TreeViewSearchInput 테스트</h2>
//
//       {/* Uncontrolled 모드 테스트 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">1. Uncontrolled 모드</h3>
//         <TreeViewSearchInput
//           defaultSearchValue="기본값"
//           onSearchChange={(value) => {
//             addResult('Uncontrolled onChange', value.length >= 0);
//           }}
//           searchPlaceholder="Uncontrolled 테스트"
//         />
//       </div>
//
//       {/* Controlled 모드 테스트 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">2. Controlled 모드</h3>
//         <TreeViewSearchInput
//           searchValue={controlledValue}
//           onSearchChange={setControlledValue}
//           searchPlaceholder="Controlled 테스트"
//         />
//         <p className="mt-2 text-sm">현재 값: {controlledValue}</p>
//       </div>
//
//       {/* Disabled 상태 테스트 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">3. Disabled 상태</h3>
//         <TreeViewSearchInput disabled={true} searchPlaceholder="비활성화됨" />
//       </div>
//
//       {/* 테스트 결과 */}
//       <div className="border p-4 rounded bg-gray-10">
//         <h3 className="font-semibold mb-2">테스트 결과</h3>
//         {testResults.map((result, index) => (
//           <div key={index} className="text-sm">
//             {result}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
//
// // useTreeSearch 훅 테스트 컴포넌트
// function SearchHookTest() {
//   const mockTreeData = [
//     {
//       id: '1',
//       name: 'Root Node',
//       children: [
//         { id: '1-1', name: 'Child 1' },
//         {
//           id: '1-2',
//           name: 'Child 2',
//           children: [{ id: '1-2-1', name: 'Grandchild 1' }],
//         },
//       ],
//     },
//     { id: '2', name: 'Second Root' },
//   ];
//
//   const { searchQuery, setSearchQuery, searchResults, filteredTreeData, searchResultCount, isSearching, clearSearch } =
//     useTreeSearch({ treeData: mockTreeData });
//
//   return (
//     <div className="p-4 space-y-4">
//       <h2 className="text-lg font-bold">useTreeSearch 훅 테스트</h2>
//
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">검색 제어</h3>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="검색어 입력"
//             className="border p-2 rounded flex-1"
//           />
//           <Button onClick={clearSearch} variant="default" size="small">
//             검색 해제
//           </Button>
//         </div>
//       </div>
//
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">검색 상태</h3>
//         <div className="space-y-1 text-sm">
//           <p>검색 중: {isSearching ? '✅' : '❌'}</p>
//           <p>검색어: {searchQuery}</p>
//           <p>결과 수: {searchResultCount}</p>
//         </div>
//       </div>
//
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">검색 결과</h3>
//         <div className="space-y-1 text-sm">
//           {searchResults.map((result, index) => (
//             <div key={index} className="ml-4">
//               • {result.node.name} (경로: {result.path.join(' > ')})
//             </div>
//           ))}
//         </div>
//       </div>
//
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">필터링된 트리 구조</h3>
//         <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
//           {JSON.stringify(filteredTreeData, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }
//
// // TreeView 통합 테스트 컴포넌트
// function SearchIntegrationTest() {
//   const testTreeData = [
//     {
//       id: 'folder-1',
//       name: 'Documents',
//       children: [
//         { id: 'file-1', name: 'resume.pdf' },
//         { id: 'file-2', name: 'cover-letter.docx' },
//       ],
//     },
//     {
//       id: 'folder-2',
//       name: 'Images',
//       children: [
//         { id: 'file-3', name: 'photo.jpg' },
//         { id: 'file-4', name: 'screenshot.png' },
//       ],
//     },
//     {
//       id: 'folder-3',
//       name: 'Projects',
//       children: [
//         { id: 'project-1', name: 'Website Design' },
//         { id: 'project-2', name: 'Mobile App' },
//       ],
//     },
//   ];
//
//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-lg font-bold">TreeView 검색 통합 테스트</h2>
//
//       {/* 검색 비활성화 상태 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">1. 검색 비활성화 (기존 기능 호환성)</h3>
//         <TreeView treeData={testTreeData} searchEnabled={false} size="basic" />
//       </div>
//
//       {/* 검색 활성화 상태 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">2. 검색 활성화</h3>
//         <TreeView
//           treeData={testTreeData}
//           searchEnabled={true}
//           searchPlaceholder="파일 검색..."
//           onSearchChange={(value) => {
//             console.warn('검색어 변경:', value);
//           }}
//           size="basic"
//         />
//       </div>
//
//       {/* Controlled 검색 상태 */}
//       <div className="border p-4 rounded">
//         <h3 className="font-semibold mb-2">3. Controlled 검색</h3>
//         <TreeView
//           treeData={testTreeData}
//           searchEnabled={true}
//           searchValue="pdf"
//           onSearchChange={(value) => {
//             console.warn('Controlled 검색:', value);
//           }}
//           size="basic"
//         />
//       </div>
//     </div>
//   );
// }
//
// export const SearchFunctionTest: Story = {
//   name: 'Search Function Test',
//   parameters: {
//     docs: {
//       description: {
//         story: [
//           'TreeView 검색 기능의 모든 컴포넌트와 훅을 종합 테스트할 수 있는 스토리입니다.',
//           '- TreeViewSearchInput 컴포넌트 테스트 (Controlled/Uncontrolled)',
//           '- useTreeSearch 훅 동작 테스트',
//           '- TreeView 통합 검색 기능 테스트',
//         ].join('\n'),
//       },
//     },
//   },
//   render: () => (
//     <div className="space-y-8 max-w-full">
//       <SearchInputTest />
//       <Separator orientation="horizontal" />
//       <SearchHookTest />
//       <Separator orientation="horizontal" />
//       <SearchIntegrationTest />
//     </div>
//   ),
// };
