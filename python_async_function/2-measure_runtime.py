#!/usr/bin/env python3
"""Module that provides a function to measure the average execution
time of wait_n."""

import time
import asyncio

# Importation de la fonction wait_n depuis le fichier précédent
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Measures the average time (in seconds) taken for wait_n to complete n
    executions with a given max_delay."""

    # On capture le temps avant de lancer wait_n
    start = time.time()

    # Exécution de la coroutine wait_n
    # (grâce à asyncio.run, car on est dans une fonction synchrone)
    asyncio.run(wait_n(n, max_delay))

    # Temps après exécution
    end = time.time()

    # Calcul du temps total écoulé
    total_time = end - start

    # Retourne le temps moyen par appel
    return total_time / n
