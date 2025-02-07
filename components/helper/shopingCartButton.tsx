"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CartSidebar from "./cartSideBar";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function ShoppingCartButton() {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center text-xs rounded-full">
            {totalQuantity}
          </span>
          <HiOutlineShoppingCart cursor="pointer" size={26} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto h-full">
        {/* Accessibility ke liye title zaroori hai */}
        <VisuallyHidden>
          <SheetTitle>Shopping Cart</SheetTitle>
        </VisuallyHidden>
        {/* cartSideBar */}
        <CartSidebar items={items} />
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCartButton;
