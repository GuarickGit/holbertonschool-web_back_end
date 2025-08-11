#!/usr/bin/env python3
"""Module providing a helper function for calculating pagination index
ranges."""


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate the start and end indexes for a given page in pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing the start index (inclusive) and
        end index (exclusive).
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size

    return (start_index, end_index)
