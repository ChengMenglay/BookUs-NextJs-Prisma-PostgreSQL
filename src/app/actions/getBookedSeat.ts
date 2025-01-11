import { prisma } from "@/lib/prisma";

export async function getBookedSeat(scheduleId: string) {
  const bookedSeats = await prisma.booking.findMany({
    where: { scheduleId, isPaid: true, status: "Completed" },
  });
  let seatNumbers: string[] = [];
  bookedSeats.map((bookedSeats) =>
    bookedSeats.seatNumber.map((item) => seatNumbers.push(item))
  );
  return seatNumbers;
}
