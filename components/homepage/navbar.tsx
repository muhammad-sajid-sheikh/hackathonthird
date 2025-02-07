"use client";

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import useInvalidPaths from "@/lib/use-invalid-path";
import ShoppingCartButton from "../helper/shopingCartButton";
import sanityClient from "@sanity/client";
import Image from "next/image";
import WishListButton from "../helper/wishListButton";

const client = sanityClient({
    projectId: "52l1xe6v",
    dataset: "production",
    apiVersion: "2025-01-02",
    useCdn: true,
  });
  
  interface Product {
    _id: string;
    productImage: string;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
  }
  
function NavBar() {
  const invalidPath: boolean = useInvalidPaths();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          title,
          description,
          price,
          "productImage": productImage.asset->url,
          discountPercentage
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product: Product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  if (invalidPath) return <></>;

  return (
    <div className="flex w-full h-[100px] justify-center bg-slate-100 sticky top-0 z-50 shadow-md">
      <div className="flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-10">
        <div className="flex text-2xl sm:text-5xl font-bold">
          <Image src="/images/logoimage.png" alt="logo" width={40} height={10} />Furniro
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex">
          <ul className="flex space-x-8">
            <Link href="/home"><li className="text-lg font-semibold cursor-pointer hover:text-blue-500">Home</li></Link>
            <Link href="/shop"><li className="text-lg font-semibold cursor-pointer hover:text-blue-500">Shop</li></Link>
            <Link href="/blog"><li className="text-lg font-semibold cursor-pointer hover:text-blue-500">Blog</li></Link>
            <Link href="/contact"><li className="text-lg font-semibold cursor-pointer hover:text-blue-500">Contact</li></Link>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {menuOpen ? (
            <IoMdClose size={28} onClick={() => setMenuOpen(false)} className="cursor-pointer" />
          ) : (
            <IoMdMenu size={28} onClick={() => setMenuOpen(true)} className="cursor-pointer" />
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 relative">
          
          <CiSearch size={24} cursor="pointer" className="hover:text-blue-500" onClick={() => setShowSearch(!showSearch)} />
          <Link href="/wishlist"><WishListButton /></Link>
          <ShoppingCartButton />
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg p-5 flex flex-col items-center space-y-4">
          <Link href="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}

      {/* Search Input Box */}
      {showSearch && (
        <div className="absolute top-20 right-0 bg-white border p-4 rounded-lg shadow-md w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {filteredProducts.length > 0 ? (
            <ul className="mt-2">
              {filteredProducts.map((product: Product) => (
                <li key={product._id} className="p-2 border-b hover:bg-gray-100">
                  <Link href={`/productDetails/${product._id}`}>
                    <div className="flex items-center gap-3">
                      <Image src={product.productImage} alt={product.title} width={300} height={300} className="w-10 h-10 rounded-md" />
                      <span>{product.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchQuery && (
            <p className="mt-2 text-gray-500">No products found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
