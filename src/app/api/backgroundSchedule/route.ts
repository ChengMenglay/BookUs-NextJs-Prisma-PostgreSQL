import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export async function GET() {
  try {
    const currentDate = dayjs().toDate();
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
    const newSchedules = archivedSchedules.map(({ ...schedule }) => ({
      ...schedule,
      departure_date: null, // Update with a valid default if required
      status: "Active",
    }));

    // Batch create new schedules
    if (newSchedules.length > 0) {
      newSchedules.map((schedule) =>
        prisma.schedule.create({
          data: {
            busId: schedule.busId,
            routeId: schedule.routeId,
            departure_date: null,
            departure_time: schedule.departure_time,
            arrival_time: schedule.arrival_time,
            boarding_point: schedule.boarding_point,
            boarding_url: schedule.boarding_url,
            dropping_point: schedule.dropping_point,
            dropping_url: schedule.dropping_url,
            price: schedule.price,
            available_seat: schedule.available_seat,
          },
        })
      );
    }

    console.log(`Archived and created ${newSchedules.length} new schedules.`);
  } catch (error) {
    console.error("Error during the cron job:", error);
  }
}
