import express from 'express';
import {
  getFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance
} from '../controllers/financeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getFinances)
  .post(protect, admin, createFinance);

router.route('/:id')
  .get(protect, getFinanceById)
  .put(protect, admin, updateFinance)
  .delete(protect, admin, deleteFinance);

export default router;