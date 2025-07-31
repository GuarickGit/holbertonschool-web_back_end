#!/usr/bin/env python3
"""Module that defines a function to create an asyncio Task from the
wait_random coroutine."""


import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """
    Creates and returns an asyncio Task for the wait_random coroutine.

    Args:
        max_delay (int): The maximum number of seconds to wait.

    Returns:
        asyncio.Task: An asyncio Task object wrapping the
        wait_random coroutine.
    """
    return asyncio.create_task(wait_random(max_delay))
