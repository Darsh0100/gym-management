const Plan = require("../models/Plan");
const Gym = require("../models/Gym");

/**
 * POST /plans
 * Owner only – add plan to a gym
 */
exports.createPlan = async (req, res) => {
  try {
    const { gymId, name, price, duration, benefits } = req.body;

    // check gym exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // (optional but important) ensure owner owns this gym
    if (gym.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your gym" });
    }

    const plan = await Plan.create({
      gymId,
      name,
      price,
      duration,
      benefits,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: "Failed to create plan" });
  }
};

/**
 * GET /gyms/:id/plans
 * Public – list plans of a gym
 */
exports.getPlansByGym = async (req, res) => {
  try {
    const { id } = req.params;

    const plans = await Plan.find({ gymId: id }).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch plans" });
  }
};

/**
 * PUT /plans/:id
 * Owner only – update plan
 */
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // find gym of the plan
    const gym = await Gym.findById(plan.gymId);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // ownership check
    if (gym.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your gym" });
    }

    // update fields
    Object.assign(plan, req.body);
    await plan.save();

    res.json(plan);
  } catch (error) {
    res.status(400).json({ message: "Failed to update plan" });
  }
};

/**
 * DELETE /plans/:id
 * Owner only – delete plan
 */
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // find gym of the plan
    const gym = await Gym.findById(plan.gymId);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // ownership check
    if (gym.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your gym" });
    }

    await plan.deleteOne();
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete plan" });
  }
};
