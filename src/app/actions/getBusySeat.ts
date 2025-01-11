import { prisma } from "@/lib/prisma";

export const getBusySeat = async (scheduleId: string) => {
  const busyBooking = await prisma.booking.findMany({
    where: { scheduleId, isPaid: false, status: "Pending" },
  });
  let seatNumbers: string[] = [];
  busyBooking.map((busyBooking) =>
    busyBooking.seatNumber.map((item) => seatNumbers.push(item))
  );
  return seatNumbers;
};
