require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.set("trust proxy", 1);

// middleware
app.use(express.json());
const cors = require("cors");
const allowedOrigins = ["http://localhost:5173"];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// connect database
console.log("Connect to Mongo:", process.env.MONGO_URI);
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 CLIENT_URL is set to: ${process.env.CLIENT_URL || "NOT SET (Using default localhost)"}`);
});
