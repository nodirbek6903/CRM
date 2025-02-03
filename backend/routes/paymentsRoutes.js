const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getPayments); // Get all payments
router.get('/student/:studentId', paymentController.getPaymentsByStudent); // Get payments for a specific student
router.post('/', paymentController.createPayment); // Create a new payment
router.put('/:id', paymentController.updatePayment); // Update a payment by ID

module.exports = router;
