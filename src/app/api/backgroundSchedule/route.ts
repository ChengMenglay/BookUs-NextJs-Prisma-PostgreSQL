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

    // Prepare new schedules
    const newSchedules = archivedSchedules.map(({ ...schedule }) => ({
      busId: schedule.busId,
      routeId: schedule.routeId,
      departure_date: null, // Update with a valid default if required
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      boarding_point: schedule.boarding_point,
      boarding_url: schedule.boarding_url,
      dropping_point: schedule.dropping_point,
      dropping_url: schedule.dropping_url,
      price: schedule.price,
      available_seat: schedule.available_seat,
      status: "Active",
    }));

    // Batch create new schedules
    if (newSchedules.length > 0) {
      await Promise.all(
        newSchedules.map((schedule) =>
          prisma.schedule.create({ data: schedule })
        )
      );
    }

    return new Response(
      JSON.stringify({
        message: `Archived and created ${newSchedules.length} new schedules.`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during the cron job:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
