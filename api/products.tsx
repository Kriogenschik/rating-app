import { API } from "@/app/api";
import { ProductModel } from "@/interfaces/product.interface";


export async function getProduct(category: string): Promise<ProductModel[] | null> {
  const res = await fetch(API.product.find + "?categories_like=" + category, {
    method: "GET",
    headers: new Headers({'content-type': 'application/json'})
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}