import json

presence_id={}

results_clean=[]
with open("resultat3000sansdb.json", 'r') as file:
    data = json.load(file)

print(len(data))

for film in data:
    if film["id"] not in presence_id:
        presence_id[film['id']]=True
    else :
        print("Doublons detecté "+film["title"])