//quotationRoute.js in routes
const express = require('express');
const router = express.Router();
const { saveQuotation } = require('../controllers/quotationController');

router.post('/saveQuotation', saveQuotation);

module.exports = router;
