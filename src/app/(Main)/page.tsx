import PopularPlace from "@/components/PopularPlace";
import ScrollButton from "@/components/ScrollButton";
import SearchDestination from "@/components/SearchDestination";
import { prisma } from "@/lib/prisma";
export default async function Home() {
  const province = await prisma.province.findMany();
  const route = await prisma.route.findMany({ where: { type: "Popular" } });
  return (
    <div className="pt-2">
      <div id="search-destination"></div>
      <div className="w-full h-[400px] bg-blue-700 flex flex-col justify-center items-center space-y-8 px-4 mt-14">
        <h1 className="text-4xl font-bold text-white">
          Find Your Next Destination
        </h1>
        <SearchDestination province={province} />
      </div>
      <div className="bg-[#e5e1e1] py-10 px-2">
        <div className="container mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Popular Destination</h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {route.map((item) => (
              <PopularPlace key={`${item.origin}-${item.id}`} route={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 py-20">
        <div className="container mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Why Choose Us?</h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <div className="h-[230px] flex flex-col justify-center items-center bg-[#1179B1] px-4">
              <h1 className=" text-4xl font-bold text-white">
                Customer Support
              </h1>
              <p className="text-white text-center">
                24/7 assistance for all your travel needs.
              </p>
            </div>
            <div className="h-[230px] flex flex-col justify-center items-center bg-[#53B5E2] px-4">
              <h1 className=" text-4xl font-bold text-white">Convenience</h1>
              <p className="text-white  text-center">
                Easy booking process with user-friendly navigation.
              </p>
            </div>
            <div className="h-[230px] flex flex-col justify-center items-center bg-[#1179B1] px-4">
              <h1 className=" text-4xl font-bold text-white">Wide Coverage</h1>
              <p className="text-white  text-center">
                Book buses and travel across Cambodia, Thailand, Vietnam, and
                Laos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[250px] bg-blue-700 pt-8 flex sm:flex-row flex-col sm:justify-around justify-center sm:space-y-0 space-y-4 items-center ">
        <div className=" space-y-2">
          <h1 className="text-3xl font-bold text-white sm:text-start text-center">
            Air Bus Express
          </h1>
          <p className="text-white text-center">
            Book bus around the provinces in Cambodia.
          </p>
        </div>
        <ScrollButton targetId="search-destination" />
      </div>
    </div>
  );
}
