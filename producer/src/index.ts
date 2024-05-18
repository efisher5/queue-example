import { Queue } from "bullmq";
import express from "express";
import { v4 as uuidv4 } from "uuid";

// Express setup
const app = express();
const port = 3000;

// Queue setup
// Create queue
const queue = new Queue('Cities', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

// Endpoints
// Add job to queue
const addJob = async () => {
    const jobId = uuidv4();
    await queue.add(`job-${jobId}`, {
        text: 'Hello, this job has id ' + jobId
    })
    console.log(`Added job ${jobId} to the queue`);
}

// View list of jobs
const getJobs = async () => {
    // getJobs takes an array of statuses
    // TODO - research the statuses. I believe most jobs have 'waiting' status but not 100% sure
    const jobs = await queue.getJobs(['active', 'delayed', 'waiting']);
    console.log(jobs);
}

addJob();
getJobs();

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})