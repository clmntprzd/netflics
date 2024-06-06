import json

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def get_id_description(file_path):
    data = read_json_file(file_path)
    return {movie["id"] : movie["overview"] for movie in data}

def get_description_id(file_path):
    data = read_json_file(file_path)
    return {movie["overview"] : movie["id"] for movie in data}

def get_both(file_path):
    data = read_json_file(file_path)
    desc_id={}
    id_desc={}
    id_poster={}
    for movie in data:
        desc_id[movie["overview"]]=movie["id"]
        id_desc[movie["id"]]=movie["overview"]
        id_poster[movie["id"]]=movie["poster_path"]
    return desc_id,id_desc, id_poster