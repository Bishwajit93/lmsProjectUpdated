import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser  } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, max: 50  }),
  ], registerUser);


router.post('/login', loginUser);

export default router;
