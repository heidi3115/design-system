import { Button, Separator, TreeView, type TreeViewProps, type TreeViewStateType, treeViewVariants } from '@common/ui';
import { DEFAULT_INDENT_SIZE } from '@common/ui/components/TreeView/TreeView.tsx';
import { flattenTree, getAllNodeIds, isLeafNode } from '@common/ui/components/TreeView/utils';
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
import { cn } from '@common/ui/lib/utils.ts';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
  assetDivisionTreeData,
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
