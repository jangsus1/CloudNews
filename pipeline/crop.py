import os
import shutil
from pdf2image import convert_from_path
from PIL import Image

# wordcloud 사진 crop 하는 코드임다



#preset
left = 112
right = 620
top = 194
bottom = 523

base = "./data"
publisher_list = os.listdir(base)
for publisher in publisher_list:
    if (publisher != "gukbang"): continue 
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        page_list = os.listdir(os.path.join(base, publisher, date))
        for page in page_list:
            joined_path = os.path.join(base, publisher, date, page)
            print(joined_path)
            img = Image.open(os.path.join(joined_path, "wordcloud.png"))
            img = img.convert('RGB')
            img = img.crop((left, top, right, bottom))
            img.save(os.path.join(joined_path, "wordcloud.jpg"))
     
for publisher in publisher_list:
    if (publisher != "narasarang"): continue 
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        page_list = os.listdir(os.path.join(base, publisher, date))
        for page in page_list:
            joined_path = os.path.join(base, publisher, date, page)
            print(joined_path)
            img = Image.open(os.path.join(joined_path, "wordcloud.png"))
            img = img.convert('RGB')
            img = img.crop((left, top, right, bottom))
            img.save(os.path.join(joined_path, "wordcloud.jpg"))
        
for publisher in publisher_list:
    if (publisher != "uksasinbo"): continue 
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        page_list = os.listdir(os.path.join(base, publisher, date))
        for page in page_list:
            joined_path = os.path.join(base, publisher, date, page)
            print(joined_path)
            img = Image.open(os.path.join(joined_path, "wordcloud.png"))
            img = img.convert('RGB')
            img = img.crop((left, top, right, bottom))
            img.save(os.path.join(joined_path, "wordcloud.jpg"))
            
for publisher in publisher_list:
    if (publisher != "gongsa"): continue 
    date_list = os.listdir(os.path.join(base, publisher))
    for date in date_list:
        page_list = os.listdir(os.path.join(base, publisher, date))
        for page in page_list:
            joined_path = os.path.join(base, publisher, date, page)
            print(joined_path)
            img = Image.open(os.path.join(joined_path, "wordcloud.png"))
            img = img.convert('RGB')
            img = img.crop((left, top, right, bottom))
            img.save(os.path.join(joined_path, "wordcloud.jpg"))
            
            
            