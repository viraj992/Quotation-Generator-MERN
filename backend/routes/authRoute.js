// authRoute.js in routes
const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController'); // Import adminController



const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/supplier/:email', authController.getSupplierByEmail); // Add this line
// Admin routes
router.post('/admin/add-user', adminController.addUser);
router.post('/admin/change-password', adminController.changePassword);
router.get('/admin/users', adminController.getAllUsers);
router.put('/admin/edit-user/:userId', adminController.editUser);
router.delete('/admin/delete-user/:userId', adminController.deleteUser);

///api/auth/admin/update-user/:id

module.exports = router;
