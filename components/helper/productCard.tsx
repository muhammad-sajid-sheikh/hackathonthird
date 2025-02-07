"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Button } from "../ui/button";
import sanityClient from "@sanity/client";

const sanity = sanityClient({
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

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const query = `
        *[_type == "product"]{
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
      setVisibleProducts(data.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = (product: Product) => {
    toast({ description: "Item added to cart", variant: "default" });
    dispatch(addItem(product));
  };

  const handleShowMore = () => {
    if (showAll) {
      setVisibleProducts(products.slice(0, 8));
    } else {
      setVisibleProducts(products);
    }
    setShowAll(!showAll);
  };

  return (
    <div className="container mx-auto px-4">
      <p className="text-center mx-auto text-lg sm:text-xl md:text-4xl font-bold max-w-[90%] sm:max-w-[75%] md:max-w-[50%] mb-7">
        Our Products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
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
                  e.stopPropagation();
                  addToCartHandler(product);
                }}
                className="w-full h-14 text-2xl rounded-b-lg"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={handleShowMore} className="px-6 py-3 text-lg font-semibold">
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
