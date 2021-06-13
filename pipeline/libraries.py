import csv
from operator import itemgetter
import datetime

def parse_keywords(src):
    ls = []
    with open(src, newline='') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            ls.append({
                "word" : row[1],
                "count" : int(row[2]),
            })
    for ind, item in enumerate(ls):
        if(ind > 0 and item["count"] == ls[ind-1]["count"]):
            item["rank"] = ls[ind-1]["rank"]
        else:
            item["rank"] = ind+1
    return ls


def today():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')