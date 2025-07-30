/**
 * TreeView 컴포넌트의 타입 정의
 *
 * 이 파일은 다양한 API 엔드포인트에서 받아오는 트리 데이터 구조와 TreeView 컴포넌트에서 사용되는 모든 타입들을 정의합니다.
 *
 * 참고한 API 구조:
 * - 자산구분 목록 조회: /japi/get/asset/division/tree
 * - 고위험군 그룹 트리 조회: /japi/get/high-risk/groups/tree
 * - 대응상태 분류 트리 조회: /japi/get/response-status/tree
 */

/**
 * 기본 트리 노드 인터페이스
 * 모든 API 에서 공통으로 사용되는 필수 필드들을 정의
 */
export type BaseTreeNodeProps = {
  /** 트리 노드의 고유 식별자 */
  id: string;
  /** 트리 노드의 표시명 */
  name: string;
  /** 자식 노드들 (재귀적 구조) */
  children?: BaseTreeNodeProps[];
  /** 확장을 위한 인덱스 시그니처 */
  [key: string]: unknown;
};

/**
 * API 에서 받아오는 확장된 트리 노드 구조(데이터 전용으로 우선 고려함.)
 * 각 API별 특화 필드들을 선택적으로 포함
 */
export type TreeNodeProps<T = unknown> = BaseTreeNodeProps & {
  /** 오버라이드 */
  children?: TreeNodeProps<T>[];
};

// 자산구분 API 전용 필드들 - /japi/get/asset/division/tree
export type AssetTreeData = {
  /** 정렬 순서 */
  ord?: number;
  /** 자산구분 인덱스 */
  asstDvnIdx?: number;
  /** 부모 자산구분 코드 */
  passtDvnCd?: string;
  /** 자산구분명 전체 경로 */
  asstDvnNmFullPath?: string;
};

// 고위험군 관련 API 전용 필드들 - /japi/get/high-risk/groups/tree
export type HighRiskTreeData = {
  /** 정렬 순서 */
  ord?: number;
  /** 고위험군 그룹 인덱스 */
  hrskGrupIdx?: number;
  /** 부모 그룹 코드 */
  pgrupCd?: string | null;
  /** 기준 종료일 표준 */
  baseEndDtStd?: string | null;
};

// 대응상태 API 전용 필드들 - /japi/get/response-status/tree
export type ResponseStatusTreeData = {
  /** 트리 레벨 */
  lvl?: number;
  /** 대응상태 구분 인덱스 */
  rsstIdx?: number;
  /** 부모  코드 */
  pId?: string | null;
};

// === API별 특화 노드 타입들 ===
export type AssetTreeNodeProps = TreeNodeProps<AssetTreeData>;
export type HighRiskTreeNodeProps = TreeNodeProps<HighRiskTreeData>;
export type ResponseStatusTreeNodeProps = TreeNodeProps<ResponseStatusTreeData>;
