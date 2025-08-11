#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialize the Server instance with empty dataset caches."""
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Return a page of the dataset with deletion resilience.

        Args:
            index (int): The starting index for the page. Must be >= 0.
            page_size (int): The number of items to return.

        Returns:
            dict: A dictionary containing:
                - index (int): The starting index of the returned page.
                - next_index (int or None): The index to start the next page,
                  or None if there is no next page.
                - page_size (int): The number of items in the returned page.
                - data (list): The actual page data.
        """
        # Validation: 'index' doit être un entier >= 0
        assert isinstance(index, int) and index >= 0

        # Récupération du dataset indexé (dict {index: ligne})
        dataset = self.indexed_dataset()

        # On va collecter 'page_size' éléments à partir de 'index'
        data = []
        current_index = index

        # Parcours séquentiel tant qu'on n'a pas rempli la page et
        # qu'on reste dans la plage des index disponibles
        while len(data) < page_size and current_index < len(dataset):
            # Vérifie que l'index existe encore dans le dict
            # (résilience aux suppressions d'entrées)
            if current_index in dataset:
                # Ajoute la ligne correspondante à la page
                data.append(dataset[current_index])
                # Passe à l'index suivant
                # (peut sauter des trous si suppression)
                current_index += 1

        # Si aucune donnée n'a pu être collectée (ex: index trop grand),
        # on renvoie une page vide et pas de next_index
        if not data:
            return {
                "index": index,  # index demandé au départ
                "next_index": None,  # pas de page suivante
                "page_size": 0,  # page vide
                "data": []  # données vides
            }

        # Construction de la réponse hypermédia paginée
        result = {
                "index": index,
                "next_index": current_index if current_index < len(dataset)
                else None,
                "page_size": len(data),
                "data": data
        }

        # index: index de départ pour cette page
        # next_index: là où reprendre pour la prochaine page si possible
        # page_size: # Nombre réel d'éléments renvoyés
        # (peut être < page_size)
        # data: Contenu de la page

        # Renvoie la structure de pagination
        return result
