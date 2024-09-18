# test_integration.py
import pytest
from recommender.main import main
from recommender.database import pme_collection
from bson.objectid import ObjectId

@pytest.fixture
def sample_pmes():
    pme_ids = []
    pme_ids.append(pme_collection.insert_one({
        'Nom': 'PME1',
        'Type': 'Fournisseur',
        'Activites': ['A', 'B'],
        'Langues': ['FR', 'EN'],
        'Effectif': 50
    }).inserted_id)
    pme_ids.append(pme_collection.insert_one({
        'Nom': 'PME2',
        'Type': 'Client',
        'Activites': ['B', 'C'],
        'Langues': ['FR'],
        'Effectif': 100
    }).inserted_id)
    yield pme_ids
    pme_collection.delete_many({'_id': {'$in': pme_ids}})

def test_main_function(sample_pmes):
    result = main(str(sample_pmes[0]))
    assert 'recommendations' in result
    assert 'competitors' in result
    assert 'collaborators' in result