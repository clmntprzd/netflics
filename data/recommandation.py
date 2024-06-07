from nltk.stem import PorterStemmer
import numpy as np
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import string
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict, Counter
import json

from nltk.stem.snowball import SnowballStemmer
# Télécharger les ressources nécessaires
nltk.download('punkt')
nltk.download('stopwords')
print()
stemmer=SnowballStemmer(language='french')

def preprocess_text(text):#A revoir possibilité d'integrer dans fonction sklearn
    text = text.lower() # Convertir en minuscules

    # Supprimer les caractères spéciaux (et les chiffres)
    text = text.translate(str.maketrans('', '', string.digits))
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Tokenisation
    tokens = nltk.word_tokenize(text)
    
    # Suppression des stopwords
    stop_words = set(nltk.corpus.stopwords.words('french'))
    tokens = [word for word in tokens if word not in stop_words]

    # Stemming
    #ps = PorterStemmer()
    tokens = [stemmer.stem(word) for word in tokens]

    return ' '.join(tokens)


def compute_tf_idf(descriptions): #descriptions de le forme 
    # Prétraiter les descriptions
    preprocessed_descriptions = [preprocess_text(desc) for desc in descriptions]
        
    # Apprendre le vocabulaire et transformer les documents en matrice TF-IDF
    vectorizer = TfidfVectorizer()
    tf_idf_matrix = vectorizer.fit_transform(preprocessed_descriptions)

    return tf_idf_matrix,vectorizer


def recommend_movies(rated_movies,vectorizer, tf_idf_matrix): #Important de garder le même vectorizer
    user_vector = user_profile(rated_movies, vectorizer)

    # Calculer la similarité cosinus entre le profil utilisateur et les descriptions de films
    similarities = cosine_similarity(user_vector, tf_idf_matrix).flatten()
    
    # Trier les films par similarité
    sorted_indices = similarities.argsort()[::-1]
    print(sorted_indices)
    return [descriptions[i] for i in sorted_indices]

"""
hypothèses : valeurs centrées en 0 pour exprimer l'intérêt de l'utilisateur [-a, a] /(2*a) disons [-1, -.5, 0, .5, 1], possibilité de considerer la moyenne de ses notes
On prend les films notés
"""

def user_profile(rated_movies, vectorizer): #
    # Initialiser les vecteurs
    preference_vector = np.zeros(len(vectorizer.get_feature_names_out()))
    word_counter = np.zeros(len(vectorizer.get_feature_names_out()))
    
    for description, rating in rated_movies:
        processed_description = preprocess_text(description) #mais je le fais 2 fois
        description_vector = vectorizer.transform([processed_description]).toarray().flatten()
        
        preference_vector += description_vector * rating #mots caractérisant le film * le poid accordé selon preference utilisateur
        word_counter += (description_vector > 0)
    
    # Normalisation
    nonzero_indices = word_counter > 0
    preference_vector[nonzero_indices] /= word_counter[nonzero_indices]
    
    return preference_vector.reshape(1, -1)

from lire_json import get_id_description, get_description_id,get_both

desc_id,id_desc, id_poster= get_both("resultat3400.json")

#desc_id = get_description_id("resultat3400.json")
#id_desc = get_id_description("resultat3400.json")

descriptions = list(desc_id.keys())

# # Exemple d'utilisation
# descriptions = [
#     "The Shawshank Redemption is a drama film.",
#     "The Godfather is a crime film.",
#     "The Dark Knight is an action film.",
#     "Pulp Fiction is a crime film with action elements.",
#     "Fight Club is a drama film with action."
# ]

# # Films notés par l'utilisateur (description, note)
# rated_movies = [(id_desc[746036],1),(id_desc[719221],-1)]
#rated_movies = [(desc,choice(rating)) for desc in descriptions]
# rated_movies = [
#     ("The Godfather is a crime film.", .5),
#     ("The Dark Knight is an action film.", 0),
#     ("Pulp Fiction is a crime film with action elements.", -1),
#     ("Fight Club is a drama film with action.", 1)
# ]

# # Calculer les TF-IDF pour les descriptions de films
tf_idf_matrix, vectorizer = compute_tf_idf(descriptions)



#print([f"{vectorizer.get_feature_names_out()[i]} : {round(user_pref_vector[i],2)}" for i in range(len(user_pref_vector))])
# Recommander des films
def recommend_bm50(request):
    data=request
    like=data["like"]
    dislike=data["dislike"]
    rated_movies=[]
    for film in like:
        rated_movies.append((id_desc[film],3))
    for film in dislike:
        rated_movies.append((id_desc[film],-1))
    recommended_movies = recommend_movies(rated_movies,vectorizer, tf_idf_matrix)
    best_recommandation=[]
    count=0
    i=0
    while count<150 and i<len(recommended_movies):
        if desc_id[recommended_movies[i]] in like:
            pass
        else:
            best_recommandation.append({"id":desc_id[recommended_movies[i]],"poster_path":id_poster[desc_id[recommended_movies[i]]]})
            count+=1
        i+=1
    return best_recommandation



#print(recommend_bm50(sim_request))
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LikeDislike(BaseModel):
    like: list = []
    dislike: list = []

@app.get("/")
async def root(like:str, dislike:str):
    like_int=[]
    dislike_int=[]
    if len(like)>0:
        like_int=[int(liked) for liked in like.split(",")]
    if len(dislike)>0:

        dislike_int=[int(disliked) for disliked in dislike.split(",")]
    recom_request={"like":like_int,"dislike":dislike_int}
    return recommend_bm50(recom_request)
