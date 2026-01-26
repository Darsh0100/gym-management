const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");
const Plan = require("../models/Plan");
const Gym = require("../models/Gym");

/**
 * Create mock payment (step 1)
 */
exports.createPayment = async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const gym = await Gym.findById(plan.gymId);

    // 🔴 PREVENT DUPLICATE ENROLLMENT (Fast Fail)
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      planId: plan._id,
      status: "active",
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already active in this plan." });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      gymId: gym._id,
      planId: plan._id,
      amount: plan.price,
      status: "created",
    });

    res.status(201).json({
      paymentId: payment._id,
      amount: payment.amount,
      status: payment.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Payment creation failed" });
  }
};

/**
 * Confirm mock payment (step 2)
 * ✅ THIS is where your pasted logic belongs conceptually
 */
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // security: user can confirm only their own payment
    if (payment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🔴 PREVENT DUPLICATE ENROLLMENT (Double Check)
    const existingEnrollment = await Enrollment.findOne({
      userId: payment.userId,
      planId: payment.planId,
      status: "active",
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already active in this plan. Payment cancelled." });
    }

    // mark payment success
    payment.status = "success";
    await payment.save();

    // create enrollment
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    await Enrollment.create({
      userId: payment.userId,
      gymId: payment.gymId,
      planId: payment.planId,
      startDate,
      endDate,
    });

    res.json({ message: "Payment successful & enrollment created" });
  } catch (error) {
    res.status(500).json({ message: "Payment confirmation failed" });
  }
};
