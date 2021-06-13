import os
import shutil
from pdf2image import convert_from_path


# 파일 파싱하는 부분 
# 포맷 : publsiher/date/page_num/(page 또는 keyword).(pdf 또는 csv)
# ex : narasarang/2021-01-01/1/image.pdf
# ex : narasarang/2021-01-01/2/keyword.csv

base = "./data"
publisher_list = os.listdir(base)
for publisher in publisher_list:
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        page_list = os.listdir(os.path.join(base, publisher, date))
        for page in page_list:
            joined_path = os.path.join(base, publisher, date, page)
            converted = convert_from_path(os.path.join(joined_path, "news.pdf"), 500, single_file=True)
            converted[0].save(os.path.join(joined_path, "news.jpg"), 'jpeg')
            