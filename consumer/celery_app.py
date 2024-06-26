from celery import Celery
import redis

# Creating Celery instance and configuration
# Note that first param doesn't have to match queue name
celery_app = Celery('tasks', broker='redis://localhost:6379')
celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True
)

@celery_app.task
# Logic for 'processing' the task
def consume_message(data):
    print('Consumed data: {data}')

# The worker
def start_worker():
    r = redis.Redis()
    isEmpty = False

    # While there are tasks, pop them individually for proessing
    while not(isEmpty):
        task_data = r.lpop('q-example')
        if task_data:
            print(f'Consuming {task_data}')
            consume_message.delay(task_data)
        
        # We want to stop running this function when there are no more elements
        if len(r.lrange('q-example', 0, 1)) == 0:
            isEmpty = True

if __name__ == '__main__':
    start_worker()
