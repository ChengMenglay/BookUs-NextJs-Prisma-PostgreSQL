import { prisma } from "@/lib/prisma";
import dayjs from "dayjs"; // Using dayjs to ensure consistency with time zones
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentDate = dayjs().toDate(); // Use dayjs to get current date, ensuring consistent handling

    // Archive outdated schedules with booked seats
    await prisma.schedule.updateMany({
      where: {
        departure_date: { lt: currentDate },
        status: "Active",
      },
      data: {
        status: "Archived",
        updatedAt: currentDate, // Ensure the `updatedAt` field is set explicitly
      },
    });

    // Find schedules that were just updated to "Archived"
    const justArchivedSchedules = await prisma.schedule.findMany({
      where: {
        departure_date: { lt: currentDate },
        status: "Archived",
        updatedAt: { gte: currentDate }, // Only fetch records updated in the last run
      },
      include: { bus: true }, // Fetch bus details as well if needed
    });

    if (justArchivedSchedules.length === 0) {
      return new NextResponse("No schedules were updated.", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prepare new schedules data by copying the archived schedules
    const newSchedules = justArchivedSchedules.map((schedule) => ({
      ...schedule,
      id: undefined, // Let Prisma auto-generate the new ID
      departure_date: null, // Set a default value if needed
      status: "Active", // Reset status to "Active"
      updatedAt: undefined, // Remove updatedAt to let Prisma auto-set it on creation
    }));

    // Create new schedules based on the archived ones
    await prisma.schedule.createMany({ data: newSchedules });

    return new NextResponse(
      `Archived and created ${newSchedules.length} new schedules.`,
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during the cron job:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
