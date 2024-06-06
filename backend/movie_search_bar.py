import sqlite3

def search_movies_by_title(db_path, search_text):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    
    # Utiliser une requête SQL pour rechercher les titres de films contenant le texte spécifié
    query = "SELECT id, title FROM movie WHERE title LIKE ?"
    search_pattern = f"%{search_text}%"
    cur.execute(query, (search_pattern,))
    
    results = cur.fetchall()
    
    con.close()
    
    return results

# Exemple d'utilisation
db_path = "./../movieDatabase.sqlite3"
search_text = "Harr"
movies = search_movies_by_title(db_path, search_text)

# Afficher les résultats
print(f"Résultats pour '{search_text}':")
for movie in movies:
    print(f"ID: {movie[0]}, Titre: {movie[1]}")
