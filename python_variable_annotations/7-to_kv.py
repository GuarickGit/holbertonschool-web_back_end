#!/usr/bin/env python3
"""Module that defines a function to return a key and the square of a
value as a tuple."""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Returns a tuple with a string and the square of a number.

    Args:
        k (str): The key to be used as the first element of the tuple.
        v (Union[int, float]): A number (int or float) to be squared.

    Returns:
        Tuple[str, float]: A tuple where the first element is `k`,
        and the second is `v` squared as a float.
    """
    return (k, (v ** 2))
