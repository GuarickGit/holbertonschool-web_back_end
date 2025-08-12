#!/usr/bin/env python3
"""Provide some stats about Nginx logs stored in MongoDB.

This script connects to a MongoDB instance, queries the `logs.nginx`
collection, and displays:
- The total number of logs
- The number of logs per HTTP method
- The number of status check logs (method GET and path /status)

The output format is fixed to match Holberton's requirements.
"""

from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    nginx_collection = client.logs.nginx

    total_logs = nginx_collection.count_documents({})

    GET = nginx_collection.count_documents({"method": "GET"})
    POST = nginx_collection.count_documents({"method": "POST"})
    PUT = nginx_collection.count_documents({"method": "PUT"})
    PATCH = nginx_collection.count_documents({"method": "PATCH"})
    DELETE = nginx_collection.count_documents({"method": "DELETE"})

    status_check = nginx_collection.count_documents(
        {"method": "GET", "path": "/status"}
    )

    print(total_logs, "logs")

    print("Methods:")

    print("\tmethod GET:", GET)
    print("\tmethod POST:", POST)
    print("\tmethod PUT:", PUT)
    print("\tmethod PATCH:", PATCH)
    print("\tmethod DELETE:", DELETE)
    print(status_check, "status check")
