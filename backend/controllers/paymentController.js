const Payment = require('../models/Payment');
const Student = require('../models/Student');

// Get all payments
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('studentId');
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get payments for a specific student
exports.getPaymentsByStudent = async (req, res) => {
    try {
        const payments = await Payment.find({ studentId: req.params.studentId }).populate('studentId');
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a payment
exports.createPayment = async (req, res) => {
    try {
        const student = await Student.findById(req.body.studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
