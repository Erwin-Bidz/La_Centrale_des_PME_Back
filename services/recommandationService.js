function calculateSimilarityScore(user1, user2) {
    let score = 0;
    let attributesCount = 0;

    // Cosine similarity for array attributes
    const arrayAttributes = [
        'Langues', 
        'Activites', 
        'Certifications', 
        'TypeCertification', 
        'TypeInvestissement', 
        'DomaineCertification', 
        'DomaineInvestissement', 
        'Projets'
    ];

    arrayAttributes.forEach(attr => {
        if (user1[attr] && user2[attr]) {
            score += cosineSimilarity(user1[attr], user2[attr]);
            attributesCount++;
        }
    });

    // Numeric similarity for numeric attributes
    const numericAttributes = [
        'Effectif', 
        'ChiffreAffaire', 
        'Budget', 
        'MontantInvestissement'
    ];

    numericAttributes.forEach(attr => {
        if (user1[attr] !== undefined && user2[attr] !== undefined) {
            score += numericSimilarity(user1[attr], user2[attr]);
            attributesCount++;
        }
    });

    // Calculate final similarity score
    if (attributesCount === 0) return 0;
    
    const finalScore = score / attributesCount;
    return finalScore;
}
