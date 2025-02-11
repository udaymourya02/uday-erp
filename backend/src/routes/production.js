import express from 'express';
import {
  getProductions,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction
} from '../controllers/productionController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getProductions)
  .post(protect, admin, createProduction);

router.route('/:id')
  .get(protect, getProductionById)
  .put(protect, admin, updateProduction)
  .delete(protect, admin, deleteProduction);

export default router;