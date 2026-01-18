// src/workers/reminderWorker.ts
import { Worker } from 'bullmq';

const connectionOptions = { host: '127.0.0.1', port: 6379 };

new Worker(
  'weight-in-reminders',
  async job => {
    console.log(`Send weight-in reminder to user ${job.data.userId}`);
  },
  { connection: connectionOptions } // <-- plain options
);
