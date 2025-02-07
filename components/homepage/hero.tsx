import { Button } from "../ui/button";

function Hero() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center md:bg-right flex items-center justify-end px-4 md:px-20"
      style={{ backgroundImage: "url('/images/image1.png')" }}
    >
      <div className="bg-orange-100 p-8 md:p-16 rounded-lg shadow-lg max-w-lg md:max-w-2xl lg:max-w-3xl">
        <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">
          New Arrival
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[#B88E2F] leading-tight mt-2">
          Discover Our <br /> New Collection
        </h1>
        <p className="text-gray-600 mt-4 md:text-lg">
          Discover the perfect blend of style and functionality with our New Collection! 
          From timeless designs to modern innovations, we’ve curated pieces that bring elegance 
          and comfort to your space.
        </p>
        <div className="mt-6">
          <Button className="bg-[#B88E2F] text-white py-3 px-8 text-lg md:text-2xl rounded-lg font-semibold shadow-md hover:bg-orange-400 transition">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
