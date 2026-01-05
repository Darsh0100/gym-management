const express = require("express");
const router = express.Router();

const {
  createPayment,
  confirmPayment,
} = require("../controllers/payment.controller");

const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * /payments/create:
 *   post:
 *     summary: Create a payment for a gym plan (Mock Payment)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *                 example: 69593cafe5a4ab4eba15ee68
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 status:
 *                   type: string
 *       404:
 *         description: Plan not found
 */
router.post("/create", authMiddleware(["user"]), createPayment);

/**
 * @swagger
 * /payments/confirm:
 *   post:
 *     summary: Confirm payment and activate enrollment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentId
 *             properties:
 *               paymentId:
 *                 type: string
 *                 example: 695a1234e5a4ab4eba15ee99
 *     responses:
 *       200:
 *         description: Payment successful and enrollment created
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Payment not found
 */
router.post("/confirm", authMiddleware(["user"]), confirmPayment);

module.exports = router;
