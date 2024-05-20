import { Redis } from "ioredis";
import express from "express";
import { v4 as uuidv4 } from "uuid";

// Express setup
const app = express();
const port = 3000;

// Establish Redis connection
const redis = new Redis();

// Endpoints
// Add job to queue
app.post('/job', async (req, res) => {
    // Create a new id for job
    const jobId = uuidv4();
    const obj = { text: `This job has id: ${jobId}` };

    // Add job to queue
    // Note: Redis only accepts string values
    await redis.lpush('q-example', JSON.stringify(obj))

    // Log newly created job and send job id back
    console.log(`Added job ${jobId} to the queue`);
    res.send({ jobId: jobId });
})

// View list of jobs
app.get('/jobs', async (req, res) => {
    // Get the full range of jobs
    const jobs = await redis.lrange('q-example', 0, -1);

    console.log(`Displaying ${jobs.length} jobs`);
    res.send({ jobs: jobs })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})