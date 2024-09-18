import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine_similarity

def cosine_similarity(text1, text2):
    # Assurez-vous que text1 et text2 sont des listes ou des chaînes de caractères
    if isinstance(text1, list):
        text1 = ' '.join(text1)
    if isinstance(text2, list):
        text2 = ' '.join(text2)

    # Créer un vocabulaire unique combiné
    unique_words = list(set(text1.split()).union(set(text2.split())))

    # Créer les vecteurs de fréquence des mots, tous de la même longueur
    vector1 = np.array([text1.split().count(word) for word in unique_words])
    vector2 = np.array([text2.split().count(word) for word in unique_words])

    # Calculer la similarité cosinus en utilisant sklearn
    return sklearn_cosine_similarity([vector1], [vector2])[0][0]

def jaccard_similarity(set1, set2):
    intersection = len(set(set1) & set(set2))
    union = len(set(set1) | set(set2))
    return intersection / union

def normalized_euclidean_distance(value1, value2, min_val, max_val):
    normalized_value1 = (value1 - min_val) / (max_val - min_val)
    normalized_value2 = (value2 - min_val) / (max_val - min_val)
    return np.sqrt((normalized_value1 - normalized_value2) ** 2)

def haversine_distance(lat1, lon1, lat2, lon2):
    # Convertir les valeurs en float au cas où elles seraient des chaînes de caractères
    lat1 = float(lat1)
    lon1 = float(lon1)
    lat2 = float(lat2)
    lon2 = float(lon2)

    R = 6371  # Rayon de la Terre en kilomètres
    dLat = np.radians(lat2 - lat1)
    dLon = np.radians(lon2 - lon1)
    a = (
        np.sin(dLat / 2) ** 2
        + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dLon / 2) ** 2
    )
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    return R * c
