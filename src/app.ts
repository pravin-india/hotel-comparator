import express from 'express';
import hotelsRouter from './api/hotels';
import healthRouter from './api/health';
import { startWorker } from './temporal/worker';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/hotels', hotelsRouter);
app.use('/health', healthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startWorker().catch((err) => console.error('Temporal worker failed:', err));
});