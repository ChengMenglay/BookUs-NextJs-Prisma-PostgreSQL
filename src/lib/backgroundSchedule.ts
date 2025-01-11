import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

cron.schedule(
  "25 0 * * *",
  async () => {
    try {
      const currentDate = dayjs().format("YYYY-MM-DD");

      // Archive outdated schedules with booked seats
      await prisma.schedule.updateMany({
        where: {
          departure_date: { lt: currentDate },
          status: "Active",
        },
        data: { status: "Archived" },
      });

      // Retrieve archived schedules
      const archivedSchedules = await prisma.schedule.findMany({
        where: {
          departure_date: { lt: currentDate },
          status: "Archived",
        },
      });

      // Prepare new schedules without IDs and with updated data
      const newSchedules = archivedSchedules.map(
        ({ id, departure_date, ...schedule }) => ({
          ...schedule,
          departure_date: null, // Update with a valid default if required
          status: "Active",
        })
      );

      // Batch create new schedules
      if (newSchedules.length > 0) {
        await prisma.schedule.createMany({
          data: newSchedules,
        });
      }

      console.log(`Archived and created ${newSchedules.length} new schedules.`);
    } catch (error) {
      console.error("Error during the cron job:", error);
    }
  },
  {
    timezone: "Asia/Phnom_Penh", // Set your desired timezone here
  }
);
