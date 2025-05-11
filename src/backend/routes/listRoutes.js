// backend/routes/listRoutes.js

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
  getShoppingLists, 
  createShoppingList, 
  deleteShoppingList, 
  updateShoppingList, 
  getSingleShoppingList 
} from '../controllers/listController.js';

const router = express.Router();

// Route to get shopping lists (protected)
router.get('/', authMiddleware, getShoppingLists);

// Route to create a new shopping list (protected)
router.post('/', authMiddleware, createShoppingList);

// Route to delete an existing shopping list (protected)
router.delete('/:id', authMiddleware, deleteShoppingList);

// Route to update/edit a shopping list (protected)
router.put('/:id', authMiddleware, updateShoppingList);

// Route to get a single shopping list (protected)
router.get('/:id', authMiddleware, getSingleShoppingList);

export default router;
