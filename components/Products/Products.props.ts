import { ProductModel } from "@/interfaces/product.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // sort: SortEnum;
  // setSort: (sort: SortEnum) => void
  products: ProductModel[];
}

export enum SortEnum {
  Rating,
  Price,
}
