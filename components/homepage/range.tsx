import { rangeData } from "@/data/data"
import Image from "next/image"

function Range(){
    return(
        <div>
            <div className="w-full flex flex-col items-center pt-10 space-y-3">
                <h1 className="text-xl md:text-4xl font-bold text-center">Browse The Range</h1>
                <div className="w-[85%]">
                <p className="text-gray-500 text-center md:text-2xl">Step into a world of endless possibilities with our exclusive collection! Whether you’re looking for timeless classics or modern trends, our range has been designed to cater to every taste and need.</p>
                </div>
            </div>
            <div>
            <div className="pt-16 pb-16">
                    <div className="w-[80%] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
                    {rangeData.map((range) =>{
                    return(
                    <div key={range.id} className="bg-white p-6 rounded-sm">
                        
                        <Image src={range.image} alt="range" width={310} height={210} className="w-full"/>
                        <h1 className="text-xl font-bold pt-4 text-center">{range.tille}</h1>   
                    </div>
                )
            })}
        </div>
        </div>
            </div>
        </div>
    )
}
export default Range