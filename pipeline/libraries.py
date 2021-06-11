import csv
from operator import itemgetter

def parse_keywords(src):
    ls = []
    with open(src, newline='') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            ls.append({
                "word" : row[0],
                "count" : int(row[1]),
            })
    ls = sorted(ls, key=itemgetter('count'), reverse=True)
    for ind, item in enumerate(ls):
        if(ind > 0 and item["count"] == ls[ind-1]["count"]):
            item["rank"] = ls[ind-1]["rank"]
        else:
            item["rank"] = ind+1
    return ls