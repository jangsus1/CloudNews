# 국방신문 종합 키워드 분석 서비스

**Team : [장민석](https://github.com/jangsus1/)(서비스 개발 총괄), [이승윤](https://github.com/dltmddbs100/)(데이터 분석 총괄), 박재현, 장일현**

![공공데이터](https://user-images.githubusercontent.com/46769685/148499961-2f39efff-778f-49a8-b0ee-b5005617d231.jpg)
    
    본 서비스는 2021 국방 공공데이터 활용 경진대회 서비스 개발부문 출품작입니다.

## 1. Introduction
국방 공공데이터 활용 경진대회는 국방부에서 제공한 공공데이터를 활용한 아이디어 또는 웹/앱 서비스를 개발하는 대회입니다.  
본 서비스는 개발부문의 출품작으로서 국방신문 데이터를 활용한 종합 키워드 분석 서비스입니다.

#### - 공공데이터 선택과 아이디어 브레인스토밍 -

저희는 대회에서 제공된 국방 공공데이터 중 가공 난이도가 높지만 활용 가능성이 높은 신문 이미지 데이터를 선택했습니다.  
신문에서 텍스트 데이터를 추출하여 키워드 분석 기능을 제공하는 서비스를 구상했습니다.

## 2. Data Pipeline
신문 이미지 파일에서 깨끗한 텍스트 데이터를 추출하기 위한 데이터 가공 pipeline을 구상했습니다.
![데이터 프로세스](https://user-images.githubusercontent.com/46769685/148501463-50415520-6512-4af3-aa4c-94b08753e6ba.PNG)

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

## 3. Web Development
정제된 데이터를 웹 서비스로 배포합니다.

+ 수집된 data들을 dataframe 형식으로 통합
+ Regex를 이용해 전체 텍스트들을 통상적인 기준으로 1차 정제
+ 팀원들과 분담해 잘못된 문법 또는 일부주제에 지나치게 편향된 내용(여행기, 학창시절 이야기 등)을 가진 텍스트들을 눈으로 확인하며 제거
+ 최종적으로 약 17mb(2차) / 7mb(3차) 크기의 질 좋은 데이터 선정


## 4. Model Training Strategy
제공된 서버에서는 NVIDIA T4 환경에서 마인즈랩의 자체 GPT2모델을 학습할 수 있도록되어있습니다.  
모델 자체는 비공개로 수정이 불가능하며, hyper-parameter와 모델에 데이터를 어떤방식으로 투입할지를 조절하는 feeder와
generation시에 사용하는 sampling method 정도만 수정이 가능했습니다. 제한된 환경에서 활용한 전략입니다.

**1. 제한된 메모리 - batch size의 제한**  
=> accumulation step 활용

**2. 문서의 max sequnece length 편차가 심함 - max sequence length 초과시 내용의 뒷부분이 소실**  
=> 로컬에서 sentence tokenizer 구현해 train data가 max sequence length를 초과하지 않도록 여러 데이터 단위로 분할
```python
def sent_tokenizer(data,max_len):
  final_list=[]
  for contents in tqdm(data['contents']):
    sents = split_text_into_sentences(contents)
    sent_len = len(sents)
    if sent_len > 3:
      len_i=[0]
      while sent_len-(sum(len_i)+1)!=0: 
        imsi=[]
        sent=[]
        for i in sents[sum(len_i):]:
          if sum(imsi)<max_len:
            sent.append(i)
            imsi.append(len(mecab.morphs(i)))
          else:
            pass
        imsi.pop()
        sent.pop()
        
        final_list.append(' '.join(sent))
        len_i.append(len(imsi))
  return final_list
 ```

**3. train data를 모델에 주입시에 사용되는 feeder method가 문단 연결성을 저하**  
=> 문단 연결성의 저하를 막도록 custom feeder method 구현  
```python
def _sent_custom_append(self, text, length):
 sentences = split_text_into_sentences(text)
 sentences_tokenized = self.tokenizer.tokenize(sent) for sent in sentences if sent is not '']
 
 begin_index = 0
 
 selected_sents = sentences_tokenized[begin_index:]
 
 token_ids = self.tokenizer.convert_tokens_to_ids([token for sent in selected_sents for token in sent])
 while len(token_ids) < length:
  appending_text = random.choice(self.text_files).read_text(encoding='utf-8')
  token_ids += self.tokenizer.convert_tokens_to_ids(self.tokenizer.tokenize(appending_text))
  
 return token_ids[:length]
```

**4. generation시 top-p 또는 top-k만 사용 가능**  
=> top-p & top-k 동시적용으로 수정
```python
def top_p_tok_k_logits(logits, p, k):
 with tf.variable_scope('top_p_top_k_logits'):
  logits_sort = tf.sort(logits, direction='DESCENDING')
  probs_sort = tf.nn.softmax(logits_sort)
  indices = tf.constant(np.tile(np.arange(logits.shape[1].value), (logits.shape[0].values,1)))
  probs_sums = tf.cumsum(probs_sort, axis=-1, exclusive=True)
  
  logits_masked = tf.where((probs_sums < p) & (indeices < k), logits_sortm, tf.ones_like(logits_sort)*1000)
  min_logits = tf.reduce_min(logits_masked, axis=1, keepdims=True)
  
  return tf.where(
   logits < min_logits,
   tf.ones_like(logits, dtype=logits.dtype) * -1e10,
   logits
  )
```

**5. 두 가지 유형의 모델 사용**  

<img src="https://user-images.githubusercontent.com/55730591/147868729-cdafd639-c7dc-4eb7-bb86-3e199945b09c.png" width="900" height="400"/>


## 5. Model Inference
추론 단계에서 입력한 첫단어는 '햇살'입니다. 해당 단어를 통해 나온 **'햇살이 스르륵 손에 잡힐 듯한 투명한 창 안에는 봄이 떠오른다.'** 가 시작 문장으로 자연스럽게 계절로 연결되어 계절의 흐름으로 글을 시작할 수 있었습니다. 그 후 생성된 문장을 다시 입력으로 투입함을 반복하는 regressive한 방식으로 작품을 생성해나갔습니다. 내용의 구체화가 필요한 부분에서는 후자의 모델을, 추상화가 필요한 부분에서는 전자의 모델을 사용하는 방식으로 두 가지 유형의 모델을 적절히 선택하여 사용했으며, 여러개의 generate된 후보문장들을 대상으로 매끄러운 문장을 선정하였습니다. 계절의 변화가 필요한 부분에서는 '여름' 또는 '뜨거운'과 같이 연상되는 단어를 입력해 매끄럽게 연결될 수 있도록 했습니다.

그 후 생성된 작품을 토대로 맞춤법 및 띄어쓰기 교정, 문단 구분을 통해 퇴고를 진행해 작품을 완성했습니다.


## 6. Result
**`인연(人然): 교감, 그리고 성장`**

자연을 모티브로 삶아 계절이 바뀌어감에 따라 사람과 자연이 교감하며 비춰지는 사람의 성장의 모습을 그려냈습니다.  

![image](https://user-images.githubusercontent.com/55730591/147868962-0720ece6-1255-445d-8a6d-79c0d6e9f241.png)
![image](https://user-images.githubusercontent.com/55730591/147869009-9aaefd83-51cf-4ab5-a7fd-486f45489a5a.png)

#### 문장예시
+ 동행의 언어에는 삶의 이야기와 한 장의 문장이 담겨있다.
+ 창을 통해 비추는 햇살이 내 손을 잡았다. 싹이 돋은 솜털 같았다.
+ 봄의 산은 우리를 두근거리게 하고 그에 스며든 신록의 초록빛은 희망과 온기를 안겨준다.
+ 창을 통해 비친 푸른 바다와 눈부시게 비치는 햇살은 우리를 새로운 환상의 세계로 스며들게 하는 듯 하다.

최종적으로 생성된 수필의 내용은 [이곳](https://github.com/dltmddbs100/The-3th-AI_Bookathon/blob/main/outputs/%EC%9D%B8%EC%97%B0(%E4%BA%BA%E7%84%B6).pdf)에서 확인하실 수 있습니다.
