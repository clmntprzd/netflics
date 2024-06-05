from nltk.stem import PorterStemmer
import numpy as np
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import string
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict, Counter

# Télécharger les ressources nécessaires
nltk.download('punkt')
nltk.download('stopwords')
print()

def preprocess_text(text):#A revoir possibilité d'integrer dans fonction sklearn
    text = text.lower() # Convertir en minuscules

    # Supprimer les caractères spéciaux (et les chiffres)
    text = text.translate(str.maketrans('', '', string.digits))
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Tokenisation
    tokens = nltk.word_tokenize(text)
    
    # Suppression des stopwords
    stop_words = set(nltk.corpus.stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]

    # Stemming
    ps = PorterStemmer()
    tokens = [ps.stem(word) for word in tokens]

    return ' '.join(tokens)


def compute_tf_idf(descriptions):
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
        
    return sorted_indices

"""
hypothèses : valeurs centrées en 0 pour exprimer l'intérêt de l'utilisateur [-a, a] /(2*a) disons [-1, -.5, 0, .5, 1], considerer la moyenne de ses notes
On prend les films notés et on * 
"""

def user_profile(rated_movies, vectorizer):
    # Initialiser les vecteurs
    preference_vector = np.zeros(len(vectorizer.get_feature_names_out()))
    word_counter = np.zeros(len(vectorizer.get_feature_names_out()))
    
    for description, rating in rated_movies:
        processed_description = preprocess_text(description) #mais je le fais 2 fois
        description_vector = vectorizer.transform([processed_description]).toarray().flatten()
        
        preference_vector += description_vector * rating
        word_counter += (description_vector > 0)
    
    # Normalisation
    nonzero_indices = word_counter > 0
    preference_vector[nonzero_indices] /= word_counter[nonzero_indices]
    
    return preference_vector.reshape(1, -1)





# # Profil utilisateur (liste de mots-clés représentant les préférences)
# user_profile =  "action dark crime crime club"

# Calculer les TF-IDF pour les descriptions de films
# tf_idf_matrix,vectorizer = compute_tf_idf(descriptions)
# # Recommander des films
# recommended_movies = recommend_movies(user_profile,vectorizer, tf_idf_matrix)


# # Afficher les recommandations
# for i in range(len(recommended_movies)):
#     print(f"{i+1} : {descriptions[recommended_movies[i]]}")






# Exemple d'utilisation
descriptions = [
    "The Shawshank Redemption is a drama film.",
    "The Godfather is a crime film.",
    "The Dark Knight is an action film.",
    "Pulp Fiction is a crime film with action elements.",
    "Fight Club is a drama film with action."
]

# Films notés par l'utilisateur (description, note)
rated_movies = [
    ("The Godfather is a crime film.", .5),
    ("The Dark Knight is an action film.", 0),
    ("Pulp Fiction is a crime film with action elements.", -1),
    ("Fight Club is a drama film with action.", 1)
]

# Calculer les TF-IDF pour les descriptions de films
tf_idf_matrix, vectorizer = compute_tf_idf(descriptions)



#print([f"{vectorizer.get_feature_names_out()[i]} : {round(user_pref_vector[i],2)}" for i in range(len(user_pref_vector))])
# Recommander des films
recommended_movies = recommend_movies(rated_movies,vectorizer, tf_idf_matrix)


# Afficher les recommandations
for i in range(len(recommended_movies)):
    print(f"{i+1} : {descriptions[recommended_movies[i]]}")