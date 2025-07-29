#!/usr/bin/env python3
"""Asynchronous routine to spawn multiple wait_random calls
and return sorted delays."""

import asyncio
import bisect

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
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]

    delays = []

    for task in asyncio.as_completed(tasks):
        delay = await task
        bisect.insort(delays, delay)

    return (delays)
