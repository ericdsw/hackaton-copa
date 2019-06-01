import { Router } from 'express';

import { getAirports } from '../services/iata';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const airports = await getAirports();
    res.json({ airports });
  } catch (err) {
    next(err);
  }
});

export default router;
