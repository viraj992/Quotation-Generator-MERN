//quotationController.js in controllers
const Quotation = require('../models/quotationModel');

exports.saveQuotation = async (req, res) => {
  try {
    const newQuotation = new Quotation(req.body);
    await newQuotation.save();
    res.status(201).json({ message: 'Quotation saved successfully' });
  } catch (error) {
    console.error('Error saving quotation:', error);
    res.status(500).json({ error: 'Failed to save quotation' });
  }
};
