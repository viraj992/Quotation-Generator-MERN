//quotationModel.js
const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  customer: {
    name: String,
    companyName: String,
    address: String,
    email: String,
    phone: String,
  },
  quotationNumber: String,
  date: String,
  validcode: String,
  products: [
    {
      code: String,
      description: String,
      quantity: Number,
      unitPrice: Number,
    }
  ],
  total: Number
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
