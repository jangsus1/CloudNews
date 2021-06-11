import os
import shutil
# 함수나 클래스는 이 파일에 별도로 선언하고 사용!!
import lib


# 파일 파싱하는 부분 
# 포맷 : publsiher/date/page_num/(page 또는 keyword).(pdf 또는 csv)
# ex : narasarang/2021-01-01/1/image.pdf
# ex : narasarang/2021-01-01/2/keyword.csv

base = "./data"
publisher_list = os.listdir(base)
for publisher in publisher_list:
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        joined_path = os.path.join(base, publisher, date)
        for i in range(15):
            os.rename(os.path.join(joined_path, str(14-i)), os.path.join(joined_path, str(15-i)))