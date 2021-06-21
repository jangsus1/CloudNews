import csv
from operator import itemgetter
import datetime

def parse_page_keywords(src, acc):
    ls = []
    with open(src, newline='') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            ls.append({
                "word" : row[1],
                "count" : int(row[2]),
            })
            if row[1] in acc:
                acc[row[1]] += int(row[2])
            else:
                acc[row[1]] = int(row[2])
    for ind, item in enumerate(ls):
        if(ind > 0 and item["count"] == ls[ind-1]["count"]):
            item["rank"] = ls[ind-1]["rank"]
        else:
            item["rank"] = ind+1
    return ls, acc

def parse_news_keywords(dic):
    ls = [{"word" : key, "count" : val} for (key, val) in sorted(dic.items(), key=lambda item:item[1], reverse=True)]
    for ind, item in enumerate(ls):
        if(ind > 0 and item["count"] == ls[ind-1]["count"]):
            item["rank"] = ls[ind-1]["rank"]
        else:
            item["rank"] = ind+1
            # top 10만 저장함
    return ls[:10]
def today():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')