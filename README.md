# 🌐 jui-frontend Guide

## 📦 개요

이 레포는 **Next.js 15 (SSR)**, **React 19 + Vite (SPA)** 두 가지 앱과,
공통으로 사용하는 **UI, 토큰, 유틸리티, 타입 패키지**로 구성된 모노레포입니다.

* **패키지 매니저**: `pnpm`
* **빌드 도구**: `Turborepo`
* **언어/프레임워크**: TypeScript, React 19, Next.js 15
* **스타일링**: Tailwind CSS + shadcn/ui
* **테스트**: Jest + React Testing Library
* **문서화/디자인 연동**: Storybook
* **Node.js 버전**: v20.12.0 (`.nvmrc` 기준)

---

## 🏗️ 모노레포 구조

```bash
.
├── apps/                     
│   ├── next-app/             # Next.js 15 (SSR, App Router 기반)
│   └── react-app/            # React 19 + Vite (SPA)
│
├── packages/                 
│   ├── ui/                   # UI 컴포넌트 (shadcn + Tailwind + 아이콘 포함)
│   │   ├── components/       # 버튼, 모달 등 UI 컴포넌트
│   │   ├── icons/            # 아이콘 (SVG → React 컴포넌트)
│   │   └── lib/              # 유틸 (ex. cn)
│   │
│   ├── tokens/               # 디자인 토큰 (palette, spacing 등)
│   ├── utils/                # 헬퍼 함수 모음
│   └── types/                # 전역 타입 정의
│
├── configs/                  
│   ├── typescript-config/    
│   ├── eslint-config/        
│   └── jest-config/          
│
├── scripts/                  
│   ├── generate-icons.ts     # 아이콘 export/type 자동 생성
│   └── generateCss.ts        # 토큰 기반 CSS 변수 파일 생성
│
├── turbo.json                
├── package.json
└── .nvmrc                     # Node.js v20.12.0
```

---

## 🚀 실행 방법

### 1. Node 버전 설정

```bash
nvm use
```

(Node.js v20.12.0 기준)

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 앱 실행

#### Next.js 15 앱

```bash
pnpm next-app dev
pnpm next-app build
pnpm next-app start
```

#### React 19 + Vite 앱

```bash
pnpm react-app dev
pnpm react-app build
pnpm react-app preview
```

---

## 🎨 공통 패키지

### `@common/ui`

* Tailwind + shadcn/ui 기반 UI 컴포넌트 모음
* **아이콘 시스템 포함**

  * `packages/ui/icons/` 디렉토리에 아이콘 존재
  * `createIcon()` 유틸로 SVG → React 변환
  * variant/size/color 지원

#### 아이콘 추가 방법

1. 새로운 아이콘 SVG 파일/코드 추가 (`packages/ui/icons/`)
2. 아이콘 생성 스크립트 실행

```bash
pnpm generate:icons
```

3. 스크립트 실행 시:

   * `index.ts` 자동 업데이트 (아이콘 export)
   * 타입 정의 자동 생성 (`IconName` 등)

```tsx
import { SearchIcon } from '@common/ui/icons';

function Example() {
  return <SearchIcon size="md" color="primary" />;
}
```

---

### `@common/tokens`

* 색상, 폰트, spacing 등 디자인 토큰 정의
* `palette.ts`에서 컬러 팔레트 관리

#### 토큰 변경 후 CSS 변수 생성

```bash
pnpm generate:palette
```

* `scripts/generateCss.ts` 실행
* Tailwind 및 UI에서 사용 가능한 CSS 변수 자동 생성

---

### `@common/utils`

* 공통 헬퍼 함수 모음
* `cn()` 함수 제공 (`clsx + tailwind-merge` 기반)

```ts
import { cn } from '@common/utils';

<div className={cn('p-2', isActive && 'bg-primary')} />
```

---

### `@common/types`

* 전역 TypeScript 타입 모음

---

## 📖 Storybook

UI 컴포넌트는 **Storybook**을 통해 개발/문서화됩니다.

### 실행

```bash
pnpm ui storybook
```

### 주요 기능

* 각 컴포넌트 props/variant/상태별 미리보기
* 디자인 시스템 문서화 (토큰 + 컴포넌트)
* `@common/ui` 변경 시 자동 반영

---

## ⚙️ 공통 설정

### `@common/typescript-config`

공통 `tsconfig` 제공 → 각 앱/패키지에서 `extends`

### `@common/eslint-config`

ESLint 공통 설정 (Next/React 전용 rules 포함)

### `@common/jest-config`

Jest + React Testing Library 환경 공통화

---

## 🧪 테스트 & 린트

```bash
pnpm lint
pnpm test
```

---

## 📚 개발 가이드

1. **토큰 수정 (`@common/tokens`)**

   * `palette.ts` 변경 후 `pnpm generate:palette` 실행
   * Tailwind 및 UI 변수 동기화

2. **아이콘 추가 (`@common/ui/icons`)**

   * SVG 추가 후 `pnpm generate:icons` 실행

3. **UI 컴포넌트 추가 (`@common/ui/components`)**

   * shadcn 패턴 기반 작성
   * `cn()` 함수 활용
   * Storybook 스토리 작성 필수

4. **앱 연동 (`apps/`)**

   * Next.js → SSR & Server Actions
   * React + Vite → CSR & React Router DOM

---

✅ 이제 **Node 버전(.nvmrc)**, **아이콘/토큰 스크립트**, **스토리북**, **UI 개발/변경 워크플로우**까지 포함된 전체 모노레포 README 완성입니다.
