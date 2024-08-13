function cosineSimilarity(array1, array2) {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    const similarity = intersection.size / Math.sqrt(set1.size * set2.size);

    return similarity;
}

function numericSimilarity(value1, value2) {
    const maxVal = Math.max(value1, value2);
    const minVal = Math.min(value1, value2);

    if (maxVal === 0) return 0;

    const similarity = minVal / maxVal;

    return similarity;
}
