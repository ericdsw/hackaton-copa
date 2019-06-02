import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  const { 
    origin,
    destination,
    date,
    time,
  } = req.query;

  res.json({
    noShow: {
      wontShow: 5.8,
      confidence: 0.3,
      records: 1000,
    },
  });
});

export default router;
