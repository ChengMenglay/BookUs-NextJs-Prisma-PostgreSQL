import PopularPlace from "@/components/PopularPlace";
import SearchDestination from "@/components/SearchDestination";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
export default async function Home() {
  const province = await prisma.province.findMany();
  const route = await prisma.route.findMany({ where: { type: "Popular" } });
  return (
    <div className="py-2">
      <div className="w-full h-[400px] bg-blue-700 flex flex-col justify-center items-center space-y-8 px-4">
        <h1 className="text-4xl font-bold text-white">
          Find Your Next Destination
        </h1>
        <SearchDestination province={province} />
      </div>
      <div className="bg-[#e5e1e1] py-8">
        <div className="container mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Popular Destination</h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-2">
            {route.map((item) => (
              <PopularPlace key={item.id} route={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[250px] bg-blue-700 px-8 flex sm:flex-row flex-col sm:justify-around justify-center sm:space-y-0 space-y-4 items-center">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-start text-center">
            Air Bus Express
          </h1>
          <p className="text-white">
            Book bus around the provinces in Cambodia.
          </p>
        </div>
        <Button variant={"destructive"}>Book Now</Button>
      </div>
    </div>
  );
}
