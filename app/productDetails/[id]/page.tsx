"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import sanityClient from "@sanity/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";

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
  category?: string;
  description: string;
  price: number;
  discountPercentage?: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const {id} = useParams()

  const dispatch = useDispatch();
  const { toast } = useToast();

  const fetchProduct = async (id: string) => {
    try {
      const query = `
        *[_type == "product" && _id == "${id}"][0]{
          _id,
          title,
          description,
          price,
          "productImage": productImage.asset->url,
          discountPercentage
        }
      `;
      const data = await sanity.fetch(query);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addItem(product));
      toast({
        description: "Item added to cart",
        variant: "default",
      });
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={product.productImage}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-4 text-lg">{product.description}</p>
          <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
          {product.discountPercentage && (
            <p className="text-red-500 text-lg mt-2">
              {product.discountPercentage}% OFF
            </p>
          )}
          <Button
            onClick={addToCartHandler}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
