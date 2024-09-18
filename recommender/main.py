from recommender import get_recommendations, identify_relationships
from database import pme_collection
from bson.objectid import ObjectId # type: ignore


# Fonction principale
def main(pme_id: str):
    recommendations = get_recommendations(pme_id)
    pme = pme_collection.find_one({'_id': ObjectId(pme_id)})
    relationships = identify_relationships(pme, recommendations)

    print('Top 5 recommendations:', recommendations[:5])
    print('Top 3 competitors:', relationships['competitors'][:3])
    print('Top 3 potential collaborators:', relationships['collaborators'][:3])

if __name__ == '__main__':
    main('someMongoDBId')