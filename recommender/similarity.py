import math
from typing import List, Set, Dict, Any
import numpy as np

def cosine_similarity(text1: str, text2: str) -> float:
    words1 = text1.lower().split()
    words2 = text2.lower().split()
    unique_words = set(words1 + words2)
    
    vector1 = [words1.count(word) for word in unique_words]
    vector2 = [words2.count(word) for word in unique_words]
    
    dot_product = sum(a * b for a, b in zip(vector1, vector2))
    magnitude1 = math.sqrt(sum(a * a for a in vector1))
    magnitude2 = math.sqrt(sum(b * b for b in vector2))
    
    return dot_product / (magnitude1 * magnitude2) if magnitude1 * magnitude2 != 0 else 0

def jaccard_similarity(set1: Set[str], set2: Set[str]) -> float:
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union) if union else 0

def normalized_euclidean_distance(value1: float, value2: float, min_val: float, max_val: float) -> float:
    normalized_value1 = (value1 - min_val) / (max_val - min_val)
    normalized_value2 = (value2 - min_val) / (max_val - min_val)
    return abs(normalized_value1 - normalized_value2)

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371  # Rayon de la Terre en km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat/2) * math.sin(dLat/2) + \
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
        math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c
