import createMapToObject from './utils/createMapToObject';

// check - 소명요청 [소명대상(이상행위자/대체자)] -> 같이 [] 등의 특수문자 구분의 경우 And로 처리.
const minorCategoryArray = [
  // "001" 사용 로그 구분 usageLogType
  { type: '001001', name: 'normal' }, // 일반
  { type: '001002', name: 'login' }, // 로그인
  { type: '001003', name: 'logout' }, // 로그아웃
  { type: '001004', name: 'permissionsRegistration' }, // 권한 등록
  { type: '001005', name: 'permissionsChange' }, // 권한 변경
  { type: '001006', name: 'permissionsDeletion' }, // 권한 삭제

  // "002" 사용자 권한 userPermission
  { type: '002001', name: 'user' }, // 사용자
  { type: '002002', name: 'manager' }, // 담당자
  { type: '002003', name: 'administrator' }, // 관리자
  { type: '002004', name: 'systemAdministrator' }, // 시스템 관리자

  // "003" 사용자 잠금 상태 userLockStatus
  { type: '003001', name: 'noAnomaly' }, // 특이사항 없음
  { type: '003002', name: 'passwordExceeded' }, // 패스워드 초과
  { type: '003003', name: 'longTermInactivity' }, // 장기 미접속
  { type: '003004', name: 'manualLock' }, // 수동 잠금

  // "004" 데몬 구분 daemonType
  { type: '004001', name: 'normalDaemon' }, // 일반
  { type: '004002', name: 'detectionDaemon' }, // 탐지
  { type: '004003', name: 'trainingDaemon' }, // 학습
  { type: '004004', name: 'automaticResponseDaemon' }, // 자동대응

  // "005" 발송구분 종류 forwardType
  { type: '005001', name: 'tempPassForwardType' }, // 임시 비밀번호 발급 발송
  { type: '005002', name: 'scenarioDetectForwardType' }, // 시나리오별 발송
  { type: '005003', name: 'eventDetectForwardType' }, // 이벤트별 발송
  { type: '005004', name: 'reportEmailSentType' }, // 보고서 메일 발송
  { type: '005005', name: 'explanationRequestAndTargetAbnormalActorSubstitute' }, // 소명요청 [소명대상(이상행위자/대체자)]
  { type: '005006', name: 'explanationRequestAndReferrer' }, // 소명요청 [참조자]
  { type: '005007', name: 'explanationNoticeAndTargetAbnormalActorSubstitute' }, // 통보 [소명대상(이상행위자/대체자)]
  { type: '005008', name: 'explanationNoticeAndReferrer' }, // 통보 [참조자]
  { type: '005009', name: 'explanationAnswerApproveApprover' }, // 소명답변/승인 [승인자]
  { type: '005010', name: 'explanationRejectAndTargetAbnormalActorSubstitute' }, // 반려 [소명대상(이상행위자/대체자)]
  { type: '005011', name: 'explanationRejectAndReferrer' }, // 반려 [참조자]
  { type: '005012', name: 'reRequestAndAnswerAndTargetAbnormalActorSubstitute)]' }, // 재요청(답변) [소명대상(이상행위자/대체자)]
  { type: '005013', name: 'reRequestAndAnswerAndReferrer' }, // 재요청(답변) [참조자]
  { type: '005014', name: 'reRequestAndApproveAndApprover' }, // 재요청(승인) [승인자]
  { type: '005015', name: 'explanationCompleteAndTargetAbnormalActorSubstitute' }, // 소명완료 [소명대상(이상행위자/대체자)]
  { type: '005016', name: 'explanationCompleteAndReferrer]' }, // 소명완료 [참조자]
  { type: '005017', name: 'explanationRecallAndTargetAbnormalActorSubstitute' }, // 소명회수 [소명대상(이상행위자/대체자)]
  { type: '005018', name: 'explanationRecallAndReferrer]' }, // 소명회수 [참조자]
  { type: '005019', name: 'explanationFailedAndSecurityManager]' }, // 소명실패 [보안담당자]
  { type: '005020', name: 'explanationFailedAndTargetAbnormalActorSubstitute' }, // 소명실패 [소명대상(이상행위자/대체자)]
  { type: '005021', name: 'explanationFailedAndReferrer' }, // 소명실패 [참조자]
  { type: '005022', name: 'superAdministratorAndLoginFailed' }, // [슈퍼관리자] 로그인 실패
  { type: '005023', name: 'administratorAndLoginFailed' }, // [관리자] 로그인 실패
  { type: '005024', name: 'administratorAndOTPLoginFailed' }, // [관리자] OTP 로그인 실패
  { type: '005025', name: 'otpAuthenticationRegistrationQRCodeGuide' }, // OTP 인증 등록 QR코드 안내

  // "006" 발송매체 종류 forwardMedia
  { type: '006001', name: 'mailForwardMedia' }, // 메일
  { type: '006002', name: 'textForwardMedia' }, // 문자
  { type: '006003', name: 'talkForwardMedia' }, // 알림톡
  { type: '006004', name: 'userForwardMedia' }, // 사용자알람
  { type: '006005', name: 'messageForwardMedia' }, // 메신져

  // "007" 빅데이터 쿼리 구분 bigDataQueryType
  { type: '007001', name: 'loadQuery' }, // 쿼리 불러오기
  { type: '007002', name: 'systemManagement' }, // 시스템 관리

  // "008" 빅데이터 쿼리 분류 bigDataQueryCategory
  { type: '008001', name: 'scenarioDetactionTypeQuery' }, // 시나리오의 탐지 종류이므로
  { type: '008002', name: 'scenarioMacroQuery' }, // 시나리오 매크로
  { type: '008003', name: 'bigDataAnalysisQuery' }, // 빅데이터 분석
  { type: '008004', name: 'aiAnalysisQuery' }, // AI 분석
  { type: '008005', name: 'collectionQuery' }, // 수집
  { type: '008006', name: 'dashboardQuery' }, // 대시보드
  { type: '008007', name: 'systemQuery' }, // 시스템

  // "008001" 시나리오의 탐지 종류이므로 scenarioDetactionTypeQuery
  { type: '008001001', name: 'scenarioGeneralThreshold' }, // 일반 임계치
  { type: '008001002', name: 'scenarioVariableThreshold' }, // 가변 임계치
  { type: '008001003', name: 'scenarioAiFigureAnomalyDetection' }, // AI 수치이상 탐지
  { type: '008001004', name: 'scenarioAiLogAnomalyDetection' }, // AI 로그이상 탐지
  { type: '008001005', name: 'scenarioDetectionOfAiAnomalies' }, // AI 이상징후 탐지
  { type: '008001006', name: 'scenarioAiSimilarityDetection' }, // AI 유사도 탐지
  { type: '008001007', name: 'scenarioAiHackingDetection' }, // AI 해킹 탐지
  { type: '008001008', name: 'scenarioAiEventPrediction' }, // AI 이벤트 예측 // TODO : 현재 get/codes 에 없음.(192.168.0.110 기준)

  // "008001001" 일반 임계치 generalThreshold
  { type: '008001001001', name: 'aggregateGeneralThreshold' }, // 집계
  { type: '008001001002', name: 'detectGeneralThreshold' }, // 탐지

  // "008001002" 가변 임계치 variableThreshold
  { type: '008001002001', name: 'aggregateVariableThreshold' }, // 집계
  { type: '008001002002', name: 'trainingVariableThreshold' }, // 학습
  { type: '008001002003', name: 'detectVariableThreshold' }, // 탐지

  // "008001003" AI 수치이상 탐지 aiFigureAnomalyDetection
  { type: '008001003001', name: 'aggregateAiFigureAnomalyDetection' }, // 집계
  { type: '008001003002', name: 'trainingAiFigureAnomalyDetection' }, // 학습
  { type: '008001003003', name: 'detectAiFigureAnomalyDetection' }, // 탐지

  // "008001004" AI 로그이상 탐지 aiLogAnomalyDetection
  { type: '008001004001', name: 'aggregateAiLogAnomalyDetection' }, // 집계
  { type: '008001004002', name: 'trainingAiLogAnomalyDetection' }, // 학습
  { type: '008001004003', name: 'detectAiLogAnomalyDetection' }, // 탐지

  // "008001005" AI 이상징후 탐지 detectionOfAiAnomalies
  { type: '008001005001', name: 'aggregateDetectionOfAiAnomalies' }, // 집계
  { type: '008001005002', name: 'detectDetectionOfAiAnomalies' }, // 탐지

  // "008001006" AI 유사도 탐지 aiSimilarityDetection
  { type: '008001006001', name: 'aggregateAiSimilarityDetection' }, // 집계
  { type: '008001006002', name: 'trainingAiSimilarityDetection' }, // 학습
  { type: '008001006003', name: 'trainingPeriodAiSimilarityDetection' }, // 학습기간
  { type: '008001006004', name: 'detectAiSimilarityDetection' }, // 탐지
  { type: '008001006005', name: 'comparisonAiSimilarityDetection' }, // 비교

  // "008001007" AI 해킹 탐지 aiHackingDetection
  { type: '008001007001', name: 'aggregateAiHackingDetection' }, // 집계
  { type: '008001007002', name: 'detectAiHackingDetection' }, // 탐지

  // "008001008" AI 이벤트 예측 aiEventPrediction // TODO : 008001008 의 결과가 존재하지 않음.(192.168.0.110 기준)
  { type: '008001008001', name: 'trainingTargetCollectionAiEventPrediction' }, // 학습대상 수집
  { type: '008001008002', name: 'trainingAiEventPrediction' }, // 학습
  { type: '008001008003', name: 'detectCharacteristicsAiEventPrediction' }, // 탐지특성
  { type: '008001008004', name: 'detectValidationAiEventPrediction' }, // 탐지검증

  // "008002" 시나리오 매크로 scenarioMacroQuery
  { type: '008002001', name: 'macroGeneralThreshold' }, // 일반 임계치
  { type: '008002002', name: 'macroVariableThreshold' }, // 가변 임계치
  { type: '008002003', name: 'macroAiDetectionFigureAnomaly' }, // AI 수치이상 탐지
  { type: '008002004', name: 'macroAiDetectionLogAnomaly' }, // AI 로그이상 탐지
  { type: '008002005', name: 'macroAiDetectionAnomalies' }, // AI 이상징후 탐지
  { type: '008002006', name: 'macroAiDetectionSimilarity' }, // AI 유사도 탐지
  { type: '008002007', name: 'macroAiDetectionHacking' }, // AI 해킹 탐지
  { type: '008002008', name: 'macroAiPredictionEvent' }, // AI 이벤트 예측 // TODO : 현재 get/codes 에 없음.192.168.0.110 기준)

  // "008002001" 일반 임계치 macroGeneralThreshold
  { type: '008002001001', name: 'aggregateMacroGeneralThreshold' }, // 집계
  { type: '008002001002', name: 'detectMacroGeneralThreshold' }, // 탐지

  // "008002002" 가변 임계치 macroVariableThreshold
  { type: '008002002001', name: 'aggregateMacroVariableThreshold' }, // 집계
  { type: '008002002002', name: 'trainingSingleCountMacroVariableThreshold' }, // 학습(단일건수)
  { type: '008002002003', name: 'trainingSingleStatisticsMacroVariableThreshold' }, // 학습(단일통계)
  { type: '008002002004', name: 'detectSingleCountMacroVariableThreshold' }, // 탐지(단일건수)
  { type: '008002002005', name: 'detectSingleStatisticsMacroVariableThreshold' }, // 탐지(단일통계)

  // "008002003" AI 수치이상 탐지 macroAiDetectionFigureAnomaly
  { type: '008002003001', name: 'aggregateMacroAiDetectionFigureAnomaly' }, // 집계
  { type: '008002003002', name: 'trainingMacroAiDetectionFigureAnomaly' }, // 학습
  { type: '008002003003', name: 'detectMacroAiDetectionFigureAnomaly' }, // 탐지

  // "008002004" AI 로그이상 탐지 macroAiDetectionLogAnomaly
  { type: '008002004001', name: 'aggregateMacroAiDetectionLogAnomaly' }, // 집계
  { type: '008002004002', name: 'trainingMacroAiDetectionLogAnomaly' }, // 학습
  { type: '008002004003', name: 'detectMacroAiDetectionLogAnomaly' }, // 탐지

  // "008002005" AI 이상징후 탐지 macroAiDetectionAnomalies
  { type: '008002005001', name: 'aggregateMacroAiDetectionAnomalies' }, // 집계
  { type: '008002005002', name: 'detectMacroAiDetectionAnomalies' }, // 탐지

  // "008002006" AI 유사도 탐지 macroAiDetectionSimilarity
  { type: '008002006001', name: 'aggregateMacroAiDetectionSimilarity' }, // 집계
  { type: '008002006002', name: 'trainingMacroAiDetectionSimilarity' }, // 학습
  { type: '008002006003', name: 'trainingPeriodMacroAiDetectionSimilarity' }, // 학습기간
  { type: '008002006004', name: 'detectMacroAiDetectionSimilarity' }, // 탐지
  { type: '008002006005', name: 'comparisonMacroAiDetectionSimilarity' }, // 비교

  // "008002007" AI 해킹 탐지 macroAiDetectionHacking
  { type: '008002007001', name: 'aggregateMacroAiDetectionHacking' }, // 집계
  { type: '008002007002', name: 'detectIDSMacroAiDetectionHacking' }, // 탐지(IDS)
  { type: '008002007003', name: 'detectIPSMacroAiDetectionHacking' }, // 탐지(IPS)

  // "008002008" AI 이벤트 예측 macroAiPredictionEvent
  { type: '008002008001', name: 'trainingTargetCollectionMacroAiPredictionEvent' }, // 학습대상 수집
  { type: '008002008002', name: 'trainingMacroAiPredictionEvent' }, // 학습
  { type: '008002008003', name: 'detectCharacteristicsMacroAiPredictionEvent' }, // 탐지특성
  { type: '008002008004', name: 'detectValidationMacroAiPredictionEvent' }, // 탐지검증

  // "008003" 빅데이터 분석 bigDataAnalysisQuery
  { type: '008003001', name: 'bigDataSearch' }, // 빅데이터 검색

  // "008003001" 빅데이터 검색 bigDataSearch
  { type: '008003001001', name: 'lookupTimeSeriesChart' }, // 시계열차트조회
  { type: '008003001002', name: 'lookupSourceData' }, // 원천데이터조회

  // "008004" AI 분석 aiAnalysisQuery
  { type: '008004001', name: 'documentSimilarityBasedDetection' }, // 문서 유사도 기반 탐지
  { type: '008004002', name: 'aiRelationshipAnalysis' }, // AI 관계도 분석

  // "008004001" 문서 유사도 기반 탐지 documentSimilarityBasedDetection
  { type: '008004001001', name: 'lookupDocumentSimilarity' }, // 조회

  // "008004002" AI 관계도 분석 aiRelationshipAnalysis
  { type: '008004002001', name: 'lookupWholeCompany' }, // 전사 조회
  { type: '008004002002', name: 'lookupByDepartment' }, // 부서별 조회
  { type: '008004002003', name: 'lookupByEmployee' }, // 임직원별 조회

  // "008005" 수집 collection
  { type: '008005001', name: 'departmentInformation' }, // 부서 정보
  { type: '008005002', name: 'employeeInformation' }, // 임직원 정보
  { type: '008005003', name: 'assetClassification' }, // 자산 구분
  { type: '008005004', name: 'assetInformation' }, // 자산

  // "008005001" 부서 정보 departmentInformation
  { type: '008005001001', name: 'lookupDepartmentInformation' }, // 조회

  // "008005002" 임직원 정보 employeeInformation
  { type: '008005002001', name: 'lookupEmployeeInformation' }, // 조회
  { type: '008005002002', name: 'pcInformationListEmployee' }, // PC 정보 목록
  { type: '008005002003', name: 'pcUsageHistoryEmployee' }, // PC 사용 이력
  { type: '008005002004', name: 'pcExceptionHistoryEsortEmployee' }, // PC 예외 이력(esort)
  { type: '008005002005', name: 'pcExceptionHistoryNasaEmployee' }, // PC 예외 이력(nasa)
  { type: '008005002006', name: 'pcExceptionHistorySeuprintEmployee' }, // PC 예외 이력(seuprint)
  { type: '008005002007', name: 'ipHistoryEmployee' }, // IP 이력
  { type: '008005002008', name: 'swListEmployee' }, // SW 목록
  { type: '008005002009', name: 'internetUsageHistoryEmployee' }, // 인터넷 사용 이력
  { type: '008005002010', name: 'usbStorageHistoryEmployee' }, // USB 저장 이력
  { type: '008005002011', name: 'usbConnectionHistoryEmployee' }, // USB 탈부착 이력
  { type: '008005002012', name: 'documentDecryptionAutoHistoryEmployee' }, // 문서복호화(자동) 이력
  { type: '008005002013', name: 'documentDecryptionManualHistoryEmployee' }, // 문서복호화(수동) 이력
  { type: '008005002014', name: 'fileRenameHistoryEmployee' }, // 파일명 변경 이력
  { type: '008005002015', name: 'printHistoryEmployee' }, // 출력물 이력
  { type: '008005002016', name: 'accessHistoryEmployee' }, // 출입 이력
  { type: '008005002017', name: 'itemInOutHistoryEmployee' }, // 반출입 이력
  { type: '008005002018', name: 'businessTripHistoryEmployee' }, // 출장 이력
  { type: '008005002019', name: 'securitySoftwareExceptionHistoryEmployee' }, // 보안 SW 설치 예외 여부 이력

  // "008005003" assetClassification 자산 구분
  { type: '008005003001', name: 'lookupAssetClassification' }, // 조회

  // "008005004" 자산 assetInformation
  { type: '008005004001', name: 'lookupAssetInformation' }, // 조회

  // "008006" 대시보드 dashboardQuery
  { type: '008006001', name: 'analysisScreen' }, // 분석화면
  { type: '008006002', name: 'operationsDashboard' }, // 운영 대시보드
  { type: '008006003', name: 'systemDashboard' }, // 시스템 대시보드
  { type: '008006004', name: 'bigDataDashboard' }, // 빅데이터 대시보드

  // "008006001" 분석화면 analysisScreen
  { type: '008006001001', name: 'anomalyFigureAnalysisAnalysisScreen' }, // 이상치 분석
  { type: '008006001002', name: 'tableChartAnalysisScreen' }, // 표
  { type: '008006001003', name: 'figureAndLogAnomalyDetectionAnalysisScreen' }, // 수치/로그 이상 탐지
  { type: '008006001004', name: 'pieChartAnalysisScreen' }, // 파이 차트
  { type: '008006001005', name: 'verticalBarChartAnalysisScreen' }, // 바 차트(세로)
  { type: '008006001006', name: 'horizontalBarChartAnalysisScreen' }, // 바 차트(가로)
  { type: '008006001007', name: 'lineChartAnalysisScreen' }, // 라인 차트
  { type: '008006001008', name: 'timeSeriesTrendAnalysisScreen' }, // 시계열 추이
  { type: '008006001009', name: 'timeSeriesPredictionAnalysisScreen' }, // 시계열 예측

  // "008006002" 운영 대시보드 operationsDashboard
  { type: '008006002001', name: 'lookupOperationsDashboard' }, // 조회

  // "008006003" 시스템 대시보드 systemDashboard
  { type: '008006003001', name: 'lookupSystemDashboard' }, // 조회

  // "008006004" 빅데이터 대시보드 bigDataDashboard
  { type: '008006004001', name: 'lookupBigDataDashboard' }, // 조회

  // "008007" 시스템 systemQuery
  { type: '008007001', name: 'aiAutomaticResponse' }, // AI 자동 대응
  { type: '008007002', name: 'license' }, // 라이선스
  { type: '008007003', name: 'indexManagement' }, // 인덱스 관리

  // "008007001" AI 자동 대응 aiAutomaticResponse
  { type: '008007001001', name: 'trainingAiAutomaticResponse' }, // 학습
  { type: '008007001002', name: 'detectAiAutomaticResponse' }, // 탐지

  // "008007002" 라이선스 license
  { type: '008007002001', name: 'checkBigdataCollectionAmount' }, // 빅데이터 수집량 체크

  // "008007003" 인덱스 관리 indexManagement
  { type: '008007003001', name: 'lookupIndexManagement' }, // 인덱스 목록 조회

  // "009" 탐지대상 수집 구분 detectionTargetCollectionType
  { type: '009001', name: 'departmentCollectionType' }, // 부서
  { type: '009002', name: 'employeeCollectionType' }, // 임직원
  { type: '009003', name: 'assetTypeCollectionType' }, // 자산 구분
  { type: '009004', name: 'assetCollectionType' }, // 자산
  { type: '009005', name: 'explanationRecipientCollectionType' }, // 소명 수신자

  // "010" 기간 단위 unitPeriod
  { type: '010001', name: 'months' }, // 월
  { type: '010002', name: 'weeks' }, // 주
  { type: '010003', name: 'days' }, // 일
  { type: '010004', name: 'hours' }, // 시
  { type: '010005', name: 'minutes' }, // 분
  { type: '010006', name: 'seconds' }, // 초

  // "011" 탐지대상 종류 detectionTargetType
  { type: '011001', name: 'employeeTargetType' }, // 내부 정보유출(임직원)
  { type: '011002', name: 'externalIPTargetType' }, // 외부 보안관제(IP주소)
  { type: '011003', name: 'infraTargetType' }, // IT 운영관제(인프라)

  // "012" 시나리오 등급 riskLevel
  { type: '012001', name: 'urgentRiskLevel' }, // 긴급
  { type: '012002', name: 'seriousRiskLevel' }, // 심각
  { type: '012003', name: 'boundaryRiskLevel' }, // 경계
  { type: '012004', name: 'warnringRiskLevel' }, // 주의
  { type: '012005', name: 'infoRiskLevel' }, // 정보

  // "013" 대응사용 여부 responseMode
  { type: '013001', name: 'responseUse' }, // 사용
  { type: '013002', name: 'responseUnuse' }, // 미사용

  // "014" 운영상태 operationState
  { type: '014001', name: 'operateUse' }, // 운영상태 사용
  { type: '014002', name: 'operateUnuse' }, // 운영상태 미사용
  { type: '014003', name: 'operateDispose' }, // 운영상태 폐기

  // "015" 측정 주기 유형 measurementCycleType
  { type: '015001', name: 'basicCycle' }, // 기본
  { type: '015002', name: 'crontab' }, // crontab

  // "016" 탐지유형 detectionType
  { type: '016001', name: 'generalThreshold' }, // 일반 임계치
  { type: '016002', name: 'aiVariableThreshold' }, // AI 가변 임계치
  { type: '016003', name: 'aiNumericAnomaly' }, // AI 수치 이상탐지
  { type: '016004', name: 'aiLogAnomaly' }, // AI 로그 이상탐지
  { type: '016005', name: 'aiAbnormalSign' }, // AI 이상징후 탐지
  { type: '016006', name: 'aiSimilarityAnalysis' }, // AI 유사도 분석
  { type: '016007', name: 'aiHackingDetection' }, // AI 해킹 탐지
  { type: '016008', name: 'eventPrediction' }, // 이벤트 예측 탐지
  { type: '016009', name: 'aiMultiThreshold' }, // AI 다중 임계치
  { type: '016010', name: 'aiPlaybook' }, // AI 플레이북
  { type: '016011', name: 'aiWordSimilarity' }, // AI 단어 유사도 탐지
  { type: '016012', name: 'aiRarityDetection' }, // AI 희귀도 탐지

  // "017" 매크로 설정 macroConfig
  { type: '017001', name: 'macro' }, // 매크로
  { type: '017002', name: 'singleCountMacro' }, // 단일 건수 매크로
  { type: '017003', name: 'singleStatMacro' }, // 단일 통계 매크로
  { type: '017004', name: 'idsMacro' }, // 침입 탐지 시스템(IDS) 매크로
  { type: '017005', name: 'ipsMacro' }, // 침입 방지 시스템(IPS) 매크로
  { type: '017006', name: 'manualInputMacro' }, // 직접 입력

  // "018" 임계치 한계 방향 scenarioLimitDirection
  { type: '018001', name: 'limitBoth' }, // 상한 하한
  { type: '018002', name: 'limitUpper' }, // 상한
  { type: '018003', name: 'limitLower' }, // 하한

  // "019" ai 알고리즘 aiAlgorithm
  { type: '019001', name: 'visualizationDetection' }, // 비지도-가시화-탐지
  { type: '019002', name: 'preemptiveControlDetection' }, // 비지도-선행제어-탐지
  { type: '019003', name: 'bidirectionalMemoryDetection' }, // 비지도-양방향-메모리-탐지
  { type: '019004', name: 'visualizationMemoryDetection' }, // 비지도-가시화-메모리-탐지
  { type: '019005', name: 'memoryDetection' }, // 비지도-메모리-탐지
  { type: '019006', name: 'deepMemoryDetection' }, // 심층메모리-탐지
  { type: '019007', name: 'directionCircularDetection' }, // 비지도-양방향-순환-탐지
  { type: '019008', name: 'bidirectionalNestedCircularDetection' }, // 비지도-양방향-중첩순환-탐지

  // "020" 학습모델 learingModel
  { type: '020001', name: 'individualLearing' }, // 개별 학습모델
  { type: '020002', name: 'singleLearing' }, // 단일 학습모델

  // "021" 대상 구분 targetDivision
  { type: '021001', name: 'divisionUser' }, // 대상구분 사용자
  { type: '021002', name: 'divisionDepartment' }, // 대상구분 사용자
  { type: '021003', name: 'divisionAsset' }, // 대상구분 자산
  { type: '021004', name: 'divisionIP' }, // 대상구분 IP
  { type: '021005', name: 'divisionAssetGroup' }, // 대상구분 자산그룹
  { type: '021006', name: 'divisionException' }, // 대상구분 예외그룹

  // "022" 등록 유형 registrationType
  { type: '022001', name: 'detectionRegistration' }, // 탐지
  { type: '022002', name: 'eventRegistration' }, // 이벤트
  { type: '022003', name: 'explanationRegistration' }, // 소명

  // "023" 분석 유형 analysisType
  { type: '023001', name: 'anomalyFigureAnalysis' }, // 이상치 분석
  { type: '023002', name: 'sourceLogAnalysis' }, // 원천 로그
  { type: '023003', name: 'figureAndLogAnomalyDetectionAnalysis' }, // 수치/로그 이상 탐지
  { type: '023004', name: 'pieChartAnalysis' }, // 파이 차트
  { type: '023005', name: 'barChartAndVerticalAnalysis' }, // 바 차트(세로)
  { type: '023006', name: 'barChartAndHorizontalAnalysis' }, // 바 차트(가로)
  { type: '023007', name: 'lineChartAnalysis' }, // 라인 차트
  { type: '023008', name: 'timeSeriesTrendAnalysis' }, // 시계열 추이
  { type: '023009', name: 'timeSeriesPredictionAnalysis' }, // 시계열 예측
  { type: '023010', name: 'relationshipDiagramAnalysis' }, // 관계도 차트

  // "023001" 이상치 분석 anomalyFigureAnalysis
  { type: '023001001', name: 'individualContrast' }, // 본인 대비
  { type: '023001002', name: 'groupContrast' }, // 그룹 대비

  // "024" sensitivity 방향 sensitivityDirection
  { type: '024001', name: 'sensitivityOutlier' }, // sensitivity Outlier
  { type: '024002', name: 'sensitivityInlier' }, // sensitivity Inlier

  // "025" 재직 상태 employmentStatus
  { type: '025001', name: 'inOffice' }, // 재직
  { type: '025002', name: 'offWork' }, // 휴직
  { type: '025003', name: 'retirement' }, // 퇴직

  // "026" 대응 상태 responseStatus
  { type: '026001', name: 'responseDiscovered' }, // 발견
  { type: '026002', name: 'responseInProgress' }, // 진행
  { type: '026003', name: 'responseFalsePositive' }, // 오탐
  { type: '026004', name: 'responseExceptionHandling' }, // 예외처리
  { type: '026005', name: 'responseCompleted' }, // 대응완료

  // "027" 대응완료 상태 responseCompletionStatus
  { type: '027001', name: 'incidentOccurredResponse' }, // 사고발생
  { type: '027002', name: 'simpleIssueResponse' }, // 단순이슈
  { type: '027003', name: 'normalResponse' }, // 정상

  // "028" 학습상태 leaningStatus
  { type: '028001', name: 'notLearn' }, // 미학습
  { type: '028002', name: 'readyLearn' }, // 학습예정
  { type: '028003', name: 'progressLearn' }, // 학습중
  { type: '028004', name: 'successLearn' }, // 학습성공
  { type: '028005', name: 'failedLearn' }, // 학습실폐
  { type: '028006', name: 'cancelLearn' }, // 학습취소

  // "029" 차트 종류 chartType
  { type: '029001', name: 'performanceDataRatio' }, // 성능데이터(비율)
  { type: '029002', name: 'performanceDataValue' }, // 성능데이터(수치)
  { type: '029003', name: 'infrastructureSourceLog' }, // 인프라/원천로그

  // "030" 정보 분류 informationClassification
  { type: '030001', name: 'cpu' }, // CPU
  { type: '030002', name: 'mem' }, // MEM
  { type: '030003', name: 'disk' }, // DISK
  { type: '030004', name: 'others' }, // 기타

  // "031" 설정 구분 settingType
  { type: '031001', name: 'employeeSetting' }, // 임직원
  { type: '031002', name: 'infrastructureSetting' }, // 인프라

  // "032" 예측 구분 predictionType
  { type: '032001', name: 'performance' }, // 성능
  { type: '032002', name: 'transaction' }, // 거래

  // "033" 고위험군 스케줄 분류 highRiskGroupScheduleType
  { type: '033001', name: 'registration' }, // 등록
  { type: '033002', name: 'deletion' }, // 삭제

  // "034" 전처리 기간 타입 preprocessingPeriodType
  { type: '034001', name: 'period' }, // 기간
  { type: '034002', name: 'cycle' }, // 주기

  // "035" 전송 구분 transmissionType
  { type: '035001', name: 'monthly' }, // 월간
  { type: '035002', name: 'weekly' }, // 주간
  { type: '035003', name: 'daily' }, // 일간

  // "036" 템플릿 레이아웃 templateLayout
  { type: '036001', name: 'portrait' }, // 세로
  { type: '036002', name: 'landscape' }, // 가로

  // "037" 패널 유형 panelType
  { type: '037001', name: 'barChartPanel' }, // 바 차트
  { type: '037002', name: 'pieChartPanel' }, // 파이 차트
  { type: '037003', name: 'tableChartPanel' }, // 표 차트
  { type: '037004', name: 'lineChartPanel' }, // 라인 차트
  { type: '037005', name: 'numberPanel' }, // 숫자
  { type: '037006', name: 'subtitlePanel' }, // 소제목
  { type: '037007', name: 'htmlChartPanel' }, // HTML 차트
  { type: '037008', name: 'relationshipChartPanel' }, // 관계도 차트

  // "038" 위험지수 riskIndex
  { type: '038001', name: 'veryLow' }, // 매우 낮음
  { type: '038002', name: 'low' }, // 낮음
  { type: '038003', name: 'medium' }, // 보통
  { type: '038004', name: 'high' }, // 높음
  { type: '038005', name: 'veryHigh' }, // 매우 높음

  // "039" 쿼리 구분 queryType
  { type: '039001', name: 'rdbType' }, // RDB
  { type: '039002', name: 'bigDataType' }, // Big Data

  // "040" 패널 차트 방향 panelChartDirection
  { type: '040001', name: 'verticalPanel' }, // 세로
  { type: '040002', name: 'horizontalPanel' }, // 가로

  // "041" 범례 위치 legendPosition
  { type: '041001', name: 'leftLegend' }, // 좌
  { type: '041002', name: 'rightLegend' }, // 우
  { type: '041003', name: 'topLegend' }, // 상
  { type: '041004', name: 'bottomLegend' }, // 하

  // "042" X축 데이터 포맷 xAxisDataFormat
  { type: '042001', name: 'date' }, // 날짜
  { type: '042002', name: 'text' }, // 텍스트

  // "043" 정렬 alignment
  { type: '043001', name: 'alignInLeft' }, // 좌측
  { type: '043002', name: 'alignInCenter' }, // 중간
  { type: '043003', name: 'alignInRight' }, // 우측

  // "044" 소명요청 requestExplanation
  { type: '044001', name: 'explanation' }, // 소명
  { type: '044002', name: 'notification' }, // 통보
  { type: '044003', name: 'unused' }, // 미사용

  // "045" 시나리오 수동실행 상태 scenarioManualExecutionStatus
  { type: '045001', name: 'waitingStatus' }, // 대기중
  { type: '045002', name: 'executingStatus' }, // 실행중
  { type: '045003', name: 'completedStatus' }, // 실행완료

  // "046" 시나리오 수동실행 상세현황 상태 scenarioManualExecutionDetailStatus
  { type: '046001', name: 'waitingDetailStatus' }, // 대기중
  { type: '046002', name: 'executingDetailStatus' }, // 실행중
  { type: '046003', name: 'canceledDetailStatus' }, // 취소됨
  { type: '046004', name: 'completedFailedDetailStatus' }, // 실행완료(실패)
  { type: '046005', name: 'completedSuccessDetailStatus' }, // 실행완료(성공)

  // "047" 자동 가변 필터 autoVariableFilter
  { type: '047001', name: 'variableJfilter' }, // J필터
  { type: '047002', name: 'variableKalman' }, // 칼만

  // "048" 자동가변 칼만필터 알고리즘 autoVariableAlgorithm
  { type: '048001', name: 'variableAlgorithLLT' }, // LLT
  { type: '048002', name: 'variableAlgorithLLP' }, // LLP
  { type: '048002', name: 'variableAlgorithLLPS' }, // LLPS

  // "049" 대응 방법 responseMethod
  { type: '049001', name: 'manual' }, // 수동
  { type: '049002', name: 'automatic' }, // 자동

  // "050" 소명 요청 - 소명 템플릿 관리 requestExplanationTemplate
  { type: '050001', name: 'explanationTemplate' }, // 소명
  { type: '050002', name: 'notificationTemplate' }, // 통보

  // "051" 요청 대상 requestTarget
  { type: '051001', name: 'detectionSubject' }, // 탐지대상
  { type: '051002', name: 'substitute' }, // 대체자

  // "052" 재요청 타입 reRequestType
  { type: '052001', name: 'noRequest' }, // 요청안함
  { type: '052002', name: 'request' }, // 요청

  // "053" 재요청 대상 reRequestTarget
  { type: '053001', name: 'explanationSubjectTarget' }, // 소명대상
  { type: '053002', name: 'substituteTarget' }, // 대체자
  { type: '053003', name: 'seniorApproverTarget' }, // 상위 승인권자

  // "054" 참조자 Referrer
  { type: '054001', name: 'referrerNoRequest' }, // 요청안함
  { type: '054002', name: 'referrerRequest' }, // 요청

  // "055" 이메일 누락자 emailOmitted
  { type: '055001', name: 'emailNoRequest' }, // 요청안함
  { type: '055002', name: 'emailSubstitute' }, // 대체자

  // "056" 등급 구분 gradeType
  { type: '056001', name: 'anomalyActorGrade' }, // 이상행위자
  { type: '056002', name: 'substituteGrade' }, // 대체자
  { type: '056003', name: 'referrerGrade' }, // 참조자
  { type: '056004', name: 'securityOfficerGrade' }, // 보안담당자
  { type: '056005', name: 'approverGrade' }, // 승인자

  // "057" 소명 상태 explanationStatus
  { type: '057001', name: 'explanationRequested' }, // 소명 요청
  { type: '057002', name: 'explanationReRequested' }, // 소명 재요청
  { type: '057003', name: 'explanationApprovalRequested' }, // 승인 요청
  { type: '057004', name: 'explanationApprovalReRequested' }, // 승인 재요청
  { type: '057005', name: 'explanationRejected' }, // 반려
  { type: '057006', name: 'explanationCompleted' }, // 소명 완료
  { type: '057007', name: 'explanationFailed' }, // 소명 실패

  // "058" 소명 상태(이벤트 분석/대응) explanationStatusAndEventAnalysisAndResponse
  { type: '058001', name: 'explanationWaiting' }, // 대기
  { type: '058002', name: 'explanationInProgress' }, // 진행
  { type: '058003', name: 'explanationCompleted' }, // 완료
  { type: '058004', name: 'explanationFailed' }, // 실패
  { type: '058005', name: 'explanationRecalled' }, // 회수

  // "059" 소명 요청 explanationRequest
  { type: '059001', name: 'explanationRequest' }, // 소명 요청
  { type: '059002', name: 'viewDetails' }, // 상세보기
  { type: '059003', name: 'notificationRequest' }, // 통보 요청

  // "060" 파일 접근 타입 fileAccessType
  { type: '060001', name: 'link' }, // Link
  { type: '060002', name: 'storage' }, // Storage
  { type: '060003', name: 'inlog' }, // Inlog

  // "061" 인증 타입 authenticationType
  { type: '061001', name: 'idPassword' }, // ID/PWD
  { type: '061002', name: 'sshKey' }, // SSH KEY

  // "062" 보호문서 분석상태 protectedDocumentAnalysisStatus
  { type: '062001', name: 'beforeAnalysis' }, // 분석전
  { type: '062002', name: 'analyzing' }, // 분석중
  { type: '062003', name: 'analysisCompleted' }, // 분석완료
  { type: '062004', name: 'analysisError' }, // 분석오류

  // "063" 분석결과 대응상태 analysisResultResponseStatus
  { type: '063001', name: 'newDetection' }, // 신규탐지
  { type: '063002', name: 'truePositive' }, // 정탐
  { type: '063003', name: 'falsePositive' }, // 오탐

  // "064" 대상문서 수집상태 targetDocumentCollectionStatus
  { type: '064001', name: 'documentBeforeCollecting' }, // 수집전
  { type: '064002', name: 'documentCollecting' }, // 수집중
  { type: '064003', name: 'documentCollectionCompleted' }, // 수집완료
  { type: '064004', name: 'documentCollectionFailed' }, // 수집실패

  // "065" 연동 분류 integrationType
  { type: '065001', name: 'webhook' }, // Webhook
  { type: '065002', name: 'restApi' }, // REST API

  // "066" 서비스 유형 serviceType
  { type: '066001', name: 'slack' }, // Slack
  { type: '066002', name: 'otherServices' }, // 기타

  // "067" 알림 범위 notificationScope
  { type: '067001', name: 'scenarioNotificationScope' }, // 시나리오 알림
  { type: '067002', name: 'eventOccurrenceNotificationScope' }, // 이벤트 발생 알림

  // "068" 바디 구분 bodyClassification
  { type: '068001', name: 'formData' }, // Form-data
  { type: '068002', name: 'textJson' }, // text-JSON

  // "069" 탐지대상 detectionTarget
  { type: '069001', name: 'employeeDetection' }, // 임직원
  { type: '069002', name: 'assetDetection' }, // 자산

  // "071" 사용자 알림 분류 userNotificationType
  { type: '071001', name: 'scenarioNotification' }, // 시나리오 알림
  { type: '071002', name: 'taskCompletionNotification' }, // 작업 완료 알림

  // "071001" 시나리오 알림 scenarioNotification
  { type: '071001001', name: 'scenarioDetection' }, // 시나리오 탐지

  // "071002" 작업 완료 알림 taskCompletionNotification
  { type: '071002001', name: 'fileDownload' }, // 파일 다운로드
  { type: '071002002', name: 'playbook' }, // 플레이북

  // "071002001" 파일 다운로드 fileDownload
  { type: '071002001001', name: 'exportEventAnalysisResponseList' }, // 이벤트 분석/대응 목록 내보내기

  // "071002002" 플레이북 playbook
  { type: '71002002001', name: 'trainingPlaybook' }, // 학습
  { type: '71002002002', name: 'predictionPlaybook' }, // 예측
  { type: '71002002003', name: 'simulationPlaybook' }, // 시뮬레이션

  // "072" 진행상태 progressStatus
  { type: '072001', name: 'progressWaiting' }, // 대기
  { type: '072002', name: 'progressInProgress' }, // 진행중
  { type: '072003', name: 'progressCompleted' }, // 완료
  { type: '072004', name: 'progressFailed' }, // 실패
  { type: '072005', name: 'progressExpired' }, // 만료
  { type: '072006', name: 'progressDataCollecting' }, // 데이터 수집 중

  // "073" 대시보드 종류 dashboardType
  { type: '073001', name: 'gridType' }, // 그리드형
  { type: '073002', name: 'canvasType' }, // 캔버스형

  // "074" 대시보드 정렬 타입 dashboardSortingType
  { type: '074001', name: 'sortingRecentlyModified' }, // 최근 수정된 순
  { type: '074002', name: 'sortingRecentlyRegistered' }, // 최근 등록된 순
  { type: '074003', name: 'sortingAlphabetical' }, // 가나다순

  // "075" 드릴다운 타입 drillDownType
  { type: '075001', name: 'noDrillDown' }, // 드릴다운 없음
  { type: '075002', name: 'jsearchDrilldown' }, // JSearch 검색
  { type: '075003', name: 'connectToAnotherDashboard' }, // 다른 대시보드 연결
  { type: '075004', name: 'openChartInCurrentDashboard' }, // 현재 대시보드에서 차트 열기
  { type: '075005', name: 'changeCurrentDashboardInputValue' }, // 현재 대시보드 입력값 변경(검색)
  { type: '075006', name: 'connectToCustomUrl' }, // 사용자 지정 URL로 연결

  // "076" 이동 방식 navigationMethod
  { type: '076001', name: 'screenTransition' }, // 화면 전환
  { type: '076002', name: 'newTab' }, // 새 탭

  // "077" 고급 설정 advancedSettings
  { type: '077001', name: 'passClickedValueToTargetDashboard' }, // 클릭한 값을 대상 대시보드에 전달
  { type: '077002', name: 'simpleNavigation' }, // 단순 이동

  // "078" 표시 형식 displayFormat
  { type: '078001', name: 'connectToAnotherChartInDashboard' }, // 대시보드 내 다른 차트 연결
  { type: '078002', name: 'openNewChartAsPopup' }, // 팝업으로 새 차트 열기

  // "079" 연결할 차트 숨김 hideConnectedChart
  { type: '079001', name: 'hidden' }, // 숨김
  { type: '079002', name: 'visible' }, // 노출

  // "080" 대시보드 구분 dashboardCategory
  { type: '080001', name: 'dashboard' }, // 대시보드
  { type: '080002', name: 'folder' }, // 폴더

  // "081" 쿼리 구분 queryCategory
  { type: '081001', name: 'rdbQuery' }, // RDB
  { type: '081002', name: 'jsearchQuery' }, // JSearch

  // "082" 차트 종류 chartCategory
  { type: '082001', name: 'barChart' }, // 바 차트
  { type: '082002', name: 'pieChart' }, // 파이 차트
  { type: '082003', name: 'tableChart' }, // 표 차트
  { type: '082004', name: 'lineChart' }, // 라인 차트
  { type: '082005', name: 'numberChart' }, // 숫자
  { type: '082006', name: 'subtitleChart' }, // 소제목
  { type: '082007', name: 'htmlChart' }, // HTML 차트

  // "083" 차트 갱신 chartRefresh
  { type: '083001', name: 'followBoardSettings' }, // 보드 설정 따라감
  { type: '083002', name: 'followChartSettings' }, // 차트 설정 따라감
  { type: '083003', name: 'noRefresh' }, // 갱신 안함

  // "084" 정렬 설정 alignSettings
  { type: '084001', name: 'leftAlign' }, // 좌측 정렬
  { type: '084002', name: 'centerAlign' }, // 중앙 정렬
  { type: '084003', name: 'rightAlign' }, // 우측 정렬

  // "085" 막대 방향 barDirection
  { type: '085001', name: 'verticalBar' }, // 세로
  { type: '085002', name: 'horizontalBar' }, // 가로

  // "086" 범례 위치 legendLocation
  { type: '086001', name: 'legendAtLeft' }, // 좌
  { type: '086002', name: 'legendAtRight' }, // 우
  { type: '086003', name: 'legendAtTop' }, // 상
  { type: '086004', name: 'legendAtBottom' }, // 하

  // "087" 데이터 추가 방식 dataAdditionMethod
  { type: '087001', name: 'createNewData' }, // 새로 만들기
  { type: '087002', name: 'replaceData' }, // 교체하기
  { type: '087003', name: 'addData' }, // 더하기

  // "088" 데이터 타입 dataType
  { type: '088001', name: 'textType' }, // text
  { type: '088002', name: 'integerType' }, // integer
  { type: '088003', name: 'longType' }, // long
  { type: '088004', name: 'floatType' }, // float
  { type: '088005', name: 'doubleType' }, // double
  { type: '088006', name: 'dateType' }, // date
  { type: '088007', name: 'booleanType' }, // boolean

  // "089" 시나리오 scenario
  { type: '089001', name: 'employees' }, // 임직원
  { type: '089002', name: 'assets' }, // 자산

  // "089001" 임직원 employees
  { type: '089001001', name: 'employeeUserId' }, // 시나리오 임직원 사용자ID
  { type: '089001002', name: 'employeeName' }, // 임직원 사용자 이름
  { type: '089001003', name: 'employeeIdNumber' }, // 임직원 사번
  { type: '089001004', name: 'employeeIP' }, // 임직원 사용자 IP

  // "089002" 자산 assets
  { type: '089002001', name: 'assetIP' }, // 자산 사용자 IP
  { type: '089002002', name: 'assetServerName' }, // 자산 서버명
  { type: '089002003', name: 'assetName' }, // 자산 자산명

  // "090" 이벤트 발생기준
  // "090" 시나리오 eventOccurrence
  { type: '090001', name: 'eventOccScenario' }, // 시나리오 실행 시각
  { type: '090002', name: 'eventOccSourcelog' }, // 원천로그 시각

  // "091" 검색 기간 유형 searchPeriodType
  { type: '091001', name: 'today' }, // 오늘
  { type: '091002', name: 'yesterday' }, // 어제
  { type: '091003', name: 'recentThreeDays' }, // 최근 3일
  { type: '091004', name: 'recentSevenDays' }, // 최근 7일
  { type: '091005', name: 'recentOneMonth' }, // 최근 1개월
  { type: '091006', name: 'recentTwoMonths' }, // 최근 2개월
  { type: '091007', name: 'recentThreeMonths' }, // 최근 3개월
  { type: '091008', name: 'recentSixMonths' }, // 최근 6개월
  { type: '091009', name: 'oneYear' }, // 1년
  { type: '091010', name: 'customDate' }, // 날짜 지정

  // "092" 검색 기간 구분 searchPeriodClassification
  { type: '092001', name: 'useTimePicker' }, // 시간 선택기 사용
  { type: '092002', name: 'useVariable' }, // 변수 사용

  // "093" 검색 주기 유형 searchCycleType
  { type: '093001', name: 'executeByCronSchedule' }, // 크론 스케줄로 실행
  { type: '093002', name: 'executeHourly' }, // 매시간 실행
  { type: '093003', name: 'executeDaily' }, // 매일 실행
  { type: '093004', name: 'executeWeekly' }, // 매주 실행
  { type: '093005', name: 'executeMonthly' }, // 매달 실행

  // "094" 요일 dayOfTheWeek
  { type: '094001', name: 'monday' }, // 월요일
  { type: '094002', name: 'tuesday' }, // 화요일
  { type: '094003', name: 'wednesday' }, // 수요일
  { type: '094004', name: 'thursday' }, // 목요일
  { type: '094005', name: 'friday' }, // 금요일
  { type: '094006', name: 'saturday' }, // 토요일
  { type: '094007', name: 'sunday' }, // 일요일

  // "095" 검색 스케줄 상태 searchScheduleStatus
  { type: '095001', name: 'completedSearch' }, // 완료
  { type: '095002', name: 'failedBySystemError' }, // 시스템 오류로 실패
  { type: '095003', name: 'failedBySearchError' }, // 서치 오류로 실패

  // "096" 태스크 유형 taskType
  { type: '096001', name: 'datasetTask' }, // 데이터셋
  { type: '096002', name: 'dataPreprocessingTask' }, // 데이터 전처리
  { type: '096003', name: 'trainingTask' }, // 학습
  { type: '096004', name: 'predictionTask' }, // 예측
  { type: '096005', name: 'conditionTask' }, // 조건
  { type: '096006', name: 'scenarioTask' }, // 시나리오
  { type: '096007', name: 'dashboardTask' }, // 대시보드

  // "097" 데이터셋 타입 datasetType
  { type: '097001', name: 'trainingDataset' }, // 학습
  { type: '097002', name: 'predictionDataset' }, // 예측

  // "098" 데이터 보간법 dataInterpolationMethod
  { type: '098001', name: 'excludeData' }, // 제외
  { type: '098002', name: 'averageData' }, // 평균
  { type: '098003', name: 'linearData' }, // 선형

  // "099" Scaler 모델 scalerModel
  { type: '099001', name: 'minMaxScaler' }, // MinMax Scaler
  { type: '099002', name: 'standardScaler' }, // Standard Scaler
  { type: '099003', name: 'maxAdjScaler' }, // Max adj Scaler
  { type: '099004', name: 'robustScaler' }, // Robust Scaler

  // "100" 학습 태스크 타입 trainingTaskType
  { type: '100001', name: 'newTrainingTask' }, // 신규 학습 태스크
  { type: '100002', name: 'reTrainingTask' }, // 재학습 태스크

  // "101" 학습 모델 타입 trainingModelType
  { type: '101001', name: 'jdnn' }, // JDNN
  { type: '101002', name: 'timeSeriesDl' }, // TimeSeries DL
  { type: '101003', name: 'xgboost' }, // XGBoost
  { type: '101004', name: 'randomForest' }, // RandomForest
  { type: '101005', name: 'prophet' }, // Prophet

  // "102" 학습 예측 타입 trainingPredictionType
  { type: '102001', name: 'regressionType' }, // Regression
  { type: '102002', name: 'classificationType' }, // Classification

  // "103" 학습 모델 튜닝 trainingModelTuning
  { type: '103001', name: 'autoTuning' }, // Auto
  { type: '103002', name: 'manualTuning' }, // Manual

  // "104" 은닉층 활성화 함수 hiddenLayerActivationFunction
  { type: '104001', name: 'relu' }, // ReLU
  { type: '104002', name: 'tanh' }, // TanH
  { type: '104003', name: 'sigmoid' }, // Sigmoid
  { type: '104004', name: 'leakyRelu' }, // Leaky ReLU
  { type: '104005', name: 'softmax' }, // Softmax

  // "105" 학습 Optimizer trainingOptimizer
  { type: '105001', name: 'adam' }, // Adam
  { type: '105002', name: 'adamw' }, // AdamW

  // "106" 조건 설정 기준 conditionSettingCriteria
  { type: '106001', name: 'taskExecutionResultCriteria' }, // 태스크 실행 결과
  { type: '106002', name: 'queryCriteria' }, // 쿼리

  // "107" 조건 설정 연산자 conditionSettingOperator
  { type: '107001', name: 'equalTo' }, // ==
  { type: '107002', name: 'or' }, // or
  { type: '107003', name: 'and' }, // and
  { type: '107004', name: 'not' }, // not
  { type: '107005', name: 'lessThan' }, // <
  { type: '107006', name: 'greaterThan' }, // >
  { type: '107007', name: 'greaterThanOrEqual' }, // >=
  { type: '107008', name: 'lessThanOrEqual' }, // <=

  // "108" AI 학습 상태 aiTrainingStatus
  { type: '108001', name: 'noTrainingTask' }, // 학습 태스크 없음
  { type: '108002', name: 'trainingRequired' }, // 학습 필요
  { type: '108003', name: 'training' }, // 학습 중
  { type: '108004', name: 'trainingCompleted' }, // 학습 완료
  { type: '108005', name: 'trainingFailed' }, // 학습 실패

  // "109" 은닉층 모델 레이어 종류 hiddenLayerModelLayerType
  { type: '109001', name: 'conv1dCnn' }, // Conv1D (CNN)
  { type: '109002', name: 'lstm' }, // LSTM
  { type: '109003', name: 'dense' }, // DENSE
  { type: '109004', name: 'maxPooling' }, // MaxPooling
  { type: '109005', name: 'batchNorm' }, // BatchNorm
  { type: '109006', name: 'layerNorm' }, // LayerNorm

  // "110" 관리 대상 managementTarget
  { type: '110001', name: 'allManagement' }, // 전체
  { type: '110002', name: 'departmentManagement' }, // 부서
  { type: '110003', name: 'assetGroupManagement' }, // 자산 그룹

  // "111" 작성자 계정 상태 authorAccountStatus
  { type: '111001', name: 'readWriteAvailble' }, // 읽기 쓰기 가능
  { type: '111002', name: 'readOnly' }, // 일기 가능
  { type: '111003', name: 'noMenuAuth' }, // 메뉴 권한 없음
  { type: '111004', name: 'deletedAccount' }, // 삭제된 계정

  // "112" 시나리오 타입 scenarioType
  { type: '112001', name: 'singleScenarioType' }, // 단일 시나리오 타입
  { type: '112002', name: 'complexScenarioType' }, // 복합 시나리오 타입

  // "113" 조건식 타입 conditionalExpressionType
  { type: '113001', name: 'parenthesisExpression' }, // 괄호
  { type: '113002', name: 'operatorExpression' }, // 연산자
  { type: '113003', name: 'scenarioExpression' }, // 시나리오

  // "114" 괄호 parenthesis
  { type: '114001', name: 'openParenthesis' }, // (
  { type: '114002', name: 'closeParenthesis' }, // )

  // "115" 연산자 operator
  { type: '115001', name: 'andOperator' }, // AND
  { type: '115002', name: 'orOperator' }, // OR
  { type: '115003', name: 'minusOperator' }, // -
  { type: '115004', name: 'arrowOperator' }, // ->

  // "116" 자동 대응 학습 상태 automaticResponseTrainingStatus
  { type: '116001', name: 'automaticUntrained' }, // 미학습
  { type: '116002', name: 'automaticTraining' }, // 학습중
  { type: '116003', name: 'automaticTrainingFailed' }, // 학습 실패
  { type: '116004', name: 'automaticTrainingCompleted' }, // 학습 완료

  // "117" 관계도 설정 유형 relationshipDiagramConfigurationType
  { type: '117001', name: 'accessFileRelationship' }, // 출입 / 파일 관계도
  { type: '117002', name: 'emailRelationship' }, // 메일 관계도

  // "118" 기간 옵션 periodOption
  { type: '118001', name: 'periodPermanent' }, // 기간옵션 영구
  { type: '118002', name: 'periodManualInput' }, // 기간옵션 직접 입력
  { type: '118003', name: 'period1Month' }, // 기간옵션 1개월
  { type: '118004', name: 'period3Months' }, // 기간옵션 3개월
  { type: '118005', name: 'period6Months' }, // 기간옵션 6개월
  { type: '118006', name: 'period1Year' }, // 기간옵션 1년

  // "119" 로그인 방식 loginMethod
  { type: '119001', name: 'localLogin' }, // 로컬
  { type: '119002', name: 'ldapLogin' }, // LDAP
  { type: '119003', name: 'samlLogin' }, // SAML

  // "120" 소속 affiliation
  { type: '120001', name: 'regularEmployee' }, // 정직원
  { type: '120002', name: 'partner' }, // 파트너
  { type: '120003', name: 'affiliate' }, // 관계사

  // "121" 검색 타입 searchType
  { type: '121001', name: 'simpleSearch' }, // 간편 검색
  { type: '121002', name: 'detectionDateTime' }, // 탐지 일시

  // "122" 표시 방법 displayMethod
  { type: '122001', name: 'rawDisplay' }, // 원시
  { type: '122002', name: 'listDisplay' }, // List
  { type: '122003', name: 'tableDisplay' }, // Table

  // "123" 시간 검색 옵션 timeSearchOption
  { type: '123001', name: 'eventOccurrenceTimeOption' }, // 이벤트 발생 시각
  { type: '123002', name: 'detectionDateTimeOption' }, // 탐지 일시
  { type: '123003', name: 'responseDateTimeOption' }, // 대응 일시

  // "124" 유사도 모델 similarModel
  { type: '124001', name: 'jaroWinkler' }, // Jaro_winkler
  { type: '124002', name: 'jaro' }, // Jaro
  { type: '124003', name: 'levenshtein' }, // Levenshtein

  // "125" 텍스트 임베딩 대상 textEmbedTarget
  { type: '125001', name: 'textEmbedDomain' }, // 텍스트 임베딩 도메인
  { type: '125002', name: 'textEmbedFile' }, // 텍스트 임베딩 파일
  { type: '125003', name: 'textEmbedEmail' }, // 텍스트 임베딩 이메일

  // "126" 차원 축소법 dimensionalityReduction
  { type: '126001', name: 'svd' }, // 차원 축소 svd
  { type: '126002', name: 'pca' }, // 차원 축소 pca

  // "127" 탐지 설정 detectionConfig
  { type: '127001', name: 'detectDirectConfig' }, // 탐지 설정 직접
  { type: '127002', name: 'detectCustomConfig' }, // 탐지 설정 커스텀 커맨드

  // "128" 탐지 속성 detectionProps
  { type: '128001', name: 'detectPropsMean' }, // 탐지 속성 Mean
  { type: '128002', name: 'detectPropsMedian' }, // 탐지 속성 Median
  { type: '128003', name: 'detectPropsMAx' }, // 탐지 속성 Max

  // "129" 로그인 후 이동화면 postLoginNavigationScreen
  { type: '129001', name: 'mainScreen' }, // 메인 화면
  { type: '129002', name: 'scenarioManagement' }, // 시나리오 관리
  { type: '129003', name: 'eventAnalysisResponse' }, // 이벤트 분석대응
  { type: '129004', name: 'documentSimilarityDetection' }, // 문서유사도 기반탐지

  // "130" 검색결과 내보내기 요청타입 searchResultsExportRequestType
  { type: '130001', name: 'dashboardExport' }, // 대시보드
  { type: '130002', name: 'advancedSearchExport' }, // 고급검색
  { type: '130003', name: 'simpleSearchExport' }, // 간편검색

  // "131" 검색결과 내보내기 파일 형식 searchResultsExportFileFormat
  { type: '131001', name: 'rawFormat' }, // raw
  { type: '131002', name: 'csvFormat' }, // csv
  { type: '131003', name: 'xmlFormat' }, // xml
  { type: '131004', name: 'jsonFormat' }, // json

  // "132" 소명 검색 옵션 explanationSearchOption
  { type: '132001', name: 'explanationTimeSearchOption' }, // 소명 시간 검색옵션
  { type: '132002', name: 'explanationTargetSearchOption' }, // 소명 대상별 검색옵션
  { type: '132003', name: 'explanationState' }, // 소명상태

  // "132001" 소명 시간 검색옵션 explanationTimeSearchOption
  { type: '132001001', name: 'explanationDetectionDateTime' }, // 탐지 일시
  { type: '132001002', name: 'explanationRequestDateTime' }, // 소명 요청 일시

  // "132002" 소명 대상별 검색옵션 explanationTargetSearchOption
  { type: '132002001', name: 'explanationTarget' }, // 소명대상
  { type: '132002002', name: 'detectionTarget' }, // 탐지대상

  // "132003" 소명상태 explanationState
  { type: '132003001', name: 'pendingExplanation' }, // 소명 대기
  { type: '132003002', name: 'inProgressExplanation' }, // 소명 진행중
  { type: '132003003', name: 'completedExplanation' }, // 소명 완료
  { type: '132003004', name: 'failedExplanation' }, // 소명 실패
  { type: '132003005', name: 'withdrawnExplanation' }, // 소명 회수
  { type: '132003006', name: 'notifiedExplanation' }, // 통보
] as const;

const { typeMap, nameMap } = createMapToObject(minorCategoryArray);

export const minorCategoryTypeMap = typeMap;

export const minorCategoryValueMap = nameMap;

export type minorCategoryeMapKey = keyof typeof minorCategoryTypeMap;
export type minorCategoryMapValue = keyof typeof minorCategoryValueMap;
