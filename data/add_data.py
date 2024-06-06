import json
import sqlite3

conn = sqlite3.connect('../backend/database.sqlite3')

with open("resultat3400.json", 'r') as file:
    data = json.load(file)


for movie in data:
    conn.execute("INSERT INTO movie (id,title,overview,poster_path,popularity) VALUES (?,?,?,?,?)",(movie["id"],movie["title"],movie["overview"],movie["poster_path"],movie["popularity"]) )
conn.commit()
conn.close()