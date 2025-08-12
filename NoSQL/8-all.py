#!/usr/bin/env python3
"""Module that defines a function to list all documents in a MongoDB
collection."""


def list_all(mongo_collection):
    """Lists all documents in a MongoDB collection.

    Args:
        mongo_collection (pymongo.collection.Collection): The collection
        to query.

    Returns:
        list: A list of all documents in the collection, or an empty list if
        no documents are found.
    """
    documents = list(mongo_collection.find())
    return documents
