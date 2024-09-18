from bson import ObjectId
from recommandation.recommandation_engine import get_recommendations

def main(pme_id_str):
    pme_id = ObjectId(pme_id_str)
    recommendations = get_recommendations(pme_id)
    for rec in recommendations:
        print(f"PME: {rec['pme']}, Similarity: {rec['similarity']}")

if __name__ == "__main__":
    main("66c361d3c177717a96dd2e7b")
