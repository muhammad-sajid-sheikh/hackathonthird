"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/store/wishstore";
import { FaRegHeart } from "react-icons/fa";

function WishListButton() {
  const items = useSelector((state: RootState) => state.wishlists?.items || []);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs rounded-full">{totalQuantity}</span>
      <FaRegHeart cursor={"pointer"} size={26} />
    </div>
  );
}

export default WishListButton;
