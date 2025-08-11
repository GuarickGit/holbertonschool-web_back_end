#!/usr/bin/env python3
"""
Pagination utilities for the Popular_Baby_Names.csv dataset.

This module defines the Server class, which loads and caches the CSV data and
exposes a `get_page` method to retrieve a specific page of rows. It also
provides the `index_range` helper to compute (start, end) indices for any
page number and page size, enabling efficient, slice-based pagination.
"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"  # Fichier CSV contenant les données

    def __init__(self):
        # Attribut privé pour stocker le dataset en cache
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            # Lecture du fichier CSV
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            # On enlève la première ligne (l'en-tête du CSV)
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieve a specific page of the dataset.

        Args:
            page (int): The page number to retrieve (1-indexed).
            Must be a positive integer.
            page_size (int): The number of items per page.
            Must be a positive integer.

        Returns:
            List[List]: A list of rows corresponding to the requested
            page of the dataset.
            Each row is represented as a list of strings (CSV columns).
            Returns an empty
            list if the page is out of range.

        Raises:
            AssertionError: If either `page` or `page_size` is not a
            positive integer.

        The method uses `index_range` to determine the start and end
        indices of the page
        and slices the dataset accordingly.
        """
        # Vérifie que les paramètres sont des entiers positifs
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # Calcule les indices de début et de fin pour la page demandée
        start, end = index_range(page, page_size)

        # Récupère le dataset complet
        data = self.dataset()

        # Retourne la tranche correspondant à la page
        # Si start > len(data), Python renverra automatiquement []
        return data[start:end]


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate the start and end indexes for a given page in pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing the start index (inclusive) and
        end index (exclusive).
    """
    # L'indice de début correspond au nombre d'éléments des pages précédentes
    start_index = (page - 1) * page_size
    # L'indice de fin correspond au dernier élément inclus dans la page
    end_index = page * page_size

    return (start_index, end_index)
