import random
from pymongo import MongoClient

# Connexion à MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['SMEdb']
pme_collection = db['pmes']
activite_collection = db['activites']
division_collection = db['divisions']

# Fonction pour obtenir un code NAF et les informations d'activité
def assign_random_naf_to_pme():
    pmes = pme_collection.find()
    
    for pme in pmes:
        # Sélectionne aléatoirement une activité dans la collection 'activites'
        activites = list(activite_collection.find())
        activite = random.choice(activites)
        
        # Récupère le code NAF, l'activité et l'ID de la division correspondante
        naf_code = activite['NAF']
        activite_id = activite['_id']
        activite_name = activite['ACTIVITE']
        
        division = division_collection.find_one({'_id': activite['division_id']})
        division_description = division['DESCRIPTION'] if division else None
        
        # Mise à jour de la PME avec les informations NAF, ACTIVITE et DESCRIPTION de la division
        pme_collection.update_one(
            {'_id': pme['_id']},
            {
                '$set': {
                    'NAF': naf_code,
                    'ActiviteId': activite_id,
                    'ActiviteName': activite_name,
                    'DivisionDescription': division_description
                }
            }
        )
        print(f"PME {pme['Nom']} mise à jour avec le NAF {naf_code}, Activité {activite_name} et Division {division_description}.")

# Exécution du script
if __name__ == "__main__":
    assign_random_naf_to_pme()
