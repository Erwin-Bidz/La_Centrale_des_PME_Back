import random
import json

# Charger les données depuis le fichier JSON
with open('C:/Users/user/Downloads/banques.json', 'r', encoding='utf-8') as f:
    fournisseurs = json.load(f)
    
activite_ids = [
    "66751e96cad767c1b9bde05b", "66751e96cad767c1b9bde05c", "66751e96cad767c1b9bde05d",
    "66751e96cad767c1b9bde05e", "66751e96cad767c1b9bde05f", "66751e96cad767c1b9bde060",
    "66751e96cad767c1b9bde061", "66751e96cad767c1b9bde062", "66751e96cad767c1b9bde063",
    "66751e96cad767c1b9bde064", "66751e96cad767c1b9bde065", "66751e96cad767c1b9bde066",
    "66751e96cad767c1b9bde067", "66751e96cad767c1b9bde068", "66751e96cad767c1b9bde069",
    "66751e96cad767c1b9bde06a", "66751e96cad767c1b9bde06b", "66751e96cad767c1b9bde06c",
    "66751e96cad767c1b9bde06d", "66751e96cad767c1b9bde06e", "66751e96cad767c1b9bde06f",
    "66751e96cad767c1b9bde070", "66751e96cad767c1b9bde071", "66751e96cad767c1b9bde072",
    "66751e96cad767c1b9bde073", "66751e96cad767c1b9bde074", "66751e96cad767c1b9bde075",
    "66751e96cad767c1b9bde076", "66751e96cad767c1b9bde077", "66751e96cad767c1b9bde078",
    "66751e96cad767c1b9bde079", "66751e96cad767c1b9bde07a", "66751e96cad767c1b9bde07b",
    "66751e96cad767c1b9bde07c", "66751e96cad767c1b9bde07d", "66751e96cad767c1b9bde07e",
    "66751e96cad767c1b9bde07f", "66751e96cad767c1b9bde080", "66751e96cad767c1b9bde081",
    "66751e96cad767c1b9bde082", "66751e96cad767c1b9bde083", "66751e96cad767c1b9bde084",
    "66751e96cad767c1b9bde085", "66751e96cad767c1b9bde086", "66751e96cad767c1b9bde087",
    "66751e96cad767c1b9bde088", "66751e96cad767c1b9bde089", "66751e96cad767c1b9bde08a",
    "66751e96cad767c1b9bde08b", "66751e96cad767c1b9bde08c", "66751e96cad767c1b9bde08d",
    "66751e96cad767c1b9bde08e", "66751e96cad767c1b9bde08f", "66751e96cad767c1b9bde090",
    "66751e96cad767c1b9bde091", "66751e96cad767c1b9bde092", "66751e96cad767c1b9bde093",
    "66751e96cad767c1b9bde094", "66751e96cad767c1b9bde095", "66751e96cad767c1b9bde096",
    "66751e96cad767c1b9bde097", "66751e96cad767c1b9bde098", "66751e96cad767c1b9bde099",
    "66751e96cad767c1b9bde09a", "66751e96cad767c1b9bde09b", "66751e96cad767c1b9bde09c",
    "66751e96cad767c1b9bde09d", "66751e96cad767c1b9bde09e", "66751e96cad767c1b9bde09f",
    "66751e96cad767c1b9bde0a0", "66751e96cad767c1b9bde0a1", "66751e96cad767c1b9bde0a2",
    "66751e96cad767c1b9bde0a3", "66751e96cad767c1b9bde0a4", "66751e96cad767c1b9bde0a5",
    "66751e96cad767c1b9bde0a6", "66751e96cad767c1b9bde0a7", "66751e96cad767c1b9bde0a8",
    "66751e96cad767c1b9bde0a9", "66751e96cad767c1b9bde0aa", "66751e96cad767c1b9bde0ab",
    "66751e96cad767c1b9bde0ac", "66751e96cad767c1b9bde0ad", "66751e96cad767c1b9bde0ae",
    "66751e96cad767c1b9bde0af", "66751e96cad767c1b9bde0b0", "66751e96cad767c1b9bde0b1",
    "66751e96cad767c1b9bde0b2"
]

# Remplacer le champ Activites pour chaque fournisseur
for fournisseur in fournisseurs:
    # Sélectionne aléatoirement un nombre d'ID entre 1 et 3 (ou plus si souhaité)
    nombre_activites = random.randint(1, 15)
    fournisseur['Activites'] = random.sample(activite_ids, nombre_activites)

# Sauvegarder les modifications dans un nouveau fichier JSON
with open('C:/Users/user/Downloads/banques_new.json', 'w', encoding='utf-8') as f:
    json.dump(fournisseurs, f, indent=4)

print("Les données ont été modifiées et enregistrées dans fournisseurs_modifie.json")
