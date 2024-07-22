// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const quotationRoutes = require('./routes/quotationRoute');


const app = express();

//1) middlewares
app.use(cors());
app.use(express.json());

//2) Routes
app.use('/api/auth', authRouter);
app.use('/api', quotationRoutes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
