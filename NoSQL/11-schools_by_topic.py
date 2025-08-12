#!/usr/bin/env python3
"""Module that provides a function to retrieve schools by a specific topic
from a MongoDB collection."""


def schools_by_topic(mongo_collection, topic):
    """
    Retrieves a list of schools that have a specific topic.

    Args:
        mongo_collection (Collection): The PyMongo collection object.
        topic (str): The topic to search for.

    Returns:
        list: A list of documents representing the schools matching the
        given topic.
    """
    # Utilise la méthode find() de MongoDB pour récupérer tous les documents
    # où le tableau 'topics' contient la valeur du paramètre 'topic'
    result = list(mongo_collection.find({"topics": topic}))

    return result
