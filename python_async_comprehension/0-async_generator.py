#!/usr/bin/env python3
"""
This module contains an asynchronous generator that yields random float values.
"""

import asyncio
from typing import AsyncGenerator
import random


async def async_generator() -> AsyncGenerator[float, None]:
    """
    Asynchronously yields 10 random float numbers between 0 and 10,
    waiting 1 second between each.
    """
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.random() * 10
