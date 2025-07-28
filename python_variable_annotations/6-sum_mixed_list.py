#!/usr/bin/env python3
"""Module that defines a function to sum a list of integers and floats."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Returns the sum of a list containing both integers and floats.

    Args:
        mxd_lst (List[Union[int, float]]): A list of integers and/or floats.

    Returns:
        float: The sum of all elements in the list as a float.
    """
    return sum(mxd_lst)
