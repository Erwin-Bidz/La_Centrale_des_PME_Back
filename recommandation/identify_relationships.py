def identify_relationships(pme, recommendations):
    competitors = [
        rec for rec in recommendations
        if rec['pme']['Type'] == pme['Type'] and rec['similarity'] > 0.7
    ]

    collaborators = [
        rec for rec in recommendations
        if rec['pme']['Type'] != pme['Type'] and rec['similarity'] > 0.5
    ]

    return {
        "competitors": competitors,
        "collaborators": collaborators
    }
