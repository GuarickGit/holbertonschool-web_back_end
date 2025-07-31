#!/usr/bin/env python3
"""Asynchronous task scheduler that waits for a series of delays."""

import asyncio
import typing

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> typing.List[float]:
    """
    Execute multiple asynchronous tasks that wait for a random delay.

    Args:
        n (int): The number of tasks to run.
        max_delay (int): The maximum delay (in seconds) for each task.

    Returns:
        List[float]: A list of all the delays in the order they completed.
    """
    delays: typing.List[float] = []

    # Création de la liste de tâches (coroutines) à lancer
    tasks = [task_wait_random(max_delay) for _ in range(n)]

    # On parcourt les tâches au fur et à mesure qu'elles se terminent
    for task in asyncio.as_completed(tasks):
        delay = await task  # On attend la fin de la tâche
        delays.append(delay)  # On ajoute le délai mesuré à la liste

    # Retourne la liste des délais, dans l'ordre d'achèvement
    return delays
