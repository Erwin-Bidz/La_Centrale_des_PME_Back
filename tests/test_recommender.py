from recommender.recommender import calculate_similarity, identify_relationships

def test_calculate_similarity():
    pme1 = {'Activites': ['A', 'B'], 'Langues': ['FR', 'EN'], 'Effectif': 50}
    pme2 = {'Activites': ['B', 'C'], 'Langues': ['FR'], 'Effectif': 100}
    assert 0 <= calculate_similarity(pme1, pme2) <= 1

def test_identify_relationships():
    pme = {'Type': 'Fournisseur'}
    recommendations = [
        {'pme': {'Type': 'Fournisseur'}, 'similarity': 0.8},
        {'pme': {'Type': 'Client'}, 'similarity': 0.6}
    ]
    relationships = identify_relationships(pme, recommendations)
    assert len(relationships['competitors']) == 1
    assert len(relationships['collaborators']) == 1