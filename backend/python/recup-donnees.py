import requests
import sqlite3 as lite
import json
headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo"
    }
resultat = []

presence_id={}
#On va aussi ajouter les films avec les meilleurs note
#et éviter les doublons en ajoutant les présences

for i in range(1,100):
    url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR&page="+str(i)


    response = requests.get(url, headers=headers)
    results = response.json()
    print("Popular : "+str(i))
    for res in results["results"]:
        if res["id"] in presence_id.keys():
            print("prevented duplicate")
        else:
            resultat.append({"id" : res["id"], "title" : res["title"],"genre_ids" : res["genre_ids"], "overview" : res["overview"], "poster_path" : res["poster_path"],"popularity":res["popularity"]} )
            presence_id[res["id"]]=1
for i in range(1,100):
    url = "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page="+str(i)


    response = requests.get(url, headers=headers)
    results = response.json()
    print("Top rated : "+str(i))
    for res in results["results"]:
        if res["id"] in presence_id.keys():
            print("prevented duplicate")
        else:
            resultat.append({"id" : res["id"], "title" : res["title"],"genre_ids" : res["genre_ids"], "overview" : res["overview"], "poster_path" : res["poster_path"],"popularity": res["popularity"] })
            presence_id[res["id"]]=True





resultatjson = json.dumps(resultat)
print(resultatjson)

with open("../data/resultat3000sansdb.json", "w") as outfile:
    outfile.write(resultatjson)