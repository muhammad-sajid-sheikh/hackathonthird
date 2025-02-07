"use client";

import Image from "next/image";
import sanityClient from "@sanity/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from "react-redux"
import { addItem } from "@/store/cartSlice"
import { Button } from "../ui/button";
import { addToWishList, WishItem } from "@/store/wishSlice";
import { FaRegHeart } from "react-icons/fa";


const sanity = sanityClient({
  projectId: "52l1xe6v",
  dataset: "production",
  apiVersion: "2025-01-02",
  useCdn: true,
});

interface Product {
  _id:  string;
  productImage: string;
  title: string;
  category?: string;
  description: string;
  price: number;
  priceline?: string;
  discountPercentage?: number;
  quantity: number;
}

const ShopCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product" && defined(productImage)]{
          _id,
          title,
          description,
          price,
          "productImage": productImage.asset->url,
          discountPercentage
        }
      `;
      const data = await sanity.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const { toast } = useToast()
  const dispatch = useDispatch()

  const addToCartHandler = (product:Product) => {
      toast({
          description: "Item added to cart",
          variant: "default",
      })

      dispatch(addItem(product))
  }


  const addWishListHandler = (product: Product) => {
    const productWithQuantity: WishItem = {
      ...product,
      quantity: 1,  // Adding quantity to match the WishItem type
    };

    toast({
      description: "Item added to wishlist",  // Updated toast message
      variant: "default",
    });

    dispatch(addToWishList(productWithQuantity));  // Dispatching to the wishlist
  };
  


  return (
    <div className="container mx-auto px-4">
     <p className="text-center mx-auto text-lg sm:text-xl md:text-4xl font-bold max-w-[90%] sm:max-w-[75%] md:max-w-[50%] mb-7">
  
</p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
  <div
    key={product._id}
    className="bg-slate-100 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
    onClick={() => router.push(`/productDetails/${product._id}`)}
  >
    <div className="relative aspect-[4/3] w-full">
      {product.discountPercentage && (
        <p className="absolute bg-red-500 rounded-full text-sm px-3 py-1 top-2 right-2 text-white font-semibold">
          {product.discountPercentage}%
        </p>
      )}
      <Image
        src={product.productImage}
        alt={product.title}
        width={400}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
    </div>


    <div className="mt-auto">
    <Button
  onClick={(e) => {
    e.stopPropagation();  // Prevents the parent div's onClick from firing
    addToCartHandler(product);
  }} 
  className="w-full h-14 text-2xl rounded-b-lg"
>
  Add to Cart
</Button>

    </div>
    <div>
    <Button
                onClick={(e) => {
                  e.stopPropagation();  // Prevents the parent div's onClick from firing
                  addWishListHandler(product);
                }}
                className="w-full h-14 text-2xl rounded-b-lg"
              >
                <FaRegHeart className=" text-red-700"/>

              </Button>
    </div>
  </div>
))}

      </div>
      
            
    </div>
  );
};

export default ShopCard;
