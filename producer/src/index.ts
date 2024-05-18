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
app.post('/job', async (req, res) => {
    // Create a new id for job
    const jobId = uuidv4();

    // Add job to queue
    await queue.add(`job-${jobId}`, {
        text: 'Hello, this job has id ' + jobId,
    });

    // Log newly created job and send job id back
    console.log(`Added job ${jobId} to the queue`);
    res.send({ jobId: jobId });
})

// View list of jobs
app.get('/jobs', async (req, res) => {
    /** getJobs takes an array of statuses
     * TODO - research statuses. I believe most jobs have 'waiting' status but not 100% sure
     */
    const jobs = await queue.getJobs(['active', 'waiting']);

    console.log(`Displaying ${jobs.length} jobs`);
    res.send({ jobs: jobs })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})