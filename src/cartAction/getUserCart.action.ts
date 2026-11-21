"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function getUserCart() {
  const token = await getMyToken();
  if (!token) throw new Error("you should logged in first");

  const res = await fetch(`${process.env.APIV2}/cart`, {
    

    headers: {
      token,
      
    },
  
  });
  const payload = await res.json();
  return payload;

}
