import { FaRegAddressBook } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";




function Contact(){
    return(
        <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Get In Touch With Us</h2>
        <p className="text-center text-gray-500 max-w-lg mx-auto mb-10">
          For More Information About Our Product & Services. Please Feel Free To Drop Us 
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
  
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <span className="text-2xl"><FaRegAddressBook />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-500">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <span className="text-2xl"><FaPhoneAlt />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-500">
                  Mobile: +(84) 546-6789 <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <span className="text-2xl"><MdOutlineAccessTime />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Working Time</h3>
                <p className="text-gray-500">
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>
  
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Your name</label>
              <input
                type="text"
                placeholder="Abc"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-gray-300"
              />
            </div>
  
            <div>
              <label className="block font-medium mb-1">Email address</label>
              <input
                type="email"
                placeholder="Abc@def.com"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-gray-300"
              />
            </div>
  
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="This is an optional"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-gray-300"
              />
            </div>
  
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                placeholder="Hi! I’d like to ask about"
                className="w-full border rounded-lg p-3 h-28 focus:ring focus:ring-gray-300"
              />
            </div>
  
            <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700">
              Submit
            </button>
          </div>
         
        </div>
      </div>
    )
}
export default Contact