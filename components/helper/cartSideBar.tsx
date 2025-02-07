import { CartItem, addItem, removeItem } from "@/store/cartSlice";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
  items: CartItem[];
};

const CartSidebar = ({ items }: Props) => {
  const dispatch = useDispatch();

  const addCartHandler = (item: CartItem) => dispatch(addItem(item));
  const removeCartHandler = (id: string) => dispatch(removeItem({ id }));

  return (
    <div className="mt-6 h-full mb-6 px-4 sm:px-6">
      {/* Heading */}
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>

      {/* If cart is empty */}
      {items.length === 0 && (
        <div className="flex items-center w-full h-[60vh] sm:h-[80vh] flex-col justify-center text-center">
          <Image
            src="/images/cart.png"
            alt="empty_cart"
            width={200}
            height={200}
            className="object-cover mx-auto max-w-full"
          />
          <h1 className="mt-8 text-2xl font-semibold">Your cart is empty</h1>
        </div>
      )}

      {/* If cart has items */}
      {items.length > 0 && (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="pb-4 border-b border-gray-300 border-opacity-60 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {/* Cart item image */}
              <div className="flex-shrink-0">
                <Image
                  src={item.productImage}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="object-cover max-w-full rounded-md"
                />
              </div>

              <div className="flex-1">
                {/* Title */}
                <h1 className="text-sm font-semibold truncate">{item.title}</h1>
                {/* Price */}
                <h1 className="text-base text-blue-950 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </h1>
                {/* Quantity */}
                <h1 className="text-base font-bold mb-2">
                  Quantity: {item.quantity}
                </h1>
                {/* Add and Remove buttons */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Button
                    onClick={() => removeCartHandler(item._id)}
                    size={"sm"}
                    variant={"destructive"}
                    className="text-xs sm:text-sm"
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => addCartHandler(item)}
                    size={"sm"}
                    className="text-xs sm:text-sm"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Fixed: Nested button issue in Link */}
          <SheetClose asChild>
            <Link href="/cart">
              <Button className="w-full mb-6 mt-6 sm:text-lg">
                View All Cart
              </Button>
            </Link>
          </SheetClose>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
