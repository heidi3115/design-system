import createMapToObject from './utils/createMapToObject';

// cmcd_nm이 동일한 경우, 의미는 같으나 name을 조금 다르게 처리하였습니다(ex. cmcd 39,81 둘 다 쿼리구분)
const majorCategoryArray = [
  { type: '001', name: 'usageLogType' },
  { type: '002', name: 'userPermission' },
  { type: '003', name: 'userLockStatus' },
  { type: '004', name: 'daemonType' },
  { type: '005', name: 'forwardType' },
  { type: '006', name: 'forwardMedia' },
  { type: '007', name: 'bigDataQueryType' },
  { type: '008', name: 'bigDataQueryCategory' },
  { type: '008001', name: 'scenarioDetactionTypeQuery' },
  { type: '008001001', name: 'generalThreshold' },
  { type: '008001002', name: 'variableThreshold' },
  { type: '008001003', name: 'aiFigureAnomalyDetection' },
  { type: '008001004', name: 'aiLogAnomalyDetection' },
  { type: '008001005', name: 'detectionOfAiAnomalies' },
  { type: '008001006', name: 'aiSimilarityDetection' },
  { type: '008001007', name: 'aiHackingDetection' },
  { type: '008001008', name: 'aiEventPrediction' },
  { type: '008002', name: 'scenarioMacroQuery' },
  { type: '008002001', name: 'macroGeneralThreshold' },
  { type: '008002002', name: 'macroVariableThreshold' },
  { type: '008002003', name: 'macroAiDetectionFigureAnomaly' },
  { type: '008002004', name: 'macroAiDetectionLogAnomaly' },
  { type: '008002005', name: 'macroAiDetectionAnomalies' },
  { type: '008002006', name: 'macroAiDetectionSimilarity' },
  { type: '008002007', name: 'macroAiDetectionHacking' },
  { type: '008002008', name: 'macroAiPredictionEvent' },
  { type: '008003', name: 'bigDataAnalysisQuery' },
  { type: '008003001', name: 'bigDataSearch' },
  { type: '008004', name: 'aiAnalysisQuery' },
  { type: '008004001', name: 'documentSimilarityBasedDetection' },
  { type: '008004002', name: 'aiRelationshipAnalysis' },
  { type: '008005', name: 'collectionQuery' },
  { type: '008005001', name: 'departmentInformation' },
  { type: '008005002', name: 'employeeInformation' },
  { type: '008005003', name: 'assetClassification' },
  { type: '008005004', name: 'assetInformation' },
  { type: '008006', name: 'dashboardQuery' },
  { type: '008006001', name: 'analysisScreen' },
  { type: '008006002', name: 'operationsDashboard' },
  { type: '008006003', name: 'systemDashboard' },
  { type: '008006004', name: 'bigDataDashboard' },
  { type: '008007', name: 'systemQuery' },
  { type: '008007001', name: 'aiAutomaticResponse' },
  { type: '008007002', name: 'license' },
  { type: '008007003', name: 'indexManagement' },
  { type: '009', name: 'detectionTargetCollectionType' },
  { type: '010', name: 'unitPeriod' },
  { type: '011', name: 'detectionTargetType' },
  { type: '012', name: 'riskLevel' },
  { type: '013', name: 'responseMode' },
  { type: '014', name: 'operationState' },
  { type: '015', name: 'measurementCycleType' },
  { type: '016', name: 'detectionType' },
  { type: '017', name: 'macroConfig' },
  { type: '018', name: 'scenarioLimitDirection' },
  { type: '019', name: 'aiAlgorithm' },
  { type: '020', name: 'learingModel' },
  { type: '021', name: 'targetDivision' },
  { type: '022', name: 'registrationType' },
  { type: '023', name: 'analysisType' },
  { type: '023001', name: 'anomalyFigureAnalysis' },
  { type: '024', name: 'sensitivityDirection' },
  { type: '025', name: 'employmentStatus' },
  { type: '026', name: 'responseStatus' },
  { type: '027', name: 'responseCompletionStatus' },
  { type: '028', name: 'leaningStatus' }, // TODO : leaningStatus -> learningStatus
  { type: '029', name: 'chartType' },
  { type: '030', name: 'informationClassification' },
  { type: '031', name: 'settingType' },
  { type: '032', name: 'predictionType' },
  { type: '033', name: 'highRiskGroupScheduleType' },
  { type: '034', name: 'preprocessingPeriodType' },
  { type: '035', name: 'transmissionType' },
  { type: '036', name: 'templateLayout' },
  { type: '037', name: 'panelType' },
  { type: '038', name: 'riskIndex' },
  { type: '039', name: 'queryType' },
  { type: '040', name: 'panelChartDirection' },
  { type: '041', name: 'legendPosition' },
  { type: '042', name: 'xAxisDataFormat' },
  { type: '043', name: 'alignment' },
  { type: '044', name: 'requestExplanation' },
  { type: '045', name: 'scenarioManualExecutionStatus' },
  { type: '046', name: 'scenarioManualExecutionDetailStatus' },
  { type: '047', name: 'autoVariableFilter' },
  { type: '048', name: 'autoVariableAlgorithm' },
  { type: '049', name: 'responseMethod' },
  { type: '050', name: 'requestExplanationTemplate' },
  { type: '051', name: 'requestTarget' },
  { type: '052', name: 'reRequestType' },
  { type: '053', name: 'reRequestTarget' },
  { type: '054', name: 'Referrer' },
  { type: '055', name: 'emailOmitted' },
  { type: '056', name: 'gradeType' },
  { type: '057', name: 'explanationStatus' },
  { type: '058', name: 'explanationStatusAndEventAnalysisAndResponse' },
  { type: '059', name: 'explanationRequest' },
  { type: '060', name: 'fileAccessType' },
  { type: '061', name: 'authenticationType' },
  { type: '062', name: 'protectedDocumentAnalysisStatus' },
  { type: '063', name: 'analysisResultResponseStatus' },
  { type: '064', name: 'targetDocumentCollectionStatus' },
  { type: '065', name: 'integrationType' },
  { type: '066', name: 'serviceType' },
  { type: '067', name: 'notificationScope' },
  { type: '068', name: 'bodyClassification' },
  { type: '069', name: 'detectionTarget' },
  { type: '071', name: 'userNotificationType' },
  { type: '071001', name: 'scenarioNotification' },
  { type: '071002', name: 'taskCompletionNotification' },
  { type: '071002001', name: 'fileDownload' },
  { type: '071002002', name: 'playbook' },
  { type: '072', name: 'progressStatus' },
  { type: '073', name: 'dashboardType' },
  { type: '074', name: 'dashboardSortingType' },
  { type: '075', name: 'drillDownType' },
  { type: '076', name: 'navigationMethod' },
  { type: '077', name: 'advancedSettings' },
  { type: '078', name: 'displayFormat' },
  { type: '079', name: 'hideConnectedChart' },
  { type: '080', name: 'dashboardCategory' },
  { type: '081', name: 'queryCategory' },
  { type: '082', name: 'chartCategory' },
  { type: '083', name: 'chartRefresh' },
  { type: '084', name: 'alignSettings' },
  { type: '085', name: 'barDirection' },
  { type: '086', name: 'legendLocation' },
  { type: '087', name: 'dataAdditionMethod' },
  { type: '088', name: 'dataType' },
  { type: '089', name: 'scenario' },
  { type: '089001', name: 'employees' },
  { type: '089002', name: 'assets' },
  { type: '090', name: 'eventOccurrence' },
  { type: '091', name: 'searchPeriodType' },
  { type: '092', name: 'searchPeriodClassification' },
  { type: '093', name: 'searchCycleType' },
  { type: '094', name: 'dayOfTheWeek' },
  { type: '095', name: 'searchScheduleStatus' },
  { type: '096', name: 'taskType' },
  { type: '097', name: 'datasetType' },
  { type: '098', name: 'dataInterpolationMethod' },
  { type: '099', name: 'scalerModel' },
  { type: '100', name: 'trainingTaskType' },
  { type: '101', name: 'trainingModelType' },
  { type: '102', name: 'trainingPredictionType' },
  { type: '103', name: 'trainingModelTuning' },
  { type: '104', name: 'hiddenLayerActivationFunction' },
  { type: '105', name: 'trainingOptimizer' },
  { type: '106', name: 'conditionSettingCriteria' },
  { type: '107', name: 'conditionSettingOperator' },
  { type: '108', name: 'aiTrainingStatus' },
  { type: '109', name: 'hiddenLayerModelLayerType' },
  { type: '110', name: 'managementTarget' },
  { type: '111', name: 'authorAccountStatus' },
  { type: '112', name: 'scenarioType' },
  { type: '113', name: 'conditionalExpressionType' },
  { type: '114', name: 'parenthesis' },
  { type: '115', name: 'operator' },
  { type: '116', name: 'automaticResponseTrainingStatus' },
  { type: '117', name: 'relationshipDiagramConfigurationType' },
  { type: '118', name: 'periodOpton' },
  { type: '119', name: 'loginMethod' },
  { type: '120', name: 'affiliation' },
  { type: '121', name: 'searchType' },
  { type: '122', name: 'displayMethod' },
  { type: '123', name: 'timeSearchOption' },
  { type: '124', name: 'similarModel' },
  { type: '125', name: 'textEmbedTarget' },
  { type: '126', name: 'dimensionalityReduction' },
  { type: '127', name: 'detectionConfig' },
  { type: '128', name: 'detectionProps' },
  { type: '129', name: 'postLoginNavigationScreen' },
  { type: '130', name: 'searchResultsExportRequestType' },
  { type: '131', name: 'searchResultsExportFileFormat' },
  { type: '132', name: 'explanationSearchOption' },
  { type: '132001', name: 'explanationTimeSearchOption' },
  { type: '132002', name: 'explanationTargetSearchOption' },
  { type: '132003', name: 'explanationState' },
] as const;
/**
 * majorCategoryTypeMap은 각 'type' 값을 'name'으로 매핑한 객체입니다.
 * - "001" => "usageLogType" : 사용 로그 구분
 * - "002" => "userPermission" : 사용자 권한
 * - "003" => "userLockStatus" : 사용자 잠금 상태
 * - "004" => "daemonType" : 데몬 구분
 * - "005" => "forwardType" : 발송 구분
 * - "006" => "forwardMedia" : 발송 매체
 * - "007" => "bigDataQueryType" : 빅데이터 쿼리 구분
 * - "008" => "bigDataQueryCategory" : 빅데이터 쿼리 분류
 * - "008001" => "scenarioDetactionTypeQuery" : 시나리오의 탐지 종류이므로
 * - "008001001" => "generalThreshold" : 일반 임계치
 * - "008001002" => "variableThreshold" : 가변 임계치
 * - "008001003" => "aiFigureAnomalyDetection" : AI 수치이상 탐지
 * - "008001004" => "aiLogAnomalyDetection" : AI 로그이상 탐지
 * - "008001005" => "detectionOfAiAnomalies" : AI 이상징후 탐지
 * - "008001006" => "aiSimilarityDetection" : AI 유사도 탐지
 * - "008001007" => "aiHackingDetection" : AI 해킹 탐지
 * - "008001008" => "aiEventPrediction" : AI 이벤트 예측
 * - "008002" => "scenarioMacroQuery" : 시나리오 매크로
 * - "008002001" => "macroGeneralThreshold" : 일반 임계치
 * - "008002002" => "macroVariableThreshold" : 가변 임계치
 * - "008002003" => "macroAiDetectionFigureAnomaly" : AI 수치이상 탐지
 * - "008002004" => "macroAiDetectionLogAnomaly" : AI 로그이상 탐지
 * - "008002005" => "macroAiDetectionAnomalies" : AI 이상징후 탐지
 * - "008002006" => "macroAiDetectionSimilarity" : AI 유사도 탐지
 * - "008002007" => "macroAiPredictionEvent" : AI 해킹 탐지
 * - "008002008" => "aiPredictionEvent" : AI 이벤트 예측
 * - "008003" => "bigDataAnalysisQuery" : 빅데이터 분석
 * - "008003001" => "bigDataSearch" : 빅데이터 검색
 * - "008004" => "aiAnalysisQuery" : AI 분석
 * - "008004001" => "documentSimilarityBasedDetection" : 문서 유사도 기반 탐지
 * - "008004002" => "aiRelationshipAnalysis" : AI 관계도 분석
 * - "008005" => "collectionQuery" : 수집
 * - "008005001" => "departmentInformation" : 부서 정보
 * - "008005002" => "employeeInformation" : 임직원 정보
 * - "008005003" => "assetClassification" : 자산 구분
 * - "008005004" => "assetInformation" : 자산
 * - "008006" => "dashboardQuery" : 대시보드
 * - "008006001" => "analysisScreen" : 분석화면
 * - "008006002" => "operationsDashboard" : 운영 대시보드
 * - "008006003" => "systemDashboard" : 시스템 대시보드
 * - "008006004" => "bigDataDashboard" : 빅데이터 대시보드
 * - "008007" => "systemQuery" : 시스템
 * - "008007001" => "aiAutomaticResponse" : AI 자동 대응
 * - "008007002" => "license" : 라이선스
 * - "008007003" => "indexManagement" : 인덱스 관리
 * - "009" =>  "detectionTargetCollectionType" : 탐지대상 수집 구분
 * - "010" => "unitPeriod" : 기간 단위
 * - "011" => "detectionTargetType" : 탐지대상 종류
 * - "012" => "riskLevel" : 시나리오 등급
 * - "013" => "responseMode" : 대응구분
 * - "014" => "operationState" : 운영상태
 * - "015" => "measurementCycleType" : 측정 주기 유형
 * - "016" => "detectionType" : 탐지형태
 * - "017" => "macroConfig" : 매크로 설정
 * - "018" => "scenarioLimitDirection" : 임계치 한계 방향
 * - "019" => "aiAlgorithm" : ai 알고리즘
 * - "020" => "learingModel" : 학습모델
 * - "021" => "targetDivision" : 대상구분
 * - "022" => "registrationType" : 등록 유형
 * - "023" => "analysisType" : 분석 유형
 * - "023001" => "anomalyFigureAnalysis" : 이상치 분석
 * - "024" => "sensitivityDirection" : sensitivity 방향
 * - "025" => "employmentStatus" : 재직 상태
 * - "026" => "responseStatus" : 대응 상태
 * - "027" => "responseCompletionStatus" : 대응완료 상태
 * - "028" => "leaningStatus" : 학습상태 -> TODO: 오타 learningStatus
 * - "029" => "chartType" : 차트 종류
 * - "030" => "informationClassification" : 정보 분류
 * - "031" => "settingType" : 설정 구분
 * - "032" => "predictionType" : 예측 구분
 * - "033" => "highRiskGroupScheduleType" : 고위험군 스케줄 분류
 * - "034" => "preprocessingPeriodType" : 전처리 기간 타입
 * - "035" => "transmissionType" : 전송 구분
 * - "036" => "templateLayout" : 템플릿 레이아웃
 * - "037" => "panelType" : 패널 유형
 * - "038" => "riskIndex" : 위험지수
 * - "039" => "queryType" : 쿼리 구분
 * - "040" => "panelChartDirection" : 패널 차트 방향
 * - "041" => "legendPosition" : 범례 위치
 * - "042" => "xAxisDataFormat" : X축 데이터 포맷
 * - "043" => "alignment" : 정렬
 * - "044" => "requestExplanation" : 소명요청
 * - "045" => "scenarioManualExecutionStatus" : 시나리오 수동실행 상태
 * - "046" => "scenarioManualExecutionDetailStatus" : 시나리오 수동실행 상세현황 상태
 * - "047" => "autoVariableFilter" : 자동 가변 필터
 * - "048" => "autoVariableAlgorithm" : 자동가변 칼만필터 알고리즘 // TODO: autoVariableAlgorithm -> autoVariableKalmanFilterAlgorithm 로 바꾸는 건어떤 지 검토 바랍니다.
 * - "049" => "responseMethod" : 대응 방법
 * - "050" => "requestExplanationTemplate" : 소명 요청 - 소명 템플릿 관리
 * - "051" => "requestTarget" : 요청 대상
 * - "052" => "reRequestType" : 재요청 타입
 * - "053" => "reRequestTarget" : 재요청 대상
 * - "054" => "Referrer" : 참조자
 * - "055" => "emailOmitted" : 이메일 누락자
 * - "056" => "gradeType" : 등급 구분
 * - "057" => "explanationStatus" : 소명 상태
 * - "058" => "explanationStatusAndEventAnalysisAndResponse" : 소명 상태(이벤트 분석/대응)
 * - "059" => "explanationRequest" : 소명 요청
 * - "060" => "fileAccessType" : 파일 접근 타입
 * - "061" => "authenticationType" : 인증 타입
 * - "062" => "protectedDocumentAnalysisStatus" : 보호문서 분석상태
 * - "063" => "analysisResultResponseStatus" : 분석결과 대응상태
 * - "064" => "targetDocumentCollectionStatus" : 대상문서 수집상태
 * - "065" => "integrationType" : 연동 분류
 * - "066" => "serviceType" : 서비스 유형
 * - "067" => "notificationScope" : 알림 범위
 * - "068" => "bodyClassification" : 바디 구분
 * - "069" => "detectionTarget" : 탐지대상
 * - "071" => "userNotificationType" : 사용자 알림 분류
 * - "071001" => "scenarioNotification" : 시나리오 알림
 * - "071002" => "taskCompletionNotification" : 작업 완료 알림
 * - "071002001" => "fileDownload" : 파일 다운로드
 * - "071002002" => "playbook" : 플레이북
 * - "072" => "progressStatus" : 진행상태
 * - "073" => "dashboardType" : 대시보드 종류
 * - "074" => "dashboardSortingType" : 대시보드 정렬 타입
 * - "075" => "drillDownType" : 드릴다운 타입
 * - "076" => "navigationMethod" : 이동 방식
 * - "077" => "advancedSettings" : 고급 설정
 * - "078" => "displayFormat" : 표시 형식
 * - "079" => "hideConnectedChart" : 연결할 차트 숨김
 * - "080" => "dashboardCategory" : 대시보드 구분
 * - "081" => "queryCategory" : 쿼리 구분
 * - "082" => "chartCategory" : 차트 종류
 * - "083" => "chartRefresh" : 차트 갱신
 * - "084" => "alignSettings" :  정렬 설정
 * - "085" => "barDirection" : 막대 방향
 * - "086" => "legendLocation" : 범례 위치
 * - "087" => "dataAdditionMethod" :  데이터 추가 방식
 * - "088" => "dataType" : 데이터 타입
 * - "089" => "scenario" : 시나리오
 * - "089001" => "employees" : 임직원
 * - "089002" => "assets" : 자산
 * - "090" => "eventOccurrence" : 시나리오 // TODO : 시나리오 인데, eventOccurrence 이벤트 발생으로 되어있습니다.
 * - "091" => "searchPeriodType" : 검색 기간 유형
 * - "092" => "searchPeriodClassification" : 검색 기간 구분
 * - "093" => "searchCycleType" : 검색 주기 유형
 * - "094" => "dayOfTheWeek" :  요일
 * - "095" => "searchScheduleStatus" : 검색 스케줄 상태
 * - "096" => "taskType" : 태스크 유형
 * - "097" => "datasetType" : 데이터셋 타입
 * - "098" => "dataInterpolationMethod" : 데이터 보간법
 * - "099" => "scalerModel" : Scaler 모델
 * - "100" => "trainingTaskType" : 학습 태스크 타입
 * - "101" => "trainingModelType" : 학습 모델 타입
 * - "102" => "trainingPredictionType" : 학습 예측 타입
 * - "103" => "trainingModelTuning" : 학습 모델 튜닝
 * - "104" => "hiddenLayerActivationFunction" : 은닉층 활성화 함수
 * - "105" => "trainingOptimizer" : 학습 Optimizer
 * - "106" => "conditionSettingCriteria" : 조건 설정 기준
 * - "107" => "conditionSettingOperator" : 조건 설정 연산자
 * - "108" => "aiTrainingStatus" : AI 학습 상태
 * - "109" => "hiddenLayerModelLayerType" : 은닉층 모델 레이어 종류
 * - "110" => "managementTarget" : 관리 대상
 * - "111" => "authorAccountStatus" : 작성자 계정 상태
 * - "112" => "scenarioType" : 시나리오 타입
 * - "113" => "conditionalExpressionType" : 조건식 타입
 * - "114" => "parenthesis" : 괄호
 * - "115" => "operator" : 연산자
 * - "116" => "automaticResponseTrainingStatus" : 자동 대응 학습 상태
 * - "117" => "relationshipDiagramConfigurationType" : 관계도 설정 유형
 * - "118" => "periodOption" : 기간 옵션
 * - "119" => "loginMethod" : 로그인 방식
 * - "120" => "affiliation" : 소속
 * - "121" => "searchType" : 검색 타입
 * - "122" => "displayMethod" : 표시 방법
 * - "123" => "timeSearchOption" : 시간 검색 옵션
 * - "124" => "similarModel" : 유사도 모델
 * - "125" => "textEmbedTarget" : 텍스트 임베딩 대상
 * - "126" => "dimensionalityReduction" : 차원 축소법
 * - "127" => "detectionConfig" : 탐지 설정
 * - "128" => "detectionProps" : 탐지 속성
 * - "129" => "postLoginNavigationScreen" : 로그인 후 이동화면
 * - "130" => "searchResultsExportRequestType" : 검색결과 내보내기 요청타입
 * - "131" => "searchResultsExportFileFormat" : 검색결과 내보내기 파일 형식
 * - "132" => "explanationSearchOption" : 소명 검색 옵션
 * - "132001" => "explanationTimeSearchOption" : 소명 시간 검색옵션
 * - "132002" => "explanationTargetSearchOption" : 소명 대상별 검색옵션
 * - "132003" => "explanationState" : 소명상태
 */

const { typeMap, nameMap } = createMapToObject(majorCategoryArray);

export const majorCategoryTypeMap = typeMap;
/**
 * majorCategoryValueMap은 각 'name' 값을 'type'으로 매핑한 객체입니다.
 * - "usageLogType" => "001" : 사용 로그 구분
 * - "userPermission" => "002" : 사용자 권한
 * - "userLockStatus" => "003" : 사용자 잠금 상태
 * - "daemonType" => "004" : 데몬 구분
 * - "forwardType" => "005" : 발송 구분
 * - "forwardMedia" => "006" : 발송 매체
 * - "bigDataQueryType" => "007" : 빅데이터 쿼리 구분
 * - "bigDataQueryCategory" => "008" : 빅데이터 쿼리 분류
 * - "scenarioDetactionTypeQuery" => "008001" : 시나리오의 탐지 종류이므로
 * - "generalThreshold" => "008001001" : 일반 임계치
 * - "variableThreshold" => "008001002" : 가변 임계치
 * - "aiFigureAnomalyDetection" => "008001003" : AI 수치이상 탐지
 * - "aiLogAnomalyDetection" => "008001004" : AI 로그이상 탐지
 * - "detectionOfAiAnomalies" => "008001005" : AI 이상징후 탐지
 * - "aiSimilarityDetection" => "008001006" : AI 유사도 탐지
 * - "aiHackingDetection" => "008001007" : AI 해킹 탐지
 * - "aiEventPrediction" => "008001008" : AI 이벤트 예측
 * - "scenarioMacroQuery" => "008002" : 시나리오 매크로
 * - "macroGeneralThreshold" => "008002001" : 일반 임계치
 * - "macroVariableThreshold" => "008002002" : 가변 임계치
 * - "macroAiDetectionFigureAnomaly" => "008002003" : AI 수치이상 탐지
 * - "macroAiDetectionLogAnomaly" => "008002004" : AI 로그이상 탐지
 * - "macroAiDetectionAnomalies" => "008002005" : AI 이상징후 탐지
 * - "macroAiDetectionSimilarity" => "008002006" : AI 유사도 탐지
 * - "macroAiDetectionHacking" => "008002007" : AI 해킹 탐지
 * - "macroAiPredictionEvent" => "008002008" : AI 이벤트 예측
 * - "bigDataAnalysisQuery" => "008003" : 빅데이터 분석
 * - "bigDataSearch" => "008003001" : 빅데이터 검색
 * - "aiAnalysisQuery" => "008004" : AI 분석
 * - "documentSimilarityBasedDetection" => "008004001" : 문서 유사도 기반 탐지
 * - "aiRelationshipAnalysis" => "008004002" : AI 관계도 분석
 * - "collectionQuery" => "008005" : 수집
 * - "departmentInformation" => "008005001" : 부서 정보
 * - "employeeInformation" => "008005002" : 임직원 정보
 * - "assetClassification" => "008005003" : 자산 구분
 * - "assetInformation" => "008005004" : 자산
 * - "dashboardQuery" => "008006" : 대시보드
 * - "analysisScreen" => "008006001" : 분석화면
 * - "operationsDashboard" => "008006002" : 운영 대시보드
 * - "systemDashboard" => "008006003" : 시스템 대시보드
 * - "bigDataDashboard" => "008006004" : 빅데이터 대시보드
 * - "systemQuery" => "008007" : 시스템
 * - "aiAutomaticResponse" => "008007001" : AI 자동 대응
 * - "license" => "008007002" : 라이선스
 * - "indexManagement" => "008007003" : 인덱스 관리
 * - "detectionTargetCollectionType" => "009" : 탐지대상 수집 구분
 * - "unitPeriod" => "010" : 기간 단위
 * - "detectionTargetType" => "011" : 탐지대상 종류
 * - "riskLevel" => "012" : 시나리오 등급
 * - "responseMode" => "013" : 대응구분
 * - "operationState" => "014" : 운영상태
 * - "measurementCycleType" => "015" : 측정 주기 유형
 * - "detectionType" => "016" : 탐지형태
 * - "macroConfig" => "017" : 매크로 설정
 * - "scenarioLimitDirection" => "018" : 임계치 한계 방향
 * - "aiAlgorithm" => "019" : ai 알고리즘
 * - "learingModel" => "020" : 학습모델
 * - "targetDivision" => "021" : 대상구분
 * - "registrationType" => "022" : 등록 유형
 * - "analysisType" => "023" : 분석 유형
 * - "anomalyFigureAnalysis" => "023001" : 이상치 분석
 * - "sensitivityDirection" => "024" : sensitivity 방향
 * - "employmentStatus" => "025" : 재직 상태
 * - "responseStatus" => "026" : 대응 상태
 * - "responseCompletionStatus" => "027" : 대응완료 상태
 * - "leaningStatus" => "028" : 학습상태
 * - "chartType" => "029" : 차트 종류
 * - "informationClassification" => "030" : 정보 분류
 * - "settingType" => "031" : 설정 구분
 * - "predictionType" => "032" : 예측 구분
 * - "highRiskGroupScheduleType" => "033" : 고위험군 스케줄 분류
 * - "preprocessingPeriodType" => "034" : 전처리 기간 타입
 * - "transmissionType" => "035" : 전송 구분
 * - "templateLayout" => "036" : 템플릿 레이아웃
 * - "panelType" => "037" : 패널 유형
 * - "riskIndex" => "038" : 위험지수
 * - "queryType" => "039" : 쿼리 구분
 * - "panelChartDirection" => "040" : 패널 차트 방향
 * - "legendPosition" => "041" : 범례 위치
 * - "xAxisDataFormat" => "042" : X축 데이터 포맷
 * - "alignment" => "043" : 정렬
 * - "requestExplanation" => "044" : 소명요청
 * - "scenarioManualExecutionStatus" => "045" : 시나리오 수동실행 상태
 * - "scenarioManualExecutionDetailStatus" => "046" : 시나리오 수동실행 상세현황 상태
 * - "autoVariableFilter" => "047" : 자동 가변 필터
 * - "autoVariableAlgorithm" => "048" : 동가변 칼만필터 알고리즘
 * - "responseMethod" => "049" : 대응 방법
 * - "requestExplanationTemplate" => "050" : 소명 요청 - 소명 템플릿 관리
 * - "requestTarget" => "051" : 요청 대상
 * - "reRequestType" => "052" : 재요청 타입
 * - "reRequestTarget" => "053" : 재요청 대상
 * - "Referrer" => "054" : 참조자
 * - "emailOmitted" => "055" : 이메일 누락자
 * - "gradeType" => "056" : 등급 구분
 * - "explanationStatus" => "057" : 소명 상태
 * - "explanationStatusAndEventAnalysisAndResponse" => "058" : 소명 상태(이벤트 분석/대응)
 * - "explanationRequest" => "059" : 소명 요청
 * - "fileAccessType" => "060" : 파일 접근 타입
 * - "authenticationType" => "061" : 인증 타입
 * - "protectedDocumentAnalysisStatus" => "062" : 보호문서 분석상태
 * - "analysisResultResponseStatus" => "063" : 분석결과 대응상태
 * - "targetDocumentCollectionStatus" => "064" : 대상문서 수집상태
 * - "integrationType" => "065" : 연동 분류
 * - "serviceType" => "066" : 서비스 유형
 * - "notificationScope" => "067" : 알림 범위
 * - "bodyClassification" => "068" : 바디 구분
 * - "detectionTarget" => "069" : 탐지대상
 * - "userNotificationType" => "071" : 사용자 알림 분류
 * - "scenarioNotification" => "071001" : 시나리오 알림
 * - "taskCompletionNotification" => "071002" : 작업 완료 알림
 * - "fileDownload" => "071002001" : 파일 다운로드
 * - "playbook" => "071002002" : 플레이북
 * - "progressStatus" => "072" : 진행상태
 * - "dashboardType" => "073" : 대시보드 종류
 * - "dashboardSortingType" => "074" : 대시보드 정렬 타입
 * - "drillDownType" => "075" : 드릴다운 타입
 * - "navigationMethod" => "076" : 이동 방식
 * - "advancedSettings" => "077" : 고급 설정
 * - "displayFormat" => "078" : 표시 형식
 * - "hideConnectedChart" => "079" : 연결할 차트 숨김
 * - "dashboardCategory" => "080" : 대시보드 구분
 * - "queryCategory" => "081" : 쿼리 구분
 * - "chartCategory" => "082" : 차트 종류
 * - "chartRefresh" => "083" : 차트 갱신
 * - "alignSettings" => "084" :  정렬 설정
 * - "barDirection" => "085" : 막대 방향
 * - "legendLocation" => "086" : 범례 위치
 * - "dataAdditionMethod" => "087" :  데이터 추가 방식
 * - "dataType" => "088" : 데이터 타입
 * - "scenario" => "089" : 시나리오
 * - "employees" => "089001" : 임직원
 * - "assets" => "089002" : 자산
 * - "eventOccurrence" => "090" : 시나리오
 * - "searchPeriodType" => "091" : 검색 기간 유형
 * - "searchPeriodClassification" => "092" : 검색 기간 구분
 * - "searchCycleType" => "093" : 검색 주기 유형
 * - "dayOfTheWeek" => "094" :  요일
 * - "searchScheduleStatus" => "095" : 검색 스케줄 상태
 * - "taskType" => "096" : 태스크 유형
 * - "datasetType" => "097" : 데이터셋 타입
 * - "dataInterpolationMethod" => "098" : 데이터 보간법
 * - "scalerModel" => "099" : Scaler 모델
 * - "trainingTaskType" => "100" : 학습 태스크 타입
 * - "trainingModelType" => "101" : 학습 모델 타입
 * - "trainingPredictionType" => "102" : 학습 예측 타입
 * - "trainingModelTuning" => "103" : 학습 모델 튜닝
 * - "hiddenLayerActivationFunction" => "104" : 은닉층 활성화 함수
 * - "trainingOptimizer" => "105" : 학습 Optimizer
 * - "conditionSettingCriteria" => "106" : 조건 설정 기준
 * - "conditionSettingOperator" => "107" : 조건 설정 연산자
 * - "aiTrainingStatus" => "108" : AI 학습 상태
 * - "hiddenLayerModelLayerType" => "109" : 은닉층 모델 레이어 종류
 * - "managementTarget" => "110" : 관리 대상
 * - "authorAccountStatus" => "111" : 작성자 계정 상태
 * - "scenarioType" => "112" : 시나리오 타입
 * - "conditionalExpressionType" => "113" : 조건식 타입
 * - "parenthesis" => "114" : 괄호
 * - "operator" => "115" : 연산자
 * - "automaticResponseTrainingStatus" => "116" : 자동 대응 학습 상태
 * - "relationshipDiagramConfigurationType" => "117" : 관계도 설정 유형
 * - "periodOpton" => "118" : 기간옵션
 * - "loginMethod" => "119" : 로그인 방식
 * - "affiliation" => "120" : 소속
 * - "searchType" => "121" : 검색 타입
 * - "displayMethod" => "122" : 표시 방법
 * - "timeSearchOption" => "123" : 시간 검색 옵션
 * - "similarModel" => "124" : 유사도 모델
 * - "textEmbedTarget" => "125" : 텍스트 임베딩 대상
 * - "dimensionalityReduction" => "126" : 차원 축소법
 * - "detectionConfig" => "127" : 탐지 설정
 * - "detectionProps" => "128" : 탐지 속성
 * - "postLoginNavigationScreen" => "129" : 로그인 후 이동화면
 * - "searchResultsExportRequestType" => "130" : 검색결과 내보내기 요청타입
 * - "searchResultsExportFileFormat" => "131" : 검색결과 내보내기 파일 형식
 * - "explanationSearchOption" => "132" : 소명 검색 옵션
 * - "explanationTimeSearchOption" => "132001" : 소명 시간 검색옵션
 * - "explanationTargetSearchOption" => "132002" : 소명 대상별 검색옵션
 * - "explanationState" => "132003" : 소명상태
 */
export const majorCategoryValueMap = nameMap;

export type majorCategoryeMapKey = keyof typeof majorCategoryTypeMap;
export type majorCategoryMapValue = keyof typeof majorCategoryValueMap;
