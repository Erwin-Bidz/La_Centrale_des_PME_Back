from similarity import cosine_similarity, jaccard_similarity, normalized_euclidean_distance, haversine_distance
from typing import List, Set, Dict, Any
from database import pme_collection
from bson.objectid import ObjectId # type: ignore

def calculate_similarity(pme1: Dict[str, Any], pme2: Dict[str, Any]) -> float:
    similarity = 0
    weight = 0

    if pme1.get('Activites') and pme2.get('Activites'):
        activity_sim = cosine_similarity(' '.join(pme1['Activites']), ' '.join(pme2['Activites']))
        similarity += activity_sim * 0.3
        weight += 0.3

    if pme1.get('Langues') and pme2.get('Langues'):
        language_sim = jaccard_similarity(set(pme1['Langues']), set(pme2['Langues']))
        similarity += language_sim * 0.1
        weight += 0.1

    if pme1.get('Effectif') and pme2.get('Effectif'):
        size_sim = 1 - normalized_euclidean_distance(pme1['Effectif'], pme2['Effectif'], 0, 1000)
        similarity += size_sim * 0.2
        weight += 0.2

    if pme1.get('LocalisationGps') and pme2.get('LocalisationGps'):
        distance = haversine_distance(
            pme1['LocalisationGps']['coordinates'][1], pme1['LocalisationGps']['coordinates'][0],
            pme2['LocalisationGps']['coordinates'][1], pme2['LocalisationGps']['coordinates'][0]
        )
        geo_sim = 1 - min(distance, 1000) / 1000  # Normaliser à 1000km
        similarity += geo_sim * 0.4
        weight += 0.4

    return similarity / weight if weight > 0 else 0

def get_recommendations(pme_id: str) -> List[Dict[str, Any]]:
    pme = pme_collection.find_one({'_id': ObjectId(pme_id)})
    if not pme:
        raise ValueError('PME not found')

    all_pmes = list(pme_collection.find({'_id': {'$ne': ObjectId(pme_id)}}))
    
    recommendations = [
        {'pme': other_pme, 'similarity': calculate_similarity(pme, other_pme)}
        for other_pme in all_pmes
    ]

    return sorted(recommendations, key=lambda x: x['similarity'], reverse=True)

def identify_relationships(pme: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    competitors = [
        rec for rec in recommendations
        if rec['pme']['Type'] == pme['Type'] and rec['similarity'] > 0.7
    ]

    collaborators = [
        rec for rec in recommendations
        if rec['pme']['Type'] != pme['Type'] and rec['similarity'] > 0.5
    ]

    return {'competitors': competitors, 'collaborators': collaborators}