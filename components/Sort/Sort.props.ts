import { ProductModel } from "@/interfaces/product.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: ProductModel[];
}

export enum SortEnum {
  Rating,
  Price,
}
