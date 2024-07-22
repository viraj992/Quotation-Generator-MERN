//authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');

// Register User
exports.signup = async (req, res, next) => {
    try {
        const { email, password, phone } = req.body;

        if (phone.toString().length !== 10) {
            return next(new createError("Phone number must be exactly 10 digits", 400));
        }

        const user = await User.findOne({ email });
        if (user) {
            return next(new createError("User already exists", 400));
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // Assign JWT to user
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Logging User
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(new createError("User not found!", 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError("Invalid email or password", 401));
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in successfully.',
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get Supplier Details by Email
exports.getSupplierByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });

        if (!user) {
            return next(new createError("Supplier not found", 404));
        }

        res.status(200).json({
            status: 'success',
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    } catch (error) {
        next(error);
    }
};

// Get All Users (for development/debugging purposes)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('+password'); // Include password field
    
    // Replace hashed passwords with a placeholder
    const usersWithPasswords = users.map(user => ({
      ...user._doc,
      password: 'DECRYPTED_PASSWORD_PLACEHOLDER', // Replace with your placeholder
    }));

    res.status(200).json({
      status: 'success',
      results: usersWithPasswords.length,
      data: usersWithPasswords,
    });
  } catch (error) {
    next(error);
  }
};
