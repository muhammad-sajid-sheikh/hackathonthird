"use client";



import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/wishstore";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { addToWishList, removeWishList, WishItem } from "@/store/wishSlice";
import { useToast } from "@/hooks/use-toast";

function WishListPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const items = useSelector((state: RootState) => state.wishlists?.items || []);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const vat = (+totalPrice * 0.15).toFixed(2);
  const totalPriceWithVat = (+totalPrice + +vat).toFixed(2);

  const addWishListHandler = (item: WishItem) => {
    dispatch(addToWishList(item));
    toast({
      description: "Item added to wishlist",
      variant: "default",
    });
  };

  const removeWishListHandler = (id: string) => {
    dispatch(removeWishList({ id }));
    toast({
      description: "Item removed from wishlist",
      variant: "destructive",
    });
  };

  return (
    <div className="mt-8 min-h-[60vh]">
      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image src="/images/cart.png" alt="empty_cart" width={400} height={400} className="object-cover mx-auto" />
          <h1 className="mt-8 text-2xl font-semibold">Your Wish List is empty</h1>
        </div>
      )}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12 ">
          <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4">
            <h1 className="p-4 text-xl sm:text-2xl md:text-3xl font-bold text-white bg-blue-700">
              Your Wish List ({totalQuantity} Items)
            </h1>
            {items.map((item) => (
              <div key={item._id} className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-700 items-center space-x-10">
                <Image src={item.productImage} alt={item.title} width={180} height={180} />
                <div>
                  <h1 className="md:text-xl text-base font-bold text-black">{item.title}</h1>
                  <h1 className="md:text-lg text-sm font-semibold">Category : {item.category}</h1>
                  <h1 className="md:text-2xl text-lg font-bold text-blue-950">${item.price}</h1>
                  <h1 className="md:text-lg text-sm font-semibold">Quantity : {item.quantity}</h1>
                  <div className="flex items-center mt-4 space-x-2">
                    <Button onClick={() => addWishListHandler(item)}>Add More</Button>
                    <Button onClick={() => removeWishListHandler(item._id)} variant="destructive">Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-950 p-3 rounded-lg">
            <h1 className="text-center mt-2 mb-8 text-white text-3xl font-semibold">Summary</h1>
            <div className="flex flex-col text-white text-lg font-semibold">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-[1.2px] bg-white bg-opacity-20 my-4"></div>
            <div className="flex text-xl uppercase font-semibold text-white items-center justify-between">
              <span>Sub Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex mt-4 text-xl uppercase font-semibold text-white items-center justify-between">
              <span>VAT</span>
              <span>${vat}</span>
            </div>
            <div className="flex mt-4 text-xl uppercase font-semibold text-white items-center justify-between">
              <span>Total</span>
              <span>${totalPriceWithVat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishListPage;

