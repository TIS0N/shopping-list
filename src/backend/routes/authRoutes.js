import express from 'express';
import { register, login } from '../controllers/authController.js';  // Import the controller functions
const router = express.Router();

// Define your routes here
router.post('/register', register);  // Connect the register function from authController
router.post('/login', login);  // Connect the login function from authController

// Export routes as the default export
export default router;
