
# frontend

> A Vue.js project

## UML

### 1. 유스케이스 다이어그램

![유스케이스](https://user-images.githubusercontent.com/90189794/133808028-d30e6532-0cf0-4205-b2bb-134c85017c03.png)

### 2. 클래스 다이어그램

![클래스](https://user-images.githubusercontent.com/90189794/133808138-cca8b3c2-44bb-4c86-af22-16b4a5f6a381.png)

## 기술 스택

<img src="https://media.vlpt.us/images/seongkyun/post/89f3edd8-c776-47c6-97cb-c616a2bb3f40/1_Q26gw-kNzOXUqZKRr04T-g.png" width="320"/>

* 단위 테스트 `jest`

<img src="https://media.vlpt.us/post-images/katanazero86/aba9c930-4af7-11ea-b431-d56bc1d096a4/vuejs-tutorial2d2a853c-aa2f-44b0-80df-933b495f77f8.png" width="320"/>

* 웹 프레임워크 `Vue.js 2.x`

<img src="https://media.vlpt.us/images/hanei100/post/3fd2beb9-fb77-4040-b1ef-d1bf66c9ad04/zz.jpg" width="320"/>

* 반응형 웹 / 컴포넌트 라이브러리 `Bootstrap`

<img src="https://joshua1988.github.io/webpack-guide/logo.png" width="320" />

* 웹 빌드 결과물 번들링 `webpack`

<img src="https://i.ytimg.com/vi/rAcWLPQIL38/maxresdefault.jpg" width="320" />

* 웹 호스팅
* 사용자 인증
* DB

<img src="https://blog.kakaocdn.net/dn/bnjjQy/btqCjQAzgo4/9lbUF0dujEkKJFoMtuy5Zk/img.png" width="320" />

* 무료 아이콘 제공

<img src="https://tech.kakao.com/wp-content/uploads/2019/12/eslint.png" width="320" />

* 코드 스타일 교정기

<img src="https://media.vlpt.us/images/beoms96/post/0c6ca405-b9c4-4453-8bd4-aa8f666a40fa/android-github-actions-setup-image-35b6a79fea4a7289acb6796cd4ad05b4.png" width="320" />

* CI & CD 자동화 스크립트 or 워크 플로우 제공

<img src="https://lh3.googleusercontent.com/proxy/y4t1ArKSfJrbFA9plDQ_Qzk9IU6E38KaZFYZGyPcPSwTko4FThfWrt2q9g8U-IX-qj6ywvx9Y_r-Dj3NdV_Chho9YBTwy2ydopaug6Ok2q_viWVceDx9LythFuAn-ic4h6y48xbDcdL_2Vf6UCF0kvN-nE9vlLMhkCkTT7q9pET-b1QbuI4YH3In9YBNn4Nuq5RWYkigAsr4uhqApSi7iDfjMe4l-RDJXUoBcFLmjBgwNtbRqSXUXKY6TbZ0o9T2TkrUUgi_C_jdpd9BgWLiZw" width="320" />

* 카카오 지도 라이브러리 사용

## 작업 방식

### 1. 최신 내용 가져오기

https://user-images.githubusercontent.com/16532326/133426704-b5034b80-38d0-435f-86cf-d80b4cd9ee8f.mov

`Github desktop` 프로그램을 이용해 `main` 브랜치에서 최신 커밋 내용을 가져옴

### 2. 작업할 내용에 대한 브랜치를 빼기

https://user-images.githubusercontent.com/16532326/133427004-0ad85869-d03e-47ef-accc-ba281b9c345f.mov

모두가 같은 `main` 브랜치에서 작업할 경우 서로간 코드가 같은 소스 파일을 수정하는 경우가 발생되어 `충돌 해결 이벤트`를 처리할 경우가 커질 수 있으니 

`작업할 내용에 대한 브랜치`로 분리하여 작업을 하는 것을 추천함

꼭! `Publish` 버튼을 눌러야 `원격 서버(Github)`에도 방금 생성한 브랜치가 반영 됨

### 3. 개발 하기

![스크린샷 2021-09-15 오후 8 45 36](https://user-images.githubusercontent.com/16532326/133427674-c4c6b6ee-18f1-4931-80f8-ac409a8fc414.png)

프로젝트 폴더 내 `src` 폴더가 실제로 개발에 필요한 내용이 담기는 폴더

개발 툴로 만약 `VSCode` 를 사용한다면

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)
- [vue](https://marketplace.visualstudio.com/items?itemName=jcbuisson.vue)
- [vue-beautify](https://marketplace.visualstudio.com/items?itemName=peakchen90.vue-beautify)

Extension 설치를 추천

### 4. 테스트 하기

![스크린샷 2021-09-15 오후 8 51 00](https://user-images.githubusercontent.com/16532326/133428299-3eb482cf-6306-4b41-b32d-95dbe71b426a.png)

위 `src` 폴더에서 작업한 내용에 대한 테스트 케이스를 직접 만들어 테스트를 진행

본 프로젝트에서 사용하는 테스트 모듈은 `jest`

테스트 실행 방법

```
npm run unit
```

https://user-images.githubusercontent.com/16532326/133428561-df475f5b-9438-4cd5-9c7c-b68400966a0b.mov

### 5. 작업 내역 커밋 하기

https://user-images.githubusercontent.com/16532326/133428767-817dde0c-eeba-4282-b1aa-06a7692ff339.mov

작업한 내용에 대한 커밋 메시지를 자유롭게 작성한 후 `Push` 버튼을 눌러 주어야 `원격 서버(Github)` 에 반영이 됨

지금은 `2. 작업할 내용에 대한 브랜치를 빼기` 에 의해 `asdf` 이름의 브랜치에서 작업이 이루어졌기 때문에 `원격 서버(Github)` 에서도 `asdf` 브랜치로 이동해야 작업 내용이 보임

![스크린샷 2021-09-15 오후 8 57 21](https://user-images.githubusercontent.com/16532326/133429119-58f21e73-2aa3-409f-9920-7340d7d6e27f.png)

### 6. `main` 브랜치로 `Pull request` 걸기

`asdf` 브랜치에서 일련의 작업(예시로 버튼 디자인하기 같은 작은 단위의 작업도 괜찮음) 내용이 모두 마쳤으면 

`main` 브랜치로 다른 사람들과의 작업과 자신이 작업한 내용을 통합하기 위한 `Pull request` 를 요청해야 함

https://user-images.githubusercontent.com/16532326/133429590-8a9cf8e2-8b39-4279-991b-9a3ba5ffa3ba.mov

![스크린샷 2021-09-15 오후 9 02 17](https://user-images.githubusercontent.com/16532326/133429779-d5ac1703-6c65-43f9-b331-84d0e993968a.png)

기존에 미리 작성된 테스트 케이스의 테스트와 데모용 홈페이지 URL 생성 기능으로 인해 `Merge` 버튼이 시간이 지나야 보일 수 있음

![스크린샷 2021-09-15 오후 9 03 51](https://user-images.githubusercontent.com/16532326/133429993-871b1a3b-1d6a-4692-b713-55d9b6f30efa.png)

위와 같이 데모용 홈페이지 URL 생성과 `Merge Pull request` 버튼이 초록색으로 변경되어지면 `main` 브랜치로 병합 가능

![asdf](https://images.velog.io/post-images/dooreplay/6a424fa0-e281-11e9-9cc9-c52279a372a5/image.png)

위와 같이 자동 병합이 실패한다는 문구가 표시되어지는 경우 `git conflict issue` 가 발생하였으므로 팀원과 같이 상의하며 어떤 부분의 소스로 수정하여 병합해야하는지 해결해야 함

## Getting started

### 1. 프로젝트 클론

아래 내용을 작업할 폴더 디렉토리로 이동한 다음 터미널(커멘드 라인) 에 작성하여 실행

* 윈도우일 경우 git 프로그램을 설치해야 할 수 있음

```bash
git clone https://github.com/foodsns/Frontend.git
```

### 2. 의존성 해결

![스크린샷 2021-09-09 오후 4 24 42](https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png)

클론 받은 내용이 있는 디렉토리로 이동한 후 의존성 모듈 설치

```bash
cd Frontend
npm i
```

### 3. 프로젝트 빌드 

![스크린샷 2021-09-09 오후 4 29 45](https://user-images.githubusercontent.com/16532326/132642176-6af45d33-dc6d-4bad-b02f-66638dcfde92.png)


`Vue.js` 웹 페이지 프로젝트 빌드

```bash
npm run build
```

빌드 된 내용은 `Frontend/dist/` 폴더 참조

### 4. 프로젝트 단위 테스트 && E2E (End to end) 테스트

#### 4-1. 단위 테스트

![스크린샷 2021-09-09 오후 4 30 45](https://user-images.githubusercontent.com/16532326/132642326-343db17c-6a34-4056-9f1a-6b7197e73217.png)

각 컴포넌트별 테스트 (`jest` 사용)

테스트 정의 파일은 `Frontend/test/unit/specs/*.spec.js` 패턴으로 정의되어있음

#### 4-2. E2E 테스트

![스크린샷 2021-09-09 오후 11 59 47](https://user-images.githubusercontent.com/16532326/132710797-63f2e67e-e579-40ee-9833-3fc6432aa437.png)

`selenium` 활용 크롬브라우저로 테스트 진행 (`nightwatchjs` 사용)

```bash
npm run test
```

### 5. 프로젝트 실행 (Hot reload 적용됨)

![스크린샷 2021-09-09 오후 4 32 08](https://user-images.githubusercontent.com/16532326/132642502-561fa132-56db-4748-8ad0-74c4f5ef93bf.png)
![스크린샷 2021-09-09 오후 4 32 31](https://user-images.githubusercontent.com/16532326/132642547-46625126-2491-4079-b825-e2478db441fc.png)


```bash
npm run dev
```
