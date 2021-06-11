import pymysql as mysql
import os
# 함수나 클래스는 이 파일에 별도로 선언하고 사용!!
from libraries import *


# 파일 파싱하는 부분 
# 포맷 : publsiher/date/page_num/(page 또는 keyword).(pdf 또는 csv)
# ex : narasarang/2021-01-01/1/image.pdf
# ex : narasarang/2021-01-01/2/keyword.csv

base = "./data"

#  나라사랑 코드만 있음
ns = []
publisher = "narasarang"
date_list = os.listdir(os.path.join(base, publisher))
for date in date_list:
    pages = []
    page_list = os.listdir(os.path.join(base, publisher, date))
    for page in page_list:
        joined_path = os.path.join(base, publisher, date, page)
        imageURL = os.path.join(joined_path, "news.pdf")[1:]
        #wordcloudURL = os.path.join(joined_path, "wordcloud.img")[1:]
        parsedList = parse_keywords(os.path.join(joined_path, "keyword.csv"))
        pages.append({
            "imageURL" : imageURL,
            #"wordcloudURL" : wordcloudURL,
            "page_number" : int(page),
            "newsId" : 2,
            "keywords" : parsedList
        })
    ns.append({
        "date" : date,
        "pages" : pages
    })  
        
        

conn = mysql.connect(host='localhost', user='root', password='1234', db='gb_db')


try :
    curs = conn.cursor()
    for issue in ns:
        newsInsertSQL = "insert into News (issue_number, issue_date, publisherId) values (%s, %s, %s)"
        newsInsertVal = ("", issue["date"], 2)
        curs.execute(newsInsertSQL)
        for page in issue["pages"]:
            #여기부터 콘틴뉴 -장-
        
        
except Exception as ex:
    print(ex)
finally:
    conn.close()
