import pandas as pd

# Charger le fichier JSON
df = pd.read_json('C:/Users/user/Downloads/Fournisseurs.json')

# Enregistrer au format CSV
df.to_csv('C:/Users/user/Downloads/mon_fichier.csv', index=False)
