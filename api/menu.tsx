import { API } from "@/app/api";
import { MenuItem } from "@/interfaces/menu.iterface";


export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(API.topPage.find, {
    method: "GET",
    headers: new Headers({'content-type': 'application/json'})
  });
  return res.json();
}