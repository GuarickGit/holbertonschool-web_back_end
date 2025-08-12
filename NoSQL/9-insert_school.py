#!/usr/bin/env python3
"""Insert a new document into a MongoDB collection."""


def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document into the given MongoDB collection.

    Args:
        mongo_collection (Collection): The pymongo collection object.
        **kwargs: Key-value pairs to insert as the document fields.

    Returns:
        ObjectId: The _id of the newly inserted document.
    """
    posts = mongo_collection.insert_one(kwargs)

    return posts.inserted_id
