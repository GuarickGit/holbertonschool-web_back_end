#!/usr/bin/env python3
"""Asynchronous routine to spawn multiple wait_random calls
and return sorted delays."""

import asyncio
import bisect

from typing import List

# Importation de la fonction wait_random définie dans un autre fichier
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> list[float]:
    """
    Spawn `n` asynchronous tasks that each wait for a random delay up to
    `max_delay`, then return a list of the delays in ascending order.

    Args:
        n (int): Number of tasks to spawn.
        max_delay (int): Maximum delay (in seconds) for each task.

    Returns:
        list[float]: Sorted list of delays from all tasks.
    """
    # Création des tâches asynchrones avec wait_random
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]

    # Liste pour stocker les délais au fur et à mesure
    delays: List[float] = []

    # asyncio.as_completed retourne les tâches dans
    # l'ordre où elles se terminent
    for task in asyncio.as_completed(tasks):
        delay = await task  # On attend que la tâche soit terminée
        bisect.insort(delays, delay)  # Insertion triée du délai dans la liste

    return (delays)  # On retourne la liste finale triée des délais
