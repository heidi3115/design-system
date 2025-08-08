import { type BaseTreeNodeProps } from '@common/ui';

/**
 * 이 파일은 다양한 API 엔드포인트에서 받아오는 트리 데이터 구조의 참조 및 추후 사용할 데이터 타입 정의입니다.
 *
 * 참고한 API 구조:
 * - 자산구분 목록 조회: /japi/get/asset/division/tree
 * - 고위험군 그룹 트리 조회: /japi/get/high-risk/groups/tree
 * - 대응상태 분류 트리 조회: /japi/get/response-status/tree
 *
 */

// 자산구분 API 전용 필드들 - /japi/get/asset/division/tree
export type AssetTreeDataType = {
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
export type HighRiskTreeDataType = {
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
export type ResponseStatusTreeDataType = {
  /** 트리 레벨 */
  lvl?: number;
  /** 대응상태 구분 인덱스 */
  rsstIdx?: number;
  /** 부모  코드 */
  pId?: string | null;
};

// === API별 특화 노드 타입들 ===
export type AssetTreeNodeProps = BaseTreeNodeProps<AssetTreeDataType>;
export type HighRiskTreeNodeProps = BaseTreeNodeProps<HighRiskTreeDataType>;
export type ResponseStatusTreeNodeProps = BaseTreeNodeProps<ResponseStatusTreeDataType>;

// 기본 트리 형식
export const basicTreeData1: BaseTreeNodeProps[] = [
  {
    id: '1-1',
    name: 'lvl:1-1',
    children: [
      {
        id: '1-1-1',
        name: 'lvl:1-1-1',
        children: [
          {
            id: '1-1-1-1',
            name: 'lvl:1-1-1-1',
          },
          {
            id: '1-1-1-2',
            name: 'lvl:1-1-1-2',
            children: [
              {
                id: '1-1-1-2-1',
                name: 'lvl:1-1-1-2-1',
                disabled: false,
              },
              {
                id: '1-1-1-2-2',
                name: 'lvl:1-1-1-2-2',
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: '1-1-2',
        name: 'lvl:2-2',
      },
    ],
  },
  {
    id: '1-2',
    name: 'lvl:1-2',
    children: [
      {
        id: '1-2-1',
        name: 'lvl:1-2-1',
      },
    ],
  },
  {
    id: '1-3',
    name: 'lvl:1-3',
    children: [
      {
        id: '1-3-1',
        name: 'lvl:1-3-1',
        children: [
          {
            id: '1-3-1-1',
            name: 'lvl:1-3-1-1',
            children: [
              {
                id: '1-3-1-1-1',
                name: 'lvl:1-3-1-1-1',
              },
              {
                id: '1-3-1-1-2',
                name: 'lvl:1-3-1-1-2',
              },
            ],
          },
          {
            id: '1-3-1-2',
            name: 'lvl:1-3-1-2',
          },
        ],
      },
      {
        id: '1-3-2',
        name: 'lvl:1-3-2',
      },
    ],
  },
  {
    id: '1-4',
    name: 'lvl:1-4',
    disabled: true,
  },
  {
    id: '1-5',
    name: 'lvl:1-5',
    children: [
      { id: '1-5-1', name: 'lvl:1-5-1' },
      { id: '1-5-2', name: 'lvl:1-5-2' },
    ],
    disabled: true,
  },
];

// 샘플 데이터1 : 자산 형식
export const sampleTreeData1: BaseTreeNodeProps[] = [
  {
    id: '1',
    name: '자산구분 1',
    asstDvnIdx: 1,
    passtDvnCd: 'A1',
    asstDvnNmFullPath: '자산구분 1',
    ord: 1,
    children: [
      {
        id: '1-1',
        name: '자산구분 1-1',
        asstDvnIdx: 11,
        passtDvnCd: 'A11',
        asstDvnNmFullPath: '자산구분 1/자산구분 1-1',
        ord: 1,
        children: [
          {
            id: '1-1-1',
            name: '자산구분 1-1-1',
            asstDvnIdx: 111,
            passtDvnCd: 'A111',
            asstDvnNmFullPath: '자산구분 1/자산구분 1-1/자산구분 1-1-1',
            ord: 1,
          },
          {
            id: '1-1-2',
            name: '자산구분 1-1-2',
            asstDvnIdx: 112,
            passtDvnCd: 'A112',
            asstDvnNmFullPath: '자산구분 1/자산구분 1-1/자산구분 1-1-2',
            ord: 1,
            children: [],
          },
          {
            id: '1-1-3',
            name: '자산구분 1-1-3',
            asstDvnIdx: 113,
            passtDvnCd: 'A113',
            asstDvnNmFullPath: '자산구분 1/자산구분 1-1/자산구분 1-1-3',
            ord: 1,
            children: [
              {
                id: '1-1-3-1',
                name: '자산구분 1-1-3-1',
                ord: 2,
              },
              {
                id: '1-1-3-2',
                name: '자산구분 1-1-3-2',
                ord: 1,
              },
              {
                id: '1-1-3-3',
                name: '자산구분 1-1-3-3',
                children: [
                  {
                    id: '1-1-3-3-1',
                    name: '자산구분 1-1-3-3-1',
                  },
                  {
                    id: '1-1-3-3-2',
                    name: '자산구분 1-1-3-3-2',
                  },
                ],
              },
              {
                id: '1-1-3-4',
                name: '자산구분 1-1-3-4 -> disabled',
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: '1-2',
        name: '자산구분 1-2',
        asstDvnIdx: 12,
        passtDvnCd: 'A12',
        asstDvnNmFullPath: '자산구분 1/자산구분 1-2',
        ord: 2,
      },
    ],
  },
  {
    id: '2',
    name: '고위험군 그룹 1',
    hrskGrupIdx: 1,
    pgrupCd: null,
    ord: 1,
    baseEndDtStd: null,
    children: [
      {
        id: '2-1',
        name: '고위험군 그룹 1-1',
        hrskGrupIdx: 11,
        pgrupCd: '2',
        ord: 1,
        baseEndDtStd: '2025-12-31',
      },
      {
        id: '2-2',
        name: '고위험군 그룹 1-2',
        hrskGrupIdx: 12,
        pgrupCd: '2',
        ord: 2,
        baseEndDtStd: '2025-12-31',
        disabled: true,
        children: [
          {
            id: '2-2-1',
            name: '고위험군 그룹 1-2-1 -> disabled parent',
          },
          {
            id: '2-2-2',
            name: '고위험군 그룹 1-2-2 -> disabled parent',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '대응상태 분류 1',
    children: [
      {
        id: '3-1',
        name: '대응상태 분류 1-1=ord:4',
        ord: 4,
      },
      {
        id: '3-2',
        name: '대응상태 분류 1-2=ord:6',
        ord: 6,
      },
      {
        id: '3-3',
        name: '대응상태 분류 1-3=ord:5',
        ord: 5,
        children: [
          {
            id: '3-3-1',
            name: '대응상태 분류 1-3-1',
            children: [
              {
                id: '3-3-1-1',
                name: '대응상태 분류 1-3-1-1',
              },
              {
                id: '3-3-1-2',
                name: '대응상태 분류 1-3-1-2',
              },
            ],
          },
          {
            id: '3-3-2',
            name: '대응상태 분류 1-3-2',
          },
          {
            id: '3-3-3',
            name: '대응상태 분류 1-3-3',
            children: [],
          },
        ],
      },
      {
        id: '3-4',
        name: '대응상태 분류 1-4=ord:1',
        ord: 1,
      },
      {
        id: '3-5',
        name: '대응상태 분류 1-5=ord:2',
        ord: 2,
        disabled: true,
        children: [
          {
            id: '3-5-1',
            name: '대응상태 분류 1-5-1 parent disabled',
          },
          {
            id: '3-5-2',
            name: '대응상태 분류 1-5-2 parent disabled',
          },
        ],
      },
      {
        id: '3-6',
        name: '대응상태 분류 1-6=ord:3',
        ord: 3,
        disabled: true,
      },
    ],
  },
];

// 자산구분 목록 조회: /japi/get/asset/division/tree
export const assetDivisionTreeData: AssetTreeNodeProps[] = [
  {
    asstDvnIdx: 35,
    passtDvnCd: '',
    asstDvnNmFullPath: '기타',
    ord: 6,
    id: 'ETC',
    name: '기타',
    children: [
      {
        asstDvnIdx: 37,
        passtDvnCd: 'ETC',
        asstDvnNmFullPath: '기타>CI/CD',
        ord: 2,
        id: 'CICD',
        name: 'CI/CD',
      },
      {
        asstDvnIdx: 38,
        passtDvnCd: 'ETC',
        asstDvnNmFullPath: '기타>PC',
        ord: 3,
        id: 'PC',
        name: 'PC',
      },
      {
        asstDvnIdx: 36,
        passtDvnCd: 'ETC',
        asstDvnNmFullPath: '기타>저장소',
        ord: 1,
        id: 'REPOSITORY',
        name: '저장소',
      },
    ],
  },
  {
    asstDvnIdx: 9,
    passtDvnCd: '',
    asstDvnNmFullPath: '네트워크',
    ord: 2,
    id: 'NETWORK',
    name: '네트워크',
    children: [
      {
        asstDvnIdx: 21,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>가상 데스크톱 인프라',
        ord: 12,
        id: 'VDI',
        name: '가상 데스크톱 인프라',
      },
      {
        asstDvnIdx: 20,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>가상 사설망',
        ord: 11,
        id: 'VPN',
        name: '가상 사설망',
      },
      {
        asstDvnIdx: 15,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>네트워크 접근 제어',
        ord: 6,
        id: 'NAC',
        name: '네트워크 접근 제어',
      },
      {
        asstDvnIdx: 14,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>디도스 방어',
        ord: 5,
        id: 'DDOS',
        name: '디도스 방어',
      },
      {
        asstDvnIdx: 22,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>무선 침입 방지 시스템',
        ord: 13,
        id: 'WIPS',
        name: '무선 침입 방지 시스템',
      },
      {
        asstDvnIdx: 10,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>방화벽',
        ord: 1,
        id: 'FW',
        name: '방화벽',
        children: [
          {
            asstDvnIdx: 11,
            passtDvnCd: 'FW',
            asstDvnNmFullPath: '네트워크>방화벽>차세대 방화벽/통합 위협 관리',
            ord: 2,
            id: 'UTM',
            name: '차세대 방화벽/통합 위협 관리',
            children: [
              {
                asstDvnIdx: 12,
                passtDvnCd: 'UTM',
                asstDvnNmFullPath: '네트워크>방화벽>차세대 방화벽/통합 위협 관리>웹 어플리케이션 방화벽',
                ord: 3,
                id: 'WAF',
                name: '웹 어플리케이션 방화벽',
                children: [
                  {
                    asstDvnIdx: 13,
                    passtDvnCd: 'WAF',
                    asstDvnNmFullPath: '네트워크>방화벽>차세대 방화벽/통합 위협 관리>웹 어플리케이션 방화벽>프록시',
                    ord: 4,
                    id: 'PROXY',
                    name: '프록시',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        asstDvnIdx: 23,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>웹 보안',
        ord: 14,
        id: 'SWG',
        name: '웹 보안',
      },
      {
        asstDvnIdx: 19,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>위협 정보 관리',
        ord: 10,
        id: 'TI',
        name: '위협 정보 관리',
      },
      {
        asstDvnIdx: 18,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>지능형 지속 위협 대응',
        ord: 9,
        id: 'APT',
        name: '지능형 지속 위협 대응',
      },
      {
        asstDvnIdx: 17,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>침입 방지 시스템',
        ord: 8,
        id: 'IPS',
        name: '침입 방지 시스템',
      },
      {
        asstDvnIdx: 16,
        passtDvnCd: 'NETWORK',
        asstDvnNmFullPath: '네트워크>침입 탐지 시스템',
        ord: 7,
        id: 'IDS',
        name: '침입 탐지 시스템',
      },
    ],
  },
  {
    asstDvnIdx: 1,
    passtDvnCd: '',
    asstDvnNmFullPath: '데이터',
    ord: 1,
    id: 'DATA',
    name: '데이터',
    children: [
      {
        asstDvnIdx: 2,
        passtDvnCd: 'DATA',
        asstDvnNmFullPath: '데이터>데이터 유출 방지',
        ord: 1,
        id: 'DLP',
        name: '데이터 유출 방지',
        children: [
          {
            asstDvnIdx: 3,
            passtDvnCd: 'DLP',
            asstDvnNmFullPath: '데이터>데이터 유출 방지>디지털 저작권 관리',
            ord: 2,
            id: 'DRM',
            name: '디지털 저작권 관리',
            children: [
              {
                asstDvnIdx: 4,
                passtDvnCd: 'DRM',
                asstDvnNmFullPath: '데이터>데이터 유출 방지>디지털 저작권 관리>엔드 포인트 탐지 및 대응',
                ord: 3,
                id: 'EDR',
                name: '엔드 포인트 탐지 및 대응',
                children: [
                  {
                    asstDvnIdx: 5,
                    passtDvnCd: 'EDR',
                    asstDvnNmFullPath:
                      '데이터>데이터 유출 방지>디지털 저작권 관리>엔드 포인트 탐지 및 대응>출력물 보안',
                    ord: 4,
                    id: 'PSM',
                    name: '출력물 보안',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        asstDvnIdx: 7,
        passtDvnCd: 'DATA',
        asstDvnNmFullPath: '데이터>백신',
        ord: 6,
        id: 'ANTIVIRUS',
        name: '백신',
      },
      {
        asstDvnIdx: 8,
        passtDvnCd: 'DATA',
        asstDvnNmFullPath: '데이터>스팸 차단',
        ord: 7,
        id: 'ANTISPAM',
        name: '스팸 차단',
      },
      {
        asstDvnIdx: 6,
        passtDvnCd: 'DATA',
        asstDvnNmFullPath: '데이터>전자 문서 관리',
        ord: 5,
        id: 'EDM',
        name: '전자 문서 관리',
      },
      {
        asstDvnIdx: 39,
        passtDvnCd: 'DATA',
        asstDvnNmFullPath: '데이터>제이로그',
        ord: 8,
        id: 'jlog',
        name: '제이로그',
      },
    ],
  },
  {
    asstDvnIdx: 29,
    passtDvnCd: '',
    asstDvnNmFullPath: '데이터베이스',
    ord: 4,
    id: 'DB',
    name: '데이터베이스',
    children: [
      {
        asstDvnIdx: 31,
        passtDvnCd: 'DB',
        asstDvnNmFullPath: '데이터베이스>NOSQL',
        ord: 2,
        id: 'NOSQL',
        name: 'NOSQL',
      },
      {
        asstDvnIdx: 30,
        passtDvnCd: 'DB',
        asstDvnNmFullPath: '데이터베이스>RDBMS',
        ord: 1,
        id: 'RDBMS',
        name: 'RDBMS',
      },
    ],
  },
  {
    asstDvnIdx: 32,
    passtDvnCd: '',
    asstDvnNmFullPath: '어플리케이션',
    ord: 5,
    id: 'AP',
    name: '어플리케이션',
    children: [
      {
        asstDvnIdx: 34,
        passtDvnCd: 'AP',
        asstDvnNmFullPath: '어플리케이션>WAS',
        ord: 2,
        id: 'WAS',
        name: 'WAS',
      },
      {
        asstDvnIdx: 33,
        passtDvnCd: 'AP',
        asstDvnNmFullPath: '어플리케이션>WEB',
        ord: 1,
        id: 'WEB',
        name: 'WEB',
      },
    ],
  },
  {
    asstDvnIdx: 24,
    passtDvnCd: '',
    asstDvnNmFullPath: '제어 관리',
    ord: 3,
    id: 'CONTROL',
    name: '제어 관리',
    children: [
      {
        asstDvnIdx: 26,
        passtDvnCd: 'CONTROL',
        asstDvnNmFullPath: '제어 관리>계정 관리',
        ord: 2,
        id: 'IM',
        name: '계정 관리',
      },
      {
        asstDvnIdx: 28,
        passtDvnCd: 'CONTROL',
        asstDvnNmFullPath: '제어 관리>보안 패치 관리',
        ord: 4,
        id: 'PMS',
        name: '보안 패치 관리',
      },
      {
        asstDvnIdx: 27,
        passtDvnCd: 'CONTROL',
        asstDvnNmFullPath: '제어 관리>접근 제어',
        ord: 3,
        id: 'AM',
        name: '접근 제어',
      },
      {
        asstDvnIdx: 25,
        passtDvnCd: 'CONTROL',
        asstDvnNmFullPath: '제어 관리>통합 계정 접근 관리',
        ord: 1,
        id: 'IAM',
        name: '통합 계정 접근 관리',
      },
    ],
  },
];

// 고위험군 그룹 트리 조회: /japi/get/high-risk/groups/tree
export const highriskGroupTreeData: HighRiskTreeNodeProps[] = [
  {
    hrskGrupIdx: 1,
    pgrupCd: null,
    ord: 0,
    baseEndDtStd: null,
    id: 'H100',
    name: '임직원 고위험군_id:H100',
    children: [
      {
        hrskGrupIdx: 2,
        pgrupCd: 'H100',
        ord: 0,
        baseEndDtStd: null,
        id: 'H101',
        name: 'BlackList_id:H101',
      },
      {
        hrskGrupIdx: 19,
        pgrupCd: 'H100',
        ord: 11,
        baseEndDtStd: '133001001',
        id: 'H112',
        name: 'QA1_기본자동점검일_id:H112',
      },
      {
        hrskGrupIdx: 15,
        pgrupCd: 'H100',
        ord: 7,
        baseEndDtStd: '133001003',
        id: 'H108',
        name: 'QA2_퇴직예정자_id:H108',
        children: [
          { hrskGrupIdx: 151, pgrupCd: 'H108', id: 'H108-1', name: 'QA2_퇴직예정자-child-1_id:H108-1' },
          { hrskGrupIdx: 152, pgrupCd: 'H108', id: 'H108-2', name: 'QA2_퇴직예정자-child-2_id:H108-2', disabled: true },
          { hrskGrupIdx: 153, pgrupCd: 'H108', id: 'H108-3', name: 'QA2_퇴직예정자-child-3_id:H108-3' },
        ],
      },
      {
        hrskGrupIdx: 16,
        pgrupCd: 'H100',
        ord: 8,
        baseEndDtStd: '133001002',
        id: 'H109',
        name: 'QA3_휴직예정자_id:H109',
        children: [
          { hrskGrupIdx: 161, pgrupCd: 'H109', id: 'H109-1', name: 'QA3_휴직예정자-child-1_id:H109-1' },
          {
            hrskGrupIdx: 162,
            pgrupCd: 'H109',
            id: 'H109-2',
            name: 'QA3_휴직예정자-child-2_id:H109-2',
            disabled: false,
            children: [
              {
                hrskGrupIdx: 1621,
                pgrupCd: 'H109-2',
                id: 'H109-2-1',
                name: 'QA3_휴직예정자-child-2-1_id:H109-2-1',
                children: [
                  {
                    hrskGrupIdx: 16211,
                    pgrupCd: 'H109-2-1',
                    id: 'H109-2-1-1',
                    name: 'QA3_휴직예정자-child-2-1-1_id:H109-2-1-1',
                  },
                  {
                    hrskGrupIdx: 16212,
                    pgrupCd: 'H109-2-1',
                    id: 'H109-2-1-2',
                    name: 'QA3_휴직예정자-child-2-1-2_id:H109-2-1-2',
                  },
                ],
              },
              { hrskGrupIdx: 1622, pgrupCd: 'H109-2', id: 'H109-2-2', name: 'QA3_휴직예정자-child-2-2_id:H109-2-2' },
            ],
          },
          { hrskGrupIdx: 163, pgrupCd: 'H109', id: 'H109-3', name: 'QA3_휴직예정자-child-3_id:H109-3', disabled: true },
        ],
      },
      {
        hrskGrupIdx: 32,
        pgrupCd: 'H100',
        ord: 24,
        baseEndDtStd: '133001003',
        id: 'H125',
        name: 'QA4_테스트_id:H125',
      },
      {
        hrskGrupIdx: 14,
        pgrupCd: 'H100',
        ord: 6,
        baseEndDtStd: null,
        id: 'H107',
        name: '교육용 그룹_id:H107',
      },
      {
        hrskGrupIdx: 6,
        pgrupCd: 'H100',
        ord: 4,
        baseEndDtStd: null,
        id: 'H105',
        name: '기타_id:H105',
      },
      {
        hrskGrupIdx: 24,
        pgrupCd: 'H100',
        ord: 16,
        baseEndDtStd: '133001001',
        id: 'H117',
        name: '삭제예정_id:H117',
        children: [
          {
            hrskGrupIdx: 241,
            pgrupCd: 'H117',
            ord: 161,
            baseEndDtStd: '133001001',
            id: 'H117-1',
            name: '삭제예정-child-1_id:H117-1',
          },
          {
            hrskGrupIdx: 242,
            pgrupCd: 'H117',
            ord: 160,
            baseEndDtStd: '133001001',
            id: 'H117-2',
            name: '삭제예정-child-2_id:H117-2',
          },
        ],
      },
      {
        hrskGrupIdx: 5,
        pgrupCd: 'H100',
        ord: 3,
        baseEndDtStd: '133001003',
        id: 'H104',
        name: '상시 개인정보 취급자_id:H104',
      },
      {
        hrskGrupIdx: 26,
        pgrupCd: 'H100',
        ord: 18,
        baseEndDtStd: '133001001',
        id: 'H119',
        name: '새 그룹_id:H119',
      },
      {
        hrskGrupIdx: 31,
        pgrupCd: 'H100',
        ord: 23,
        baseEndDtStd: null,
        id: 'H124',
        name: '새 그룹_test_id:H124',
      },
      {
        hrskGrupIdx: 4,
        pgrupCd: 'H100',
        ord: 2,
        baseEndDtStd: '133001002',
        id: 'H103',
        name: '예외권한자_id:H103',
      },
      {
        hrskGrupIdx: 23,
        pgrupCd: 'H100',
        ord: 15,
        baseEndDtStd: '133001001',
        id: 'H116',
        name: '자동점검 실패_id:H116',
      },
      {
        hrskGrupIdx: 3,
        pgrupCd: 'H100',
        ord: 1,
        baseEndDtStd: null,
        id: 'H102',
        name: '퇴직예정자_id:H102',
      },
      {
        hrskGrupIdx: 13,
        pgrupCd: 'H100',
        ord: 5,
        baseEndDtStd: '133001003',
        id: 'H106',
        name: '퇴직자_id:H106',
      },
    ],
  },
  {
    hrskGrupIdx: 7,
    pgrupCd: null,
    ord: 1,
    baseEndDtStd: null,
    id: 'H200',
    name: '자산 고위험군_id:H200',
    children: [
      {
        hrskGrupIdx: 8,
        pgrupCd: 'H200',
        ord: 0,
        baseEndDtStd: null,
        id: 'H201',
        name: 'CPU 과부하 장비그룹_id:H201',
        children: [
          {
            hrskGrupIdx: 81,
            pgrupCd: 'H201',
            ord: 2,
            baseEndDtStd: null,
            id: 'H201-1',
            name: 'CPU 과부하 장비그룹-child-1_id:H201-1',
          },
          {
            hrskGrupIdx: 82,
            pgrupCd: 'H201',
            ord: 1,
            baseEndDtStd: '133001001',
            id: 'H201-2',
            name: 'CPU 과부하 장비그룹-child-2_id:H201-2',
          },
        ],
      },
      {
        hrskGrupIdx: 9,
        pgrupCd: 'H200',
        ord: 1,
        baseEndDtStd: null,
        id: 'H202',
        name: 'DISK 용량과다 장비그룹_id:H202',
      },
      {
        hrskGrupIdx: 10,
        pgrupCd: 'H200',
        ord: 2,
        baseEndDtStd: null,
        id: 'H203',
        name: 'MEM 과사용 장비그룹_id:H203',
      },
      {
        hrskGrupIdx: 12,
        pgrupCd: 'H200',
        ord: 4,
        baseEndDtStd: null,
        id: 'H205',
        name: '기타_id:H205',
        children: [
          {
            hrskGrupIdx: 81,
            pgrupCd: 'H205',
            ord: 2,
            baseEndDtStd: '133001001',
            id: 'H205-1',
            name: '기타-child-1_id:H205-1',
          },
          {
            hrskGrupIdx: 82,
            pgrupCd: 'H205',
            ord: 1,
            baseEndDtStd: '133001001',
            id: 'H205-2',
            name: '기타-child-2_id:H205-2',
          },
          {
            hrskGrupIdx: 83,
            pgrupCd: 'H205',
            ord: 3,
            baseEndDtStd: '133001001',
            id: 'H205-3',
            name: '기타-child-3_id:H205-3',
          },
        ],
      },
      {
        hrskGrupIdx: 11,
        pgrupCd: 'H200',
        ord: 3,
        baseEndDtStd: null,
        id: 'H204',
        name: '서버 중단 장비그룹_id:H204',
        children: [],
      },
    ],
  },
];

// 대응상태 분류 트리 조회: /japi/get/response-status/tree
export const responseStatusTreeData: ResponseStatusTreeNodeProps[] = [
  {
    rsstIdx: 1,
    lvl: 1,
    id: '10000',
    name: '발견',
    pId: null,
  },
  {
    rsstIdx: 2,
    lvl: 1,
    id: '20000',
    name: '진행',
    pId: null,
  },
  {
    rsstIdx: 3,
    lvl: 1,
    id: '30000',
    name: '오탐',
    pId: null,
  },
  {
    rsstIdx: 33,
    lvl: 1,
    id: '70000',
    name: '에러',
    pId: null,
    disabled: true,
  },
  {
    rsstIdx: 4,
    lvl: 1,
    id: '40000',
    name: '이상없음',
    children: [
      {
        rsstIdx: 7,
        lvl: 2,
        id: '40001',
        name: '이상없음',
        pId: '40000',
        children: [
          {
            rsstIdx: 71,
            lvl: 3,
            id: '400011',
            name: '이상없음-1',
            pId: '400001',
            children: [
              {
                rsstIdx: 711,
                lvl: 4,
                id: '4000111',
                name: '이상없음-1-1',
                pId: '4000011',
              },
            ],
          },
          {
            rsstIdx: 72,
            lvl: 3,
            id: '400012',
            name: '이상없음',
            pId: '400001',
          },
        ],
      },
      {
        rsstIdx: 22,
        lvl: 2,
        id: '40005',
        name: '새분류 테스트 해주세요',
        pId: '40000',
        disabled: true,
      },
      {
        rsstIdx: 28,
        lvl: 2,
        id: '40006',
        name: '이상_테스트',
        pId: '40000',
      },
      {
        rsstIdx: 31,
        lvl: 2,
        id: '40007',
        name: '이상_테스트2',
        pId: '40000',
        disabled: true,
      },
      {
        rsstIdx: 32,
        lvl: 2,
        id: '40008',
        name: '이상_테스트3',
        pId: '40000',
        disabled: true,
        children: [],
      },
      {
        rsstIdx: 33,
        lvl: 2,
        id: '40009',
        name: '이상_테스트4',
        pId: '40000',
        disabled: false,
      },
    ],
    pId: null,
  },
  {
    rsstIdx: 5,
    lvl: 1,
    id: '50000',
    name: '정탐',
    children: [
      {
        rsstIdx: 8,
        lvl: 2,
        id: '50001',
        name: '단순이슈',
        pId: '50000',
        disabled: true,
      },
      {
        rsstIdx: 9,
        lvl: 2,
        id: '50002',
        name: '사고발생',
        pId: '50000',
      },
      {
        rsstIdx: 10,
        lvl: 2,
        id: '50003',
        name: '사전징후',
        pId: '50000',
      },
      {
        rsstIdx: 12,
        lvl: 2,
        id: '50004',
        name: 'ㄱㄷ',
        pId: '50000',
      },
      {
        rsstIdx: 14,
        lvl: 2,
        id: '50006',
        name: '새 분류ㅈㄹㄷㅈ',
        pId: '50000',
        children: [
          {
            rsstIdx: 141,
            lvl: 3,
            id: '500061',
            name: '새 분류 child-test 1',
            pId: '50006',
          },
          {
            rsstIdx: 142,
            lvl: 3,
            id: '500062',
            name: '새 분류 child-test 2',
            pId: '50006',
            children: [
              {
                rsstIdx: 1421,
                lvl: 4,
                id: '5000621',
                name: '새 분류 child-test 2-1',
                pId: '500062',
              },
              {
                rsstIdx: 1422,
                lvl: 4,
                id: '5000622',
                name: '새 분류 child-test 2-2',
                pId: '500062',
              },
            ],
          },
          {
            rsstIdx: 143,
            lvl: 3,
            id: '500063',
            name: '새 분류 child-test 3',
            pId: '50006',
          },
        ],
      },
      {
        rsstIdx: 16,
        lvl: 2,
        id: '50008',
        name: '새 분류ㅈ',
        pId: '50000',
      },
      {
        rsstIdx: 19,
        lvl: 2,
        id: '50011',
        name: '새 분류ㅈㄹㅈㄹ',
        pId: '50000',
      },
      {
        rsstIdx: 29,
        lvl: 2,
        id: '50012',
        name: '정탐_소분류_1',
        pId: '50000',
      },
      {
        rsstIdx: 30,
        lvl: 2,
        id: '50013',
        name: '정탐_소분류_2',
        pId: '50000',
      },
    ],
    pId: null,
  },
  {
    rsstIdx: 6,
    lvl: 1,
    id: '90000',
    name: '예외처리',
    pId: null,
    children: [
      {
        rsstIdx: 61,
        lvl: 2,
        id: '900001',
        name: '예외처리 child test 1',
        pId: '90000',
        children: [
          {
            rsstIdx: 611,
            lvl: 3,
            id: '9000011',
            name: '예외처리 child test 1-1',
            pId: '900001',
            disabled: true,
          },
          {
            rsstIdx: 612,
            lvl: 3,
            id: '9000012',
            name: '예외처리 child test 1-3',
            pId: '900001',
            children: [
              {
                rsstIdx: 6121,
                lvl: 4,
                id: '90000121',
                name: '예외처리 child test 1-3-1',
                pId: '9000012',
              },
            ],
          },
        ],
      },
      {
        rsstIdx: 62,
        lvl: 2,
        id: '900002',
        name: '예외처리 child test 2',
        pId: '90000',
      },
      {
        rsstIdx: 63,
        lvl: 2,
        id: '900003',
        name: '예외처리 child test 3',
        pId: '90000',
      },
    ],
  },
];

export const fileTypeTreeData = [
  {
    id: '1',
    name: 'Documents',
    iconType: 'folder', // ← 이 값이 iconMap의 키와 매칭됨
    extension: 'dir',
    children: [
      {
        id: '2',
        name: 'photo.jpg',
        extension: 'jpg',
        iconType: 'image',
      },
      {
        id: '3',
        name: 'video.mp4',
        extension: 'mp4',
        iconType: 'video',
        children: [
          {
            id: '3-1',
            name: 'video_3-1 with long text test video_3-1video_3-1video_3-1video_3-1 video_3-1 with long text test video_3-1video_3-1video_3-1video_3-1.avi',
            extension: 'avi',
            iconType: 'video',
          },
          {
            id: '3-2',
            name: 'video_3-2.flv',
            extension: 'flv',
            iconType: 'video',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'readme.txt',
    extension: 'txt',
    iconType: 'file',
  },
  {
    id: '5',
    name: 'Video Directories',
    iconType: 'folder',
    extension: 'dir',
    children: [
      {
        id: '5-1',
        name: 'video-1.mp4',
        iconType: 'video',
      },
      {
        id: '5-2',
        name: 'video-2.mp4',
        iconType: 'video',
        disabled: true,
      },
      {
        id: '5-3',
        name: 'video-3.mp4',
        iconType: 'video',
      },
      {
        id: '5-4',
        name: 'video-4.mp4',
        iconType: 'error',
        disabled: true,
      },
    ],
  },
  {
    id: '6',
    name: 'readme1.pdf',
    extension: 'pdf',
    iconType: 'file',
  },
  {
    id: '7',
    name: 'compression1.zip',
    extension: 'zip',
    iconType: 'pack', // ← pack 타입 (압축)
    children: [
      {
        id: '7-1',
        name: 'readme1.pdf',
        extension: 'pdf',
        iconType: 'error',
      },
    ],
  },
];
