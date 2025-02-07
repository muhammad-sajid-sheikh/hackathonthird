import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";


function BeautifulRoom() {
  return (
    <div className="w-full bg-orange-100 md:flex">
      {/* Text Section */}
      <div className=" md:w-[40%] flex justify-center">
        <div className="w-[90%] md:w-[80%] p-6 md:p-9 md:pt-[50%]">
          <h1 className="text-2xl md:text-5xl font-extrabold text-center md:text-left md:pl-5">
            50+ Beautiful Inspiration
          </h1>
          <p className="text-center md:text-left md:text-xl mt-4 md:pl-5">
            Our designers have created numerous beautiful room prototypes to inspire you.
          </p>
          <div className="p-6 md:pt-4 flex justify-center md:justify-start">
           
            <Button className="w-[60%] md:w-[70%] md:h-14 md:text-2xl"> <Link href={"/shop"}>
              Explore More
              </Link></Button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full p-6 md:p-5 flex flex-col md:flex-row md:justify-center md:space-x-32 items-center space-y-6">
        <div className="flex justify-center">
          <Image
            src={"/images/b1.png"}
            alt="Room Inspiration"
            className="w-full max-w-[600px] h-auto" 
            width={200} 
            height={100} 
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={"/images/b2.png"}
            alt="Room Inspiration"
            className="w-full max-w-[400px] h-auto" 
            width={200} 
            height={100}  
          />
        </div>
      </div>
    </div>
  );
}

export default BeautifulRoom;
