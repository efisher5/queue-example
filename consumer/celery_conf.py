from celery import Celery
from kombu import Exchange, Queue

# Create Celery instance
# Note no backend param. This implementation makes an API call to Node after task completion
# No data needs to be stored
app = Celery('my_tasks', broker='redis://redis/0', include=['tasks'])
app.conf.task_queues = (
    # Task queues
    Queue('celeryClient', Exchange('celeryClient'), routing_key='celeryClient'),
)