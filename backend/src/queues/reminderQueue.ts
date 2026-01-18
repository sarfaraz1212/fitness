// src/queues/reminderQueue.ts
import { Queue } from 'bullmq';

const connectionOptions = { host: '127.0.0.1', port: 6379 };

export const reminderQueue = new Queue('weight-in-reminders', {
  connection: connectionOptions,
});
