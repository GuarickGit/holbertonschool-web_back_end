#!/usr/bin/env python3
"""Module that defines a function to create a multiplier function."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Returns a function that multiplies its input by a given multiplier.

    Args:
        multiplier (float): The number to multiply by.

    Returns:
        Callable[[float], float]: A function that takes a float and
        returns the result of multiplying it by `multiplier`.
    """
    def multiply_function(n: float) -> float:
        """
        Multiplies a number by the outer-scope multiplier.

        Args:
            n (float): The number to multiply.

        Returns:
            float: The product of `n` and `multiplier`.
        """
        return n * multiplier

    return multiply_function

# La fonction make_multiplier retourne une autre fonction (appelable).
# Cette fonction retournée prend un float en argument et retourne un float.
# On utilise "Callable[[float], float]" pour typer cela :
# cela signifie une fonction qui prend un float et retourne un float.
