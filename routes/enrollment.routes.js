const express = require("express");
const router = express.Router();
const {
  enrollUser,
  getMyEnrollments,
} = require("../controllers/enrollment.controller");

const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /enroll:
 *   post:
 *     summary: Enroll user in a plan
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment successful
 */

// 👤 User only – enroll
router.post("/enroll", authMiddleware(["user"]), enrollUser);

/**
 * @swagger
 * /my-enrollments:
 *   get:
 *     summary: Get logged-in user's enrollments
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrollments
 */

// 👤 User only – view enrollments
router.get("/my-enrollments", authMiddleware(["user"]), getMyEnrollments);

module.exports = router;
