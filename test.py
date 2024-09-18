import random
import json

# Charger les données des PME depuis un fichier JSON
with open('C:/Users/user/Downloads/Investisseurs_modifie.json', 'r', encoding='utf-8') as f:
    pmes = json.load(f)

# Définir les tarifications en fonction du type de PME
def generer_tarification(pme):
    type_pme = pme['Type']
    
    # Tarifications par type de PME
    if type_pme == 'AgentGouv':
        return {
            "FraisDossier": random.randint(5000, 15000),
            "TarifConsultation": random.randint(20000, 50000),
            "FraisDivers": random.randint(1000, 5000)
        }
    elif type_pme == 'Banque':
        return {
            "TauxInteret": round(random.uniform(2.5, 7.5), 2),
            "FraisGestionCompte": random.randint(10000, 30000),
            "TarifCredit": random.randint(500000, 2000000)
        }
    elif type_pme == 'Certification':
        return {
            "TarifObtentionCertification": random.randint(50000, 200000),
            "FraisAudit": random.randint(10000, 50000),
            "FraisRenouvellement": random.randint(20000, 100000)
        }
    elif type_pme == 'Expert':
        return {
            "TarifConsultationHeure": random.randint(30000, 80000),
            "FraisDeplacement": random.randint(10000, 50000),
            "TarifExpertiseComplete": random.randint(500000, 2000000)
        }
    elif type_pme == 'Fournisseur':
        return {
            "TarifProduitUnitaire": random.randint(1000, 50000),
            "TarifLivraison": random.randint(500, 3000),
            "Remise": round(random.uniform(5, 20), 2)
        }
    elif type_pme == 'Investisseur':
        return {
            "TauxRendementAttendu": round(random.uniform(8, 15), 2),
            "MontantMinInvestissement": random.randint(1000000, 50000000),
            "DureeInvestissement": random.randint(1, 10)
        }
    elif type_pme == 'ONG':
        return {
            "BudgetAnnuel": random.randint(1000000, 50000000),
            "FraisMiseEnOeuvreProjet": random.randint(500000, 2000000),
            "FraisAdministration": random.randint(50000, 200000)

        }
    elif type_pme == 'Autre':
        # Tarifications spécifiques pour les PME de type "Autre"
        return {
            "TarifService": random.randint(10000, 50000),
            "TarifAbonnementMensuel": random.randint(5000, 20000),
            "RemiseSpeciale": round(random.uniform(5, 15), 2),
            "TarifConsultation": random.randint(20000, 100000) if "Consulting" in pme['ServicesOfferts'] else None,
            "TarifProduit": random.randint(1000, 10000) if "Vente de produits" in pme['ServicesOfferts'] else None
        }
    else:
        return {
            "TarifGeneral": random.randint(10000, 50000)
        }

# Appliquer les tarifications à chaque PME
for pme in pmes:
    pme['Tarifications'] = generer_tarification(pme)

# Sauvegarder les modifications dans un nouveau fichier JSON
with open('C:/Users/user/Downloads/Investisseurs_modifie.json', 'w', encoding='utf-8') as f:
    json.dump(pmes, f, indent=4, ensure_ascii=False)

print("Les tarifications ont été générées et enregistrées dans pmes_modifiees.json")
