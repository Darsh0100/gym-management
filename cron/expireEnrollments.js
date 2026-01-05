const cron = require("node-cron");
const Enrollment = require("../models/Enrollment");

// Runs every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  try {
    const result = await Enrollment.updateMany(
      {
        status: "active",
        endDate: { $lt: new Date() },
      },
      {
        $set: { status: "expired" },
      }
    );

    console.log(`[CRON] Expired enrollments updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("[CRON] Error expiring enrollments:", error.message);
  }
});
