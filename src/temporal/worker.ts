import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { compareHotelPrices } from './workflows';

export async function startWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hotel-comparison',
  });
  
  console.log('Temporal worker started');
  await worker.run();
}