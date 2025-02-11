import express from 'express';
import {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
} from '../controllers/inventoryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getInventory)
  .post(protect, admin, createInventory);

router.route('/:id')
  .get(protect, getInventoryById)
  .put(protect, admin, updateInventory)
  .delete(protect, admin, deleteInventory);

export default router;