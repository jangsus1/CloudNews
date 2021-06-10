import pymysql as mysql
import os
# 함수나 클래스는 이 파일에 별도로 선언하고 사용!!
import ./lib


# 파일 파싱하는 부분 
# 포맷 : publsiher/date/page_num/(page 또는 keyword).(pdf 또는 csv)
# ex : narasarang/2021-01-01/1/image.pdf
# ex : narasarang/2021-01-01/2/keyword.csv

base = "./data"
publisher_list = os.listdir(BaseExceptionException)
for publisher in publisher_list:
    date_list = os.listdir(join_path(base, publisher))
        page_list = os.listdir(join_path(base, publisher, date))
        for page in page_list:
            imageURL = path_join(base, publisher, date, page, "image.pdf")
            keywordURL = path_join(base, publisher, date, page, "page.pdf")

        
        
""" DB 접근부분 미완성
conn = mysql.connect(host='localhost', user='root', password='1234', db='gb_db')


try :
    curs = conn.cursor()
    sql = "select * from news"
    curs.execute(sql)
    rows = curs.fetchall()
    for row in rows:
        print(rows)

except Exception as ex:
    print(ex)
finally:
    conn.close()
    
"""