import pymysql as mysql
import os
# 함수나 클래스는 이 파일에 별도로 선언하고 사용!!
from libraries import *
from pdf2image import convert_from_path
import traceback


# 파일 파싱하는 부분 
# 포맷 : publsiher/date/page_num/(page 또는 keyword).(pdf 또는 csv)
# ex : narasarang/2021-01-01/1/image.pdf
# ex : narasarang/2021-01-01/2/keyword.csv

base = "./data"

#  나라사랑 코드만 있음
print("나라사랑신문")
ns = []
publisher = "narasarang"
date_list = os.listdir(os.path.join(base, publisher))
for date in date_list:
    print(date)
    pages = []
    page_list = os.listdir(os.path.join(base, publisher, date))
    for page in page_list:
        print(page+", ", end='')
        joined_path = os.path.join(base, publisher, date, page)
        pageImageURL = os.path.join(joined_path, "news.pdf")[1:]
        wordcloudURL = "" # os.path.join(joined_path, "wordcloud.img")[1:]
        parsedList = parse_keywords(os.path.join(joined_path, "keyword.csv"))
        pages.append({
            "pageImageURL" : pageImageURL,
            "wordcloudURL" : wordcloudURL,
            "pageNumber" : int(page),
            "newsId" : 2,
            "keywords" : parsedList
        })
    print("페이지 완료")
    mainImageURL = os.path.join(base, publisher, date,"1", "news.jpg")
    if(not os.path.isfile(mainImageURL)):
        print("메인이미지 생성")
        convert_from_path(os.path.join(base, publisher, date,"1", "news.pdf"), 500, single_file=True)[0].save(mainImageURL, 'jpeg')
    ns.append({
        "date" : date,
        "pages" : pages,
        "mainImageURL" : mainImageURL[1:]
    })  
        
        

        
        
conn = mysql.connect(host='localhost', user='root', password='1234', db='gb_db')


try :
    curs = conn.cursor()
    for news in ns:
        newsInsertSQL = "insert into news (mainImageURL, issueDate, createdAt, updatedAt,  publisherId) values (%s, %s, %s, %s, %s)"
        newsInsertVal = (news["mainImageURL"], news["date"], today(), today(), 2)
        curs.execute(newsInsertSQL, newsInsertVal)
        newsId = curs.lastrowid
        for page in news["pages"]:
            pageInsertSQL = "insert into pages (pageNumber, pageImageURL, wordcloudURL, createdAt, updatedAt, newsId) values (%s, %s, %s, %s, %s, %s)"
            pageInsertVal = (page["pageNumber"], page["pageImageURL"], page["wordcloudURL"], today(), today(), newsId)
            curs.execute(pageInsertSQL, pageInsertVal)
            pageId = curs.lastrowid
            keywordInsertSQL = "insert into keywords (word, count, rank, createdAt, updatedAt, pageId) values (%s, %s, %s, %s, %s, %s)"
            keywordInsertVal = [(k["word"], k["count"], k["rank"], today(), today(), pageId) for k in page["keywords"]]
            curs.executemany(keywordInsertSQL, keywordInsertVal)
    conn.commit()
except Exception as ex:
    conn.rollback()
    print(ex)
    traceback.print_exc()
    
finally:
    conn.close()