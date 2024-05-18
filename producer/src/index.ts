import { Queue } from "bullmq";
import express from "express";

// Express setup
const app = express();
const port = 3000;

// Queue setup
const queue = new Queue('Cities');

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})