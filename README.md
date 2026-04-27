# React Portfolio

웹 퍼블리셔로서 쌓아온 작업물을 체계적으로 정리하고, React 생태계 기술을 실제 프로젝트에 적용해보기 위해 제작한 개인 포트폴리오 사이트입니다.

배포: http://woosung-portfolio.woobi.co.kr/

---

## 제작 배경

포트폴리오를 계획하면서, 단순히 UI만 새로 만드는 것에 그치지 않고 실무에서 자주 쓰이는 Zustand와 TanStack Query를 실제로 설계해보는 기회로 삼았습니다. 데이터는 JSON으로 분리하여 관리하고, 상태 관리 구조를 명확히 구분하는 것을 목표로 설계했습니다.

---

## 기술 스택

| 분류      | 사용 기술          |
| --------- | ------------------ |
| UI        | React 18           |
| 라우팅    | React Router v6    |
| 전역 상태 | Zustand v5         |
| 서버 상태 | TanStack Query v5  |
| 스타일링  | SCSS + CSS Modules |
| 빌드      | Vite               |
| 슬라이더  | Swiper             |

---

## 설계 의도 및 기술적 결정

### Zustand와 TanStack Query의 역할 분리

상태 관리 라이브러리를 단일하게 사용하지 않고, 상태의 성격에 따라 두 가지를 구분하여 적용했습니다.

- **TanStack Query**: JSON 데이터 fetch 및 캐싱 담당. `staleTime: Infinity`를 설정하여 동일 세션 내에서는 네트워크 재요청 없이 캐시된 데이터를 사용합니다. 로딩·에러 상태 처리도 훅 내부에서 일관되게 관리합니다.
- **Zustand**: 필터 선택 상태, 모달 열림 여부 등 순수한 UI 상태 담당. 비동기 처리나 캐싱이 필요 없는 클라이언트 전용 상태에 해당하므로 TanStack Query 대신 Zustand로 분리했습니다.

```
UI 상태 (필터, 모달 열림 여부)         → Zustand
서버 데이터 (projects.json, profile.json) → TanStack Query
```

### ProjectGrid 컴포넌트 재사용 설계

Portfolio 페이지와 Personal 페이지는 레이아웃과 동작이 동일하고, 차이는 "어떤 데이터를 사용하느냐" 하나뿐입니다. 페이지마다 별도 컴포넌트를 만드는 대신, `useData` prop으로 데이터 훅을 주입받는 방식을 선택했습니다.

```jsx
// Portfolio 페이지
<ProjectGrid useData={useProjects} />

// Personal 페이지
<ProjectGrid useData={usePersonalProjects} variant="personal" />
```

컴포넌트는 어떤 훅이 전달되는지와 무관하게 동작하므로, 새로운 섹션이 추가될 경우 JSON 파일과 훅만 추가하면 확장이 가능합니다.

### 실시간 필터링과 useMemo

검색어와 태그 조건이 변경될 때마다 전체 프로젝트 배열을 순회하여 필터링합니다. 데이터 규모가 크지 않더라도 불필요한 재연산을 방지하기 위해 `useMemo`를 적용했으며, `projects`, `searchQuery`, `selectedTags`를 의존성으로 지정하여 실제 변경이 있을 때만 연산이 수행되도록 했습니다.

### 페이지 이동 시 필터 상태 초기화

Zustand 스토어는 전역 상태이므로, 페이지를 이동해도 이전 필터 상태가 유지됩니다. Portfolio에서 Personal로 이동했을 때 이전 필터가 그대로 남아 있으면 의도치 않은 빈 결과가 표시될 수 있습니다. 각 페이지 컴포넌트에서 `useEffect`로 `clearFilters()`를 호출하여, 페이지 진입 시 항상 초기 상태에서 시작하도록 처리했습니다.

### 모달 접근성

`createPortal`을 사용하여 `document.body`에 마운트함으로써 z-index 스택 문제를 방지했습니다. 접근성과 관련하여 아래 항목들을 적용했습니다.

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`로 스크린 리더 대응
- 모달 열릴 때 닫기 버튼으로 포커스 이동 (`useRef` + `focus()`)
- ESC 키로 닫기 (`keydown` 이벤트 등록 및 클린업)
- 모달 활성 시 배경 스크롤 잠금 (`document.body.style.overflow = 'hidden'`)

### 프로젝트 이미지 슬라이더

이미지가 여러 장인 프로젝트를 대비하여 Swiper를 적용했습니다. 기존 단일 `thumbnail` 문자열과의 하위 호환을 유지하면서, `thumbnail` 배열 또는 `thumbnails` 배열을 모두 처리할 수 있도록 정규화 로직을 구현했습니다.

```js
const images = (() => {
  if (project.thumbnails?.length) return project.thumbnails;
  if (Array.isArray(project.thumbnail)) return project.thumbnail;
  if (project.thumbnail) return [project.thumbnail];
  return [];
})();
```

---

## 폴더 구조

```
src/
├── components/
│   ├── FilterBar/           # 검색 입력 + 태그 체크박스 필터
│   ├── Header/              # 네비게이션
│   ├── ProjectCard/         # 프로젝트 카드 (썸네일, 태그, 링크)
│   ├── ProjectGrid/         # 카드 목록 + 필터 통합 컴포넌트
│   └── ProjectModal/        # 프로젝트 상세 모달 (Swiper 포함)
├── hooks/
│   ├── useProjects.js           # 포트폴리오 데이터 fetch
│   ├── usePersonalProjects.js   # 개인 프로젝트 데이터 fetch
│   └── useProfile.js            # 프로필 데이터 fetch
├── pages/
│   ├── ProfilePage/         # 프로필
│   ├── PortfolioPage/       # 업무 프로젝트 목록
│   └── PersonalPage/        # 개인 프로젝트 목록
├── stores/
│   ├── useFilterStore.js    # 필터 상태 (Zustand)
│   └── useModalStore.js     # 모달 상태 (Zustand)
└── styles/
    ├── _variables.scss      # 디자인 토큰 (색상, 간격, 폰트 등)
    ├── _mixins.scss         # 반응형 브레이크포인트, 유틸 믹스인
    ├── _shared.scss         # @forward 진입점
    └── global.scss          # 전역 기본 스타일
```

---

## 데이터 관리

| 파일                        | 설명                   |
| --------------------------- | ---------------------- |
| `public/data/projects.json` | 업무 프로젝트 목록     |
| `public/data/personal.json` | 개인 프로젝트 목록     |
| `public/data/profile.json`  | 프로필 및 이력 정보    |
| `public/img/`               | 프로젝트 썸네일 이미지 |

---

## 배포 자동화 (CI/CD)

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 후 FTP 서버에 배포합니다.

```
main 브랜치 push
  → GitHub Actions 트리거
  → Node.js 설치 및 npm ci
  → npm run build (dist/ 생성)
  → FTP-Deploy-Action으로 서버에 업로드
```

워크플로 파일은 `.github/workflows/deploy.yml`에 정의되어 있습니다.

### 증분 배포

매 배포마다 `dist/` 전체를 올리지 않고, 이전 배포와 비교하여 변경된 파일만 선택적으로 업로드합니다. 배포 이력은 `.ftp-deploy-sync.json`으로 관리되며 GitHub Actions Artifact에 저장되어 다음 배포 시 참조됩니다.

### 필요한 GitHub Secrets 설정

저장소의 `Settings > Secrets and variables > Actions`에서 아래 항목을 등록해야 합니다.

| Secret 이름      | 설명                              |
| ---------------- | --------------------------------- |
| `FTP_HOST`       | FTP 서버 주소                     |
| `FTP_USERNAME`   | FTP 계정명                        |
| `FTP_PASSWORD`   | FTP 비밀번호                      |
| `FTP_TARGET_DIR` | 서버 업로드 경로 (예: `/public_html/`) |
