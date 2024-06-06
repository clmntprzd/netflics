import json
import sqlite3

conn = sqlite3.connect('movie')

with open("resultat.json", 'r') as file:
    data = json.load(file)

for i in data:
    if "1057001" in str(i["id"]):
        print(i["title"])
        print(i["id"])
        print(i["overview"])
        

#conn.execute("INSERT INTO movie (id,title,overview,genre_ids) \
#      VALUES (?,?,?,?)");