const express = require("express");
const router = express.Router();
const {
  createPlan,
  updatePlan,
  deletePlan,
  getPlanById,
} = require("../controllers/plan.controller");
const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate");

const {
  createPlanSchema,
  updatePlanSchema,
} = require("../validations/plan.validation");

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a plan for a gym (Owner only)
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gymId
 *               - name
 *               - price
 *               - duration
 *             properties:
 *               gymId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               benefits:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Plan created successfully
 */
// 👑 Owner only – create plan
router.post(
  "/",
  authMiddleware(["owner"]),
  validate(createPlanSchema),
  validate(createPlanSchema),
  createPlan
);

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get a single plan
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan details
 */
// 🌍 Public – get single plan
router.get("/:id", getPlanById);

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Update a plan (Owner only)
 *     tags: [Plans]
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
 *         description: Plan updated successfully
 */
// 👑 Owner only – update plan
router.put(
  "/:id",
  authMiddleware(["owner"]),
  validate(updatePlanSchema),
  updatePlan
);

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Delete a plan (Owner only)
 *     tags: [Plans]
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
 *         description: Plan deleted successfully
 */
// 👑 Owner only – delete plan
router.delete("/:id", authMiddleware(["owner"]), deletePlan);

module.exports = router;
