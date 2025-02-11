import express from 'express';
import {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
} from '../controllers/salesController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getSales)
  .post(protect, admin, createSale);

router.route('/:id')
  .get(protect, getSaleById)
  .put(protect, admin, updateSale)
  .delete(protect, admin, deleteSale);

export default router;