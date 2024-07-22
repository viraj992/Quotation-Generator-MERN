//adminController.js
const User = require('../models/userModel');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');

// Add new user
exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role, // Ensure role can be 'user' or 'admin'
        });

        res.status(201).json({
            status: 'success',
            message: 'User added successfully',
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

// Change user password
exports.changePassword = async (req, res, next) => {
    try {
        const { userId, newPassword } = req.body;

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

// View all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('+password'); // Include password field if needed
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};


// Edit user details
exports.editUser = async (req, res, next) => {
    try {
        const { name, email, phone, role } = req.body; 
        const userId = req.params.userId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(new createError("User not found", 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return next(new createError("User not found", 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
