const express = require("express");
const router = express.Router();
const {
  getAllGyms,
  createGym,
  getGymById,
  deleteGym,
  updateGym,
} = require("../controllers/gym.controller");
const validate = require("../middleware/validate");

const { getPlansByGym } = require("../controllers/plan.controller");

const {
  createGymSchema,
  updateGymSchema,
} = require("../validations/gym.validation");

const authMiddleware = require("../middleware/auth.middleware");
/**
 * @swagger
 * /gyms:
 *   get:
 *     summary: Get all gyms (with pagination, filtering & search)
 *     tags: [Gyms]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter gyms by city
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search gyms by name or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of gyms per page
 *     responses:
 *       200:
 *         description: List of gyms
 */
// 🌍 Public – list all gyms
router.get("/", getAllGyms);

/**
 * @swagger
 * /gyms/{id}:
 *   get:
 *     summary: Get details of a single gym
 *     tags: [Gyms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gym ID
 *     responses:
 *       200:
 *         description: Gym details fetched successfully
 *       404:
 *         description: Gym not found
 */
// 🌍 Public – get single gym
router.get("/:id", getGymById);

/**
 * @swagger
 * /gyms/{id}/plans:
 *   get:
 *     summary: Get all plans of a gym
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of plans
 */
// 🌍 Public – get plans of a gym
router.get("/:id/plans", getPlansByGym);

/**
 * @swagger
 * /gyms:
 *   post:
 *     summary: Create a new gym (Owner only)
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               description:
 *                 type: string
 *               facilities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Gym created successfully
 */
// 👑 Owner only – create gym
router.post(
  "/",
  authMiddleware(["owner"]),
  validate(createGymSchema),
  createGym
);

/**
 * @swagger
 * /gyms/{id}:
 *   put:
 *     summary: Update gym details (Owner only)
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Gym updated successfully
 */
// 👑 Owner only – update gym
router.put(
  "/:id",
  authMiddleware(["owner"]),
  validate(updateGymSchema),
  updateGym
);

/**
 * @swagger
 * /gyms/{id}:
 *   delete:
 *     summary: Delete a gym (Owner only)
 *     tags: [Gyms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gym deleted successfully
 */
// 👑 Owner only –delete gym
router.delete("/:id", authMiddleware(["owner"]), deleteGym);

module.exports = router;
