import { prisma } from "@/lib/prisma";
import { parse } from "date-fns";
import BookingDetail from "./components/BookingDetail";
import { getCurrentUser, getUserId } from "@/app/(auth)/actions/authAction";
import { getBookedSeat } from "@/app/actions/getBookedSeat";
import { getBusySeat } from "@/app/actions/getBusySeat";

type BookingDetailProps = {
  params: {
    origin: string;
    destination: string;
    departure_date: string;
    scheduleId: string;
  };
};
export default async function BookingPage({ params }: BookingDetailProps) {
  const userId = await getUserId();
  const bookingSchedule = await prisma.schedule.findUnique({
    where: { id: params?.scheduleId },
    include: { bus: { include: { operator: true, type: true } }, route: true },
  });
  const splitParamOrigin = params.origin.split("-").join(" ");
  const splitParamDestination = params.destination.split("-").join(" ");
  const splitFormatParamDepartureDate = parse(
    params.departure_date,
    "dd-MM-yyyy",
    new Date()
  );
  if (!bookingSchedule) {
    return (
      <div className="max-w-6xl pt-20 mx-auto space-y-2 px-4">
        <h1 className="text-2xl">Booking not found</h1>
      </div>
    );
  }
  const transformData = {
    ...bookingSchedule,
    id: bookingSchedule.id, // Ensure id is defined
    departure_date: splitFormatParamDepartureDate,
    price: bookingSchedule.price?.toNumber(), // Safely handle undefined price
  };
  const bookedseats = await getBookedSeat(params.scheduleId);
  const busyseats = await getBusySeat(params.scheduleId);

  if (!userId) {
    return null;
  }
  const users = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <div className=" max-w-6xl pt-20 mx-auto space-y-2 px-4">
      <BookingDetail
        busySeat={busyseats}
        bookedSeat={bookedseats}
        schedule={transformData}
        origin={splitParamOrigin}
        destination={splitParamDestination}
        users={users}
      />
    </div>
  );
}
