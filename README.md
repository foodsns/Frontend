
# frontend

> A Vue.js project

## Getting started

1. 프로젝트 클론

아래 내용을 작업할 폴더 디렉토리로 이동한 다음 터미널(커멘드 라인) 에 작성하여 실행

* 윈도우일 경우 git 프로그램을 설치해야 할 수 있음

```bash
git clone https://github.com/foodsns/Frontend.git
```

2. 의존성 해결

![스크린샷 2021-09-09 오후 4 24 42](https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png)

클론 받은 내용이 있는 디렉토리로 이동한 후 의존성 모듈 설치

```bash
cd Frontend
npm i
```

3. 프로젝트 빌드 

![스크린샷 2021-09-09 오후 4 29 45](https://user-images.githubusercontent.com/16532326/132642176-6af45d33-dc6d-4bad-b02f-66638dcfde92.png)


`Vue.js` 웹 페이지 프로젝트 빌드

```bash
npm run build
```

빌드 된 내용은 `Frontend/dist/` 폴더 참조

4. 프로젝트 단위 테스트

![스크린샷 2021-09-09 오후 4 30 45](https://user-images.githubusercontent.com/16532326/132642326-343db17c-6a34-4056-9f1a-6b7197e73217.png)

각 컴포넌트별 테스트 (`jest` 사용)

테스트 정의 파일은 `Frontend/test/unit/specs/*.spec.js` 패턴으로 정의되어있음

```bash
npm run test
```

5. 프로젝트 실행 (Hot reload 적용됨)

![스크린샷 2021-09-09 오후 4 32 08](https://user-images.githubusercontent.com/16532326/132642502-561fa132-56db-4748-8ad0-74c4f5ef93bf.png)
![스크린샷 2021-09-09 오후 4 32 31](https://user-images.githubusercontent.com/16532326/132642547-46625126-2491-4079-b825-e2478db441fc.png)


```bash
npm run dev
```
