const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * PUT /auth/me
 * Update user profile (name)
 */
exports.updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        // validation
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ message: "Name is required" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // update
        user.name = name;
        await user.save();

        // Generate new token with updated name so frontend can update context immediately without refresh if it decodes token,
        // or just return the user and frontend updates state.
        // Let's return the new token too, so frontend can update localStorage.

        // Actually, getting token from backend on update is a good practice to keep claims fresh.
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Profile updated successfully",
            user,
            token
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};
