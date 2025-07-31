#!/usr/bin/env python3
"""Module that measures the total runtime of running async_comprehension
four times in parallel."""

import time
import asyncio

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Measures the total runtime of executing async_comprehension
    4 times in parallel."""

    # On enregistre le temps de départ
    start = time.perf_counter()

    # On prépare une liste de 4 coroutines async_comprehension
    tasks = [async_comprehension() for _ in range(4)]

    # On exécute toutes les coroutines en parallèle avec asyncio.gather
    await asyncio.gather(*tasks)

    # On enregistre le temps de fin
    end = time.perf_counter()

    # On calcule la durée totale d'exécution
    delay = end - start

    # On retourne cette durée
    return delay
