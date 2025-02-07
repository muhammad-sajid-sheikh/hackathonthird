import Image from "next/image";

function Furniture() {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="text-center mb-10 mt-8">
        <h1 className="text-xl text-gray-500 font-bold">Share your setup with</h1>
        <h1 className="text-5xl font-bold text-black">#FuniroFuture</h1>
      </div>

      {/* Responsive Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Image
          src={"/images/f5.png"}
          alt="Bedroom"
          width={100}
          height={20}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f2.png"}
          alt="Furniture"
          width={200}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f3.png"}
          alt="Bedroom"
          width={400}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f4.png"}
          alt="Bedroom"
          width={100}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f5.png"}
          alt="Bedroom"
          width={250}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f6.png"}
          alt="Bedroom"
          width={150}
          height={200}
          className="w-full h-auto object-cover"
        />
        <Image
          src={"/images/f7.png"}
          alt="Furniture"
          width={250}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f8.png"}
          alt="Bedroom"
          width={200}
          height={200}
          className="w-full h-auto object-cover "
        />
        <Image
          src={"/images/f9.png"}
          alt="Furniture"
          width={100}
          height={200}
          className="w-full h-auto object-cover "
        />
      </div>
    </div>
  );
}

export default Furniture;
