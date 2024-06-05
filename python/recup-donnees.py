import requests
import sqlite3 as lite

resultat = []
for i in range(1,10):
    url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR&page="+str(i)

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo"
    }
    response = requests.get(url, headers=headers)
    results = response.json()
    for i in results["results"]:
        resultat.append({"id" : i["id"], "title" : i["title"],"genre_ids" : i["genre_ids"], "overview" : i["overview"], "poster_path" : i["poster_path"]})


for i in resultat:
    conn = lite.connect("movie")
    cur = conn.cursor()
    sql = "INSERT INTO movie (id, title, genre_ids, overview, poster_path) VALUES (?, ?, ?, ?, ?)"
    val = (i["id"], i["title"], i["genre_ids"], i["overview"], i["poster_path"])
    cur.execute(sql, val)
    conn.commit()
conn.close()

