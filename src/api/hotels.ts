import { Router } from 'express';
import { Client } from '@temporalio/client';
import { compareHotelPrices } from '../temporal/workflows';

const router = Router();

router.get('/', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'Missing city parameter' });
  }

  try {
    const client = new Client();
    const result = await client.workflow.execute(compareHotelPrices, {
      args: [city.toString()],
      taskQueue: 'hotel-comparison',
      workflowId: `compare-${city}-${Date.now()}`,
    });

    res.json(result);
  } catch (error) {
    console.error('Workflow failed:', error);
    res.status(500).json({ error: 'Failed to compare hotel prices' });
  }
});

export default router;