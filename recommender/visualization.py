import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def plot_similarity_distribution(similarities):
    plt.figure(figsize=(10, 6))
    sns.histplot(similarities, kde=True)
    plt.title('Distribution des similarités')
    plt.xlabel('Similarité')
    plt.ylabel('Fréquence')
    plt.show()

def plot_recommendation_network(pme, recommendations, n=10):
    G = nx.Graph() # type: ignore
    G.add_node(pme['Nom'], size=1000, color='red')
    for rec in recommendations[:n]:
        G.add_node(rec['pme']['Nom'], size=500, color='blue')
        G.add_edge(pme['Nom'], rec['pme']['Nom'], weight=rec['similarity'])

    pos = nx.spring_layout(G) # type: ignore
    plt.figure(figsize=(12, 8))
    nx.draw(G, pos, with_labels=True, node_color=[node[1]['color'] for node in G.nodes(data=True)],
            node_size=[node[1]['size'] for node in G.nodes(data=True)])
    nx.draw_networkx_edge_labels(G, pos, edge_labels={(u, v): f"{d['weight']:.2f}" for u, v, d in G.edges(data=True)})
    plt.title('Réseau de recommandations')
    plt.axis('off')
    plt.show()