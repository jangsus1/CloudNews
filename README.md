# Cloud News : 자연어 처리 및 OCR을 이용한 군 신문 빅데이터 분석 서비스

**Team: Mint Chocolate [[장민석](https://github.com/jangsus1/)(서비스 개발 총괄), [이승윤](https://github.com/dltmddbs100/)(데이터 분석 총괄), 박재현, 장일현]**

![공공데이터](https://user-images.githubusercontent.com/46769685/148499961-2f39efff-778f-49a8-b0ee-b5005617d231.jpg)
    
    본 서비스는 2021 국방 공공데이터 활용 경진대회 서비스 개발부문 출품작입니다.

## 1. Introduction
국방 공공데이터 활용 경진대회는 국방부에서 제공한 공공데이터를 활용한 아이디어 또는 웹/앱 서비스를 개발하는 대회입니다.  
본 서비스는 개발부문의 출품작으로서 국방신문 데이터를 활용한 종합 키워드 분석 서비스입니다.

#### - 공공데이터 선택과 아이디어 브레인스토밍 -

저희는 대회에서 제공된 국방 공공데이터 중 가공 난이도가 높지만 활용 가능성이 높은 신문 이미지 데이터를 선택했습니다.  
신문에서 텍스트 데이터를 추출하여 키워드 분석 기능을 제공하는 서비스를 구상했습니다.

## 2. Data Analysis


### Data Extraction
신문 공공데이터는 서로 다른 4개의 신문사에서 각각 발행되는 국방신문을 이용했습니다.(국방일보, 공사신보, 육사신보, 나라사랑신문)  
수집된 데이터는 파일종류를 기준으로 분류하여 다른 기법으로 텍스트를 추출했습니다.  
* pdf 문서 -> python의 PyPDF 라이브러리를 이용하여 추출  
* jpg 이미지 -> 알PDF에서 제공하는 OCR기능을 이용하여 추출  

### Data Preprocessing
추출된 데이터의 오타를 제거하기 위해 python의 맞춤법 검사 라이브러리 hanspell을 사용했습니다.  

### Keyword Extraction
형태소 분석기를 통해 추출된 키워드를 바탕으로 신문별 빈출 키워드를 지정합니다.  
이때, 무의미한 키워드가 빈출 키워드로 지정되지 않도록 필터링 작업을 거칩니다.

### Visualization
추출된 빈출 키워드들을 효과적으로 보여주기 위해 3가지 방법으로 시각화합니다.  
WordCloud 이미지를 생성하여 전체 키워드를 그림으로 시각화합니다.  
Top Keyword를 도표로 제시하여 고빈출 키워드를 시각화합니다.  
WordChart를 생성하여 키워드별 상대빈도수를 시각화합니다.

## 2. Data Pipeline
신문 데이터 원본으로부터 데이터베이스까지 연결되는 Data Pipeline을 구상했습니다.
![데이터 프로세스](https://user-images.githubusercontent.com/46769685/148501463-50415520-6512-4af3-aa4c-94b08753e6ba.PNG)

* 파일 형식의 데이터를 가공하여 DB에 저장
* 자동화된 데이터 처리 파이프라인의 기반으로 분석이 완료된 개별 CSV, PDF 등을 데이터베이스 스키마에 맞게 가공하여 테이블에 삽입. (파이프라인 구성 시 가볍고 빠르게 동작할 수 있도록 최대한 파이썬 내장 라이브러리만을 활용하여 자체 개발)
* 삽입된 데이터를 기반으로 웹사이트에서 동적 차트 구현 및 화면 세부 구성.
* 추후, 추가되는 신문데이터를 공공데이터 API로 받을 수 있게 되면 분석 코드와 융합하여 새로운 신문 및 키워드를 실시간으로 데이터베이스에 추가하는 파이프라인으로 확장이 용이하도록 개발. (API -> DataAnalysis code -> csv/pdf file -> PipeLine -> DB -> Web)

## 3. Web Development
정제된 데이터를 웹 서비스로 배포합니다.
![image](https://user-images.githubusercontent.com/46769685/148503726-c1fd2284-c8c6-4fad-b716-586aae614efb.png)

+ 4가지 신문에 대한 뉴스정보를 통합해 제공.
+ 날짜 필터링과 원하는 키워드 검색기능.
+ 뉴스 상위 키워드 도출 및 동적 차트와 워드 클라우드를 이용한 시각화.
+ 신문 면 단위의 키워드와 해당 호의 중심 키워드를 같이 제공.
+ 사용자가 시각적인 부담을 느끼지 않을 수 있는 색감을 고려해 화면 UI를 구성.
+ 사용자 편의를 고려해 쉬운 화면 넘김, 로딩, 시각화 요소들을 최적화.

### Development Environment
- 개발 및 임시 배포용 클라우드 서버 goorm IDE 사용
- Javascript: nodeJs + ExpressJs
- Design Framework: Bootstrap + tailwind css
- Data Base: MYSQL
- 데이터 정제 및 분석: Python – Google Colab 사용

## Affendix
세부적인 내용은 [사업계획서](https://github.com/jangsus1/CloudNews/blob/master/%EC%82%AC%EC%97%85%EA%B3%84%ED%9A%8D%EC%84%9C.pdf)를 참고하여 주시기 바랍니다.  

웹서비스는 [여기](https://cloudnews.run.goorm.io/)로 접속하시면 이용하실 수 있습니다.  
**(+ 현재 대회 종료로 인해 웹서비스 접속은 불가합니다. 너른 양해 부탁드립니다.)**
