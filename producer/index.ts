import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import * as celery from "celery-node";
import { Job } from "./job.dto"

// Express setup
const app = express();
app.use(express.json());
const port = 3000;

/**
 * Create celery client
 * Note that there is a backend param here despite not having one on Python side
 * node-celery requires a parameter here. It will default to 'amqp://' (RabbitMQ URL)
 * if set to undefined. This will cause a connection refusal error
 */
const celeryClient = celery.createClient(
    'redis://redis:6379/0',
    'redis://redis:6379/0',
    'celeryClient'
)

// Endpoints
// Add job to queue
app.post('/job', async (req, res) => {
    // Create job object
    const newJob = new Job();
    newJob.id = uuidv4();
    newJob.message = "The id for this job is " + newJob.id;
    newJob.args = [
        'carrots', 'chicken', 'rice'
    ]

    // Create task for predefined task in Celery
    const task = celeryClient.createTask('tasks.process_task');

    // Add task to queue
    task.applyAsync([JSON.stringify(newJob)]);

    // Log newly created job
    console.log("Added job " + newJob.id + " to the queue.");
    res.send();
})

// Confirm results have been passed back to server
app.post('/results', (req, res) => {
    console.log(req.body);
    res.send();
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})