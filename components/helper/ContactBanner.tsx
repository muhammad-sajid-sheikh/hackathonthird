import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const ContactBanner = () => {
  return (
    <div className="relative w-full h-[316px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/shopbanner.png"  
          alt="Shop Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white">
        <div className="text-yellow-500 text-3xl font-bold">
             <Image
                      src={"/images/logoimage.png"}
                      alt="logo"
                      width={40}
                      height={10}
                    />
        </div>
        <h1 className="text-4xl text-black font-extrabold">Contact</h1>
        <p className="flex text-sm mt-2">
          <span className="text-black">Home</span> <IoIosArrowForward className="flex text-black items-center justify-center"/>
          <span className="text-gray-700">Contact</span>
        </p>
      </div>
    </div>
  );
};

export default ContactBanner;
