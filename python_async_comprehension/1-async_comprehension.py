#!/usr/bin/env python3
"""Module that defines a coroutine to asynchronously collect random numbers."""

from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect 10 random numbers asynchronously using async comprehension."""
    # Récupère les 10 nombres générés de manière asynchrone et les
    # stocke dans une liste
    return [i async for i in async_generator()]
