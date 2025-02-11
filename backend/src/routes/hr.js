import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/hrController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getEmployees)
  .post(protect, admin, createEmployee);

router.route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, admin, updateEmployee)
  .delete(protect, admin, deleteEmployee);

export default router;