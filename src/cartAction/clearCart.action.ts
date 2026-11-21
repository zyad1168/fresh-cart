
import { getMyToken } from "@/utilities/getMyToken";

export async function clearCart() {

    const token = await getMyToken();

    if (!token) {
      throw new Error("You should be logged in first");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart`,
      {
        method: "delete",
        headers: {
          token,
         
        }
      },
    );

    

    const payload = await res.json();
    return payload;
    
  }


// https://ecommerce.routemisr.com/api/v2/cart