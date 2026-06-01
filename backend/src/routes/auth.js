import express from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { createFaceEncoding } from '../utils/faceEncoding.js';

dotenv.config();
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const JWT_SECRET = process.env.JWT_SECRET || 'smartattend-secret-key';

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};

router.post('/register', upload.single('faceImage'), async (req, res) => {
  try {
    const { name, employeeId, email, password, department, role } = req.body;

    if (!name || !employeeId || !email || !password || !department) {
      return res.status(400).json({ message: 'Name, employee ID, email, password and department are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Face image upload is required for registration.' });
    }

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { employeeId: employeeId.trim() },
      ],
    });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email or employee ID already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const faceEncoding = createFaceEncoding(req.file.buffer);

    const user = await User.create({
      name,
      employeeId: employeeId.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      department,
      role: role === 'admin' ? 'admin' : 'employee',
      faceEncoding,
    });

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -faceEncoding');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not load profile', error: error.message });
  }
});

router.get('/admin/users', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password -faceEncoding');
    return res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not load users', error: error.message });
  }
});

export default router;
