import random
import json

# Listes de données aléatoires pour chaque champ
secteurs_activite = ["Tech", "Education", "Santé", "Agriculture", "Tourisme", "Commerce"]
services_offerts = [
    ["Consulting", "Formation", "Maintenance"],
    ["Vente de produits", "Livraison", "Support"],
    ["Développement de logiciels", "Audit", "Planification stratégique"]
]
publics_cibles = ["PME", "Grandes entreprises", "Particuliers", "Gouvernement", "ONG"]
besoins_specifiques = [
    ["Partenariats", "Financement", "Technologie"],
    ["Marketing", "Expertise technique", "Ressources humaines"],
    ["Accès aux marchés", "Conseils juridiques", "Expansion internationale"]
]
objectifs = [
    ["Accroître la présence locale", "Développer un nouveau produit", "Atteindre une croissance de 10%"],
    ["Améliorer la satisfaction client", "Accéder à de nouveaux marchés", "Lancer des initiatives écologiques"]
]
modeles_economiques = ["Vente directe", "Abonnement", "Freemium", "Consulting", "Commerce électronique"]
ressources_disponibles = [
    ["Bureaux", "Équipe technique", "Partenaires locaux"],
    ["Financement initial", "Équipement spécialisé", "Infrastructure cloud"],
    ["Accès à un réseau de distribution", "Partenariats clés", "Expertise sectorielle"]
]

# Générer une localisation GPS aléatoire dans la zone du Cameroun
def generer_localisation_gps():
    latitude = random.uniform(2.0, 12.0)  # Latitude du Cameroun
    longitude = random.uniform(8.0, 16.0)  # Longitude du Cameroun
    return {"type": "Point", "coordinates": [longitude, latitude]}

# Générer des PME de type "Autre"
def generer_pme_autre(nb_pme):
    pmes = []
    for _ in range(nb_pme):
        pme = {
            "Nom": f"PME-{random.randint(1000, 9999)}",
            "Password": "passwUSFZEI123",
            "Email": f"contact@pme{random.randint(1000, 9999)}.com",
            "Tel": f"+2376{random.randint(100000000, 999999999)}",
            "SiteWeb": f"https://www.pme{random.randint(1000, 9999)}.com",
            "Logo": f"https://www.pme{random.randint(1000, 9999)}.com/logo.png",
            "Effectif": random.randint(10, 500),
            "NomResponsable": f"Responsable-{random.randint(100, 999)}",
            "ContactResponsable": f"+2376{random.randint(100000000, 999999999)}",
            "StatutJuridique": ["SARL","EURL", "SAS", "SASU", "SA", "SNC", "NCI", "SCOP", "Association", "Auto-entrepreneur", "Micro-entrepreneur", "Entreprise individuelle",
                "GIE", "SCA", "SCS", "Société en participation", "Sociale civile", "Société dexercice libérale", "Société coopérative", "Société européene", "Autre"
                ][random.randint(1, 1)],
            "BoitePostale": f"BP-{random.randint(100, 999)}",
            "Langues": ["Français", "Anglais", "Allemand", "Italien", "Espagnol", "Portugais", "Arabe", "Autre"][random.randint(1, 1)],
            "Activites": [],  # Activités peuvent être ajoutées ici
            "Tarifications": {},  # Tarifications ajoutées plus tard
            "Type": "Autre",
            "ChiffreAffaire": random.randint(50000000, 1000000000),
            "Description": "Une entreprise polyvalente opérant dans divers secteurs.",
            "DateCreation": f"{random.randint(2000, 2023)}-01-01",
            "Pays": "Cameroun",
            "Region": ["Centre", "Littoral", "Nord", "Ouest", "Sud-Ouest", "Est", "Adamaoua"][random.randint(0, 4)],
            "Departement": "Département-X",
            "LieuDit": f"Lieu-{random.randint(1, 100)}",
            "LocalisationGps": generer_localisation_gps(),
            "NoteMoyenne": 0,
            "NombreDeVotes": 0,

            # Champs spécifiques au type "Autre"
            "SecteurActivite": random.choice(secteurs_activite),
            "ServicesOfferts": random.choice(services_offerts),
            "PublicCible": random.choice(publics_cibles),
            "BesoinSpecifique": random.choice(besoins_specifiques),
            "Objectifs": random.choice(objectifs),
            "DescriptionLibre": "Une entreprise innovante qui cherche à se distinguer par son approche unique.",
            "ModeleEconomique": random.choice(modeles_economiques),
            "RessourcesDisponibles": random.choice(ressources_disponibles)
        }
        pmes.append(pme)
    
    return pmes

# Générer 10 PME de type "Autre"
pmes_autre = generer_pme_autre(10)

# Sauvegarder dans un fichier JSON
with open('C:/Users/user/Downloads/pmes_autre.json', 'w', encoding='utf-8') as f:
    json.dump(pmes_autre, f, indent=4, ensure_ascii=False)

print("10 PME de type 'Autre' ont été générées et sauvegardées dans pmes_autre.json")
