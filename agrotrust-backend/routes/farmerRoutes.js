import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Farmer from "../models/Farmer.js";
import express from 'express'
import Farmer from '../models/Farmer.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


dotenv.config();
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("Registration request received:", req.body);
    const { name, phone, email, password, location, crops } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFarmer = new Farmer({
      name,
      phone,
      email,
      password: hashedPassword,
      location,
      crops,
    });

    const savedFarmer = await newFarmer.save();
    console.log("Farmer saved successfully:", savedFarmer._id);
    
    res.status(201).json({ 
      message: "Farmer registered successfully",
      farmerId: savedFarmer._id 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const farmer = await Farmer.findOne({ email })
    if (!farmer) {
      return res.status(400).json({ message: 'Farmer not found' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, farmer.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign(
      { id: farmer._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      message: 'Login successful',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email
      }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router

