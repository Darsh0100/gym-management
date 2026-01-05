const Enrollment = require("../models/Enrollment");
const Plan = require("../models/Plan");
const Gym = require("../models/Gym");

/**
 * POST /enroll
 * User only – enroll in a plan
 */
exports.enrollUser = async (req, res) => {
  try {
    const { planId } = req.body;

    // find plan
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // 🔴 PREVENT DUPLICATE ENROLLMENT
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      planId: planId,
      status: "active",
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "You are already enrolled in this plan",
      });
    }

    // find gym
    const gym = await Gym.findById(plan.gymId);
    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      gymId: gym._id,
      planId: plan._id,
      startDate,
      endDate,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: "Enrollment failed" });
  }
};

/**
 * GET /my-enrollments
 * User only – view own enrollments
 */
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.user.id,
    })
      .populate("gymId", "name city")
      .populate("planId", "name price duration");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};
