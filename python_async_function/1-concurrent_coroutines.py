#!/usr/bin/env python3
"""
This module provides an asynchronous routine to run multiple coroutines
concurrently, each waiting for a random delay, and collects the results in
ascending order of completion.
"""

import asyncio
from typing import List

# Importation de la fonction wait_random définie dans un autre fichier
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Executes the wait_random coroutine n times concurrently with the given
    max_delay.
    Returns a list of the delays in the order they complete
    (not the order they were started).

    Args:
        n (int): The number of times to call wait_random.
        max_delay (int): The maximum possible delay for each wait_random call.

    Returns:
        List[float]: A list of floats representing the actual delays, sorted
                     in the order they completed.
    """
    # Liste pour stocker les délais à mesure qu'ils sont renvoyés
    delays: List[float] = []

    # Création d'une liste de tâches asynchrones, chacune appelant
    # wait_random(max_delay)
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]

    # Récupération des résultats des tâches au fur et à mesure qu'elles
    # se terminent
    for task in asyncio.as_completed(tasks):
        delay = await task  # On attend la fin de la tâche
        delays.append(delay)

    # La liste finale contient les délais dans l'ordre de complétion
    return delays
