import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { TopPageModel } from "@/interfaces/page.interface";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products Page",
};

export async function generateStaticParams() {
  const menu = await getMenu();
  return menu.flatMap(item => item.pages.map(page => ({alias: page.alias})))
}

export default async function getCurrentPage( alias: string): Promise<TopPageModel | null> {
  const menu = await getMenu();
  const test =  menu.flatMap(item => item.pages.map(page => ({alias: page.alias})))
  const page = await getPage(alias);
  // return <div>Product {params.alias} {test.map(t => (
  //   <p>{t.alias}</p>
  // ))}</div>;
  return page;
}
