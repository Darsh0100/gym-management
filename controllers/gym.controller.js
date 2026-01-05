const Gym = require("../models/Gym");

/**
 * GET /gyms
 * Public – list gyms with pagination, filtering & search
 */
exports.getAllGyms = async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // filtering & search
    const query = {};

    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const gyms = await Gym.find(query)
      .skip(skip)
      .limit(limit)
      .sort(
        req.query.search ? { score: { $meta: "textScore" } } : { createdAt: -1 }
      )
      .select(req.query.search ? { score: { $meta: "textScore" } } : {});

    const totalGyms = await Gym.countDocuments(query);

    res.json({
      page,
      limit,
      totalGyms,
      totalPages: Math.ceil(totalGyms / limit),
      gyms,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gyms" });
  }
};

/**
 * GET /gyms/:id
 * Public – get single gym details
 */
exports.getGymById = async (req, res) => {
  try {
    const { id } = req.params;

    const gym = await Gym.findById(id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    res.json(gym);
  } catch (error) {
    res.status(400).json({ message: "Invalid gym ID" });
  }
};

/**
 * POST /gyms
 * Owner only – create gym
 */
exports.createGym = async (req, res) => {
  try {
    const { name, address, city, description, facilities } = req.body;

    const gym = await Gym.create({
      name,
      address,
      city,
      description,
      facilities,
      ownerId: req.user.id, // from JWT middleware
    });

    res.status(201).json(gym);
  } catch (error) {
    res.status(400).json({ message: "Failed to create gym" });
  }
};

// UPDATE gym (owner only)
exports.updateGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    // ownership check
    if (gym.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your gym" });
    }

    Object.assign(gym, req.body);
    await gym.save();

    res.json(gym);
  } catch (error) {
    res.status(400).json({ message: "Failed to update gym" });
  }
};

// DELETE gym (owner only)
exports.deleteGym = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);

    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }

    if (gym.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your gym" });
    }

    await gym.deleteOne();
    res.json({ message: "Gym deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete gym" });
  }
};
