from bson import ObjectId
import numpy as np
#import sys
#sys.path.append('./../models/pme_model.py')  # Ajouter le chemin vers les modèles
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.pme_model import pme_model

from calculate_similarity import (
    cosine_similarity, jaccard_similarity, normalized_euclidean_distance, haversine_distance
)

def calculate_similarity(pme1, pme2):
    similarity = 0
    weight = 0

    # Assurez-vous que `Activites` est une liste de chaînes de caractères
    activites1 = [str(activity) for activity in pme1['Activites']]
    activites2 = [str(activity) for activity in pme2['Activites']]
    
    if pme1['Activites'] and pme2['Activites']:
        activity_sim = cosine_similarity(' '.join(activites1), ' '.join(activites2))
        similarity += activity_sim * 0.3
        weight += 0.3

    # Vérification de la présence de 'Langues' et si les valeurs sont non nulles
    if 'Langues' in pme1 and 'Langues' in pme2 and pme1['Langues'] and pme2['Langues']:
        language_sim = jaccard_similarity(set(pme1['Langues']), set(pme2['Langues']))
        similarity += language_sim * 0.1
        weight += 0.1

    # Vérification de la présence de 'Effectif' et si les valeurs sont non nulles
    if 'Effectif' in pme1 and 'Effectif' in pme2 and pme1['Effectif'] and pme2['Effectif']:
        effectif_sim = 1 - abs(pme1['Effectif'] - pme2['Effectif']) / max(pme1['Effectif'], pme2['Effectif'])
        similarity += effectif_sim * 0.2
        weight += 0.2
        
   # Vérifiez et affichez les messages si le champ 'LocalisationGps' est manquant ou incorrect
    if not isinstance(pme1.get('LocalisationGps'), list) or len(pme1['LocalisationGps']) != 2:
        print(f"La PME {pme1['_id']} n'a pas de champ 'LocalisationGps' valide.")
        return 0  # ou continuez en fonction de votre logique
    if not isinstance(pme2.get('LocalisationGps'), list) or len(pme2['LocalisationGps']) != 2:
        print(f"La PME {pme2['_id']} n'a pas de champ 'LocalisationGps' valide.")
        return 0  # ou continuez en fonction de votre logique

    # Calcul de la similarité géographique
    distance = haversine_distance(
        pme1['LocalisationGps'][1], pme1['LocalisationGps'][0],
        pme2['LocalisationGps'][1], pme2['LocalisationGps'][0]
    )
    geo_sim = 1 - min(distance, 1000) / 1000
    similarity += geo_sim * 0.4
    weight += 0.4
    
    # Pondération par type d'abonnement
    abonnements = {'Gratuit': 1.0, 'Premium': 1.2, 'VIP': 1.5}
    
    abonnement_pme1 = abonnements.get(pme1['Abonnement']['type'], 1.0)
    abonnement_pme2 = abonnements.get(pme2['Abonnement']['type'], 1.0)
    
    abonnement_weight = (abonnement_pme1 + abonnement_pme2) / 2
    similarity *= abonnement_weight


    return similarity / weight if weight > 0 else 0

def get_recommendations(pme_id):
    pme = pme_model.find_by_id(pme_id)
    if not pme:
        raise ValueError("PME not found")

    all_pmes = pme_model.find_all_except(pme_id)
    recommendations = [{
        "pme": other_pme,
        "similarity": calculate_similarity(pme, other_pme)
    } for other_pme in all_pmes]

    return sorted(recommendations, key=lambda x: x['similarity'], reverse=True)
