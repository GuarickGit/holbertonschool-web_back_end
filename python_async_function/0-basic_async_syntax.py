#!/usr/bin/env python3
"""Module that contains a coroutine to wait for a random delay."""

import asyncio
import random


async def wait_random(max_delay: int = 10) -> float:
    """Asynchronously wait for a random delay between 0 and max_delay
    seconds and return the delay."""

    timer = random.uniform(0, max_delay)
    await asyncio.sleep(timer)
    return (timer)
