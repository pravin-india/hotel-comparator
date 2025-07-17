import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const [supplierA, supplierB] = await Promise.all([
      axios.get('http://localhost:3000/supplierA/hotels?city=delhi'),
      axios.get('http://localhost:3000/supplierB/hotels?city=delhi')
    ]);

    res.json({
      status: 'UP',
      suppliers: {
        supplierA: supplierA.status === 200 ? 'UP' : 'DOWN',
        supplierB: supplierB.status === 200 ? 'UP' : 'DOWN'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      error: 'Supplier check failed'
    });
  }
});

export default router;