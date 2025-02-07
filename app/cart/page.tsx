"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addItem, CartItem, removeItem } from "@/store/cartSlice";
import { FaPlus, FaTrashAlt } from "react-icons/fa"; // Importing Font Awesome icons

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = (+totalPrice * 0.15).toFixed(2);
  const totalPriceWithVat = (+totalPrice + +vat).toFixed(2);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? '' : 'Name is required.',
      phone: formData.phone ? '' : 'Phone number is required',
      email: formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ? '' : 'Invalid email.',
      address: formData.address ? '' : 'Address is required.'
    };
    setErrors(newErrors);

    return !newErrors.name && !newErrors.phone && !newErrors.email && !newErrors.address;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const orderData = {
        ...formData,
        items: items.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
        totalPrice,
        vat,
        totalPriceWithVat,
      };

      try {
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();
        
        if (response.ok) {
          alert('Order placed successfully!');
        } else {
          alert('Failed to place order: ' + result.message);
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const additemHandler = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const removeitemHandler = (id: string) => {
    dispatch(removeItem({ id }));
  };

  return (
    <div className="mt-8 min-h-[60vh]">
      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image src="/images/cart.png" alt="empty_cart" width={400} height={400} className="object-cover mx-auto" />
          <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
          <Link href="/">
            <Button className="mt-4">Shop Now</Button>
          </Link>
        </div>
      )}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-12">
          <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4 sm:col-span-2">
            <h1 className="p-4 text-xl sm:text-2xl md:text-3xl font-bold text-white bg-blue-700">
              Your Cart ({totalQuantity} Items)
            </h1>
            {items.map((item) => (
              <div key={item._id} className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-700 items-center space-x-4 sm:space-x-6">
                <Image src={item.productImage} alt={item.title} width={180} height={180} />
                <div className="flex-1">
                  <h1 className="md:text-xl text-base font-bold text-black">{item.title}</h1>
                  <h1 className="md:text-lg text-sm font-semibold">Category : {item.category}</h1>
                  <h1 className="md:text-2xl text-lg font-bold text-blue-950">${item.price}</h1>
                  <h1 className="md:text-lg text-sm font-semibold">Quantity : {item.quantity}</h1>
                  <div className="flex items-center mt-4 space-x-2">
                    {/* Show the "Add More" button with icon on mobile */}
                    <Button onClick={() => additemHandler(item)} className="w-full sm:w-auto">
                      <FaPlus className="sm:hidden" /> {/* Icon visible on mobile */}
                      <span className="hidden sm:inline">Add More</span> {/* Text hidden on mobile */}
                    </Button>
                    {/* Show the "Remove" button with icon on mobile */}
                    <Button onClick={() => removeitemHandler(item._id)} variant="destructive" className="w-full sm:w-auto">
                      <FaTrashAlt className="sm:hidden" /> {/* Icon visible on mobile */}
                      <span className="hidden sm:inline">Remove</span> {/* Text hidden on mobile */}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-950 p-3 rounded-lg sm:col-span-2 xl:col-span-2">
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
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <input type="text" name="name" placeholder="Name" className="w-full mb-4 p-2" onChange={handleChange} />
                {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
              </div>
              <div className="mt-4">
                <input type="text" name="phone" placeholder="Phone" className="w-full mb-4 p-2" onChange={handleChange} />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
              </div>
              <div className="mt-4">
                <input type="email" name="email" placeholder="Email" className="w-full mb-4 p-2" onChange={handleChange} />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
              <div className="mt-4">
                <input type="text" name="address" placeholder="Address" className="w-full mb-4 p-2" onChange={handleChange} />
                {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
              </div>

              <Button className="w-full bg-orange-500 mb-2" type="submit">Order Now</Button>
              <Link href={`/payment?amount=${totalPriceWithVat}`}><Button className="w-full bg-orange-500">Payment</Button></Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
