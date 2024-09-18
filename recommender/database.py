from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['SMEbd']
pme_collection = db['pmes']

# Fonction pour obtenir un échantillon de PMEs
def get_sample_pmes(sample_size=100):
    return list(pme_collection.aggregate([{ '$sample': { 'size': sample_size } }]))

# Obtenir un échantillon de PMEs
sample_pmes = get_sample_pmes()