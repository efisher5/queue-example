from fastapi import FastAPI, WebSocket
from celery_app import celery_app, consume_message
from celery.result import AsyncResult

