import { FaTrophy, FaShieldAlt, FaShippingFast, FaHeadset } from "react-icons/fa";

const FeatureHighlights = () => {
  const features = [
    { icon: <FaTrophy className="text-2xl" />, title: "High Quality", description: "Crafted from top materials" },
    { icon: <FaShieldAlt className="text-2xl" />, title: "Warranty Protection", description: "Over 2 years" },
    { icon: <FaShippingFast className="text-2xl" />, title: "Free Shipping", description: "Order over 150$" },
    { icon: <FaHeadset className="text-2xl" />, title: "24 / 7 Support", description: "Dedicated support" },
  ];

  return (
    <div className="bg-[#FAF3EA] py-6 px-4 mt-6 md:px-8 lg:px-12 border rounded-lg">
      <div className="flex flex-wrap justify-between items-center gap-4 text-center md:text-left">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 md:space-x-4">
            {feature.icon}
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
