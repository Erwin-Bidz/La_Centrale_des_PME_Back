# test_with_real_data.py
from pymongo import MongoClient
from bson.objectid import ObjectId
from recommender.main import main

# Connexion à la base de données
client = MongoClient('votre_url_de_connexion')
db = client['nom_de_votre_base']
pme_collection = db['pme']

# Fonction pour obtenir un échantillon de PMEs
def get_sample_pmes(sample_size=100):
    return list(pme_collection.aggregate([{ '$sample': { 'size': sample_size } }]))

# Obtenir un échantillon de PMEs
sample_pmes = get_sample_pmes()