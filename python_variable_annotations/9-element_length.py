#!/usr/bin/env python3
"""Module that computes the length of elements in an iterable of sequences."""

from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Returns a list of tuples containing each element from the input iterable
    along with its length.

    Parameters:
        lst (Iterable[Sequence]): An iterable containing sequence-type elements
        (e.g., lists, strings, tuples).

    Returns:
        List[Tuple[Sequence, int]]: A list of tuples where each tuple contains
        the original element and its length.
    """
    return [(i, len(i)) for i in lst]
