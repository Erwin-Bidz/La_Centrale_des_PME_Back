# test_similarity.py
import pytest
from recommender.similarity import cosine_similarity, jaccard_similarity

def test_cosine_similarity():
    assert cosine_similarity("hello world", "hello") == pytest.approx(0.7071, 0.001)

def test_jaccard_similarity():
    assert jaccard_similarity(set(['a', 'b', 'c']), set(['b', 'c', 'd'])) == 0.5

# test_recommender.py
from recommender.recommender import calculate_similarity, identify_relationships
from unittest.mock import Mock

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