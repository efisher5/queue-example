from celery_conf import app
import requests
import json
import time

@app.task()
def process_task(x):
    # Process task here
    # For example purposes, this time is longer than typical
    time.sleep(10)

    # Convert JSON string to Python object
    x = json.loads(x)
    requests.post('http://node_server:3000/results', json=x)
    return x