'use client'
import { usePathname } from "next/navigation";


export const menuRouter = () => {
  const pathname = usePathname();
  return pathname;
}