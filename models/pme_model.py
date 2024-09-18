from pymongo import MongoClient
from bson import ObjectId

class PMEModel:
    def __init__(self, db_uri="mongodb://localhost:27017/", db_name="SMEdb"):
        # Connexion à MongoDB
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]
        self.collection = self.db['pmes']

    def find_by_id(self, pme_id):
        # Convertir l'ID en ObjectId et rechercher dans la base de données
        return self.collection.find_one({"_id": ObjectId(pme_id)})

    def find_all_except(self, pme_id):
        # Rechercher toutes les PMEs sauf celle avec pme_id
        return self.collection.find({"_id": {"$ne": ObjectId(pme_id)}})

pme_model = PMEModel()
