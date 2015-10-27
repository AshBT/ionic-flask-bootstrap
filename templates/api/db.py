from pymongo import MongoClient
import math

con = MongoClient()
db = con.{{ data.app_name }}

def hateos(data, limit=10) :
    total = data.count()
    page_count = int(math.ceil(float(total) / float(limit)))
    if page_count == 0 :
        page_count = 1
    return {
        'results' : data,
        'meta' : {
            'total' : total,
            'pages' : page_count
        }
    }

