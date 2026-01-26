const Review = require("../models/Review");
const Gym = require("../models/Gym");

/**
 * POST /gyms/:gymId/reviews
 * User only - Add a review
 */
exports.addReview = async (req, res) => {
    try {
        const { gymId } = req.params;
        const { rating, comment } = req.body;

        const gym = await Gym.findById(gymId);
        if (!gym) {
            return res.status(404).json({ message: "Gym not found" });
        }

        // specific check: prevent duplicate reviews (also handled by unique index)
        const existingReview = await Review.findOne({
            userId: req.user.id,
            gymId: gymId,
        });

        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this gym" });
        }

        const review = await Review.create({
            userId: req.user.id,
            gymId,
            rating,
            comment,
        });

        // Update Gym Stats
        // We can do this efficiently with aggregation or just incrementally for simplicity here.
        // Let's use aggregation so it's accurate even if we edit reviews later (if we add that feature).
        const stats = await Review.aggregate([
            { $match: { gymId: gym._id } },
            {
                $group: {
                    _id: "$gymId",
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 },
                },
            },
        ]);

        if (stats.length > 0) {
            gym.averageRating = stats[0].averageRating;
            gym.reviewCount = stats[0].reviewCount;
        } else {
            gym.averageRating = 0;
            gym.reviewCount = 0;
        }

        await gym.save();

        res.status(201).json(review);
    } catch (error) {
        console.error("Add review error", error);
        res.status(500).json({ message: "Failed to add review" });
    }
};

/**
 * GET /gyms/:gymId/reviews
 * Public - Get reviews for a gym
 */
exports.getGymReviews = async (req, res) => {
    try {
        const { gymId } = req.params;
        const reviews = await Review.find({ gymId })
            .sort({ createdAt: -1 })
            .populate("userId", "name"); // Assuming User has 'name'

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
