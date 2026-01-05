require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// middleware
app.use(express.json());

// connect database
connectDB();

// start cron jobs
require("./cron/expireEnrollments");

// passport config
require("./config/passport");
app.use(passport.initialize());

// ✅ SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const gymRoutes = require("./routes/gym.routes");
app.use("/gyms", gymRoutes);

const planRoutes = require("./routes/plan.routes");
app.use("/plans", planRoutes);

const enrollmentRoutes = require("./routes/enrollment.routes");
app.use("/", enrollmentRoutes);

const paymentRoutes = require("./routes/payment.routes");
app.use("/payments", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
