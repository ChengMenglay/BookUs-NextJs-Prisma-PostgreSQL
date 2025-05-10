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
    const justArchivedSchedules = await prisma.schedule.findMany({
      where: {
        departure_date: { lt: currentDate },
        status: "Archived",
        updatedAt: { gte: dayjs().subtract(1, "minute").toDate() }, // Only fetch records updated in the last run
        bus: { isNot: undefined }, // Change to check if relation exists
        route: { isNot: undefined }, // Change to check if relation exists
      },
      include: { bus: true },
    });

    if (justArchivedSchedules.length === 0) {
      return new NextResponse("No schedules were updated.", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prepare new schedules data by copying the archived schedules
    const newSchedules = justArchivedSchedules.map((schedule) => {
      const baseSchedule = {
        ...schedule,
        id: undefined,
        status: "Active",
        updatedAt: undefined,
      };
      if (schedule.frequency === "daily") {
        return {
          ...baseSchedule,
          departure_date: null,
        };
      }
      return {
        ...baseSchedule,
        departure_date: dayjs().add(1, "day").toDate(),
      };
    });

    // Create new schedules based on the archived ones
    try {
      await prisma.schedule.createMany({ data: newSchedules });
    } catch (error) {
      console.error("Error creating new schedules:", error);
      await prisma.schedule.updateMany({
        where: {
          id: { in: justArchivedSchedules.map((s) => s.id) },
        },
        data: {
          status: "Active",
          updatedAt: currentDate,
        },
      });
      throw error;
    }
    const result = {
      achivedCount: justArchivedSchedules.length,
      createdCount: newSchedules.length,
      timestamp: currentDate,
      success: true,
    };
    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during the cron job:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
