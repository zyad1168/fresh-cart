"use client";
import { getUserCart } from "@/cartAction/getUserCart.action";
import { useSession } from "next-auth/react";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartProduct {
  count: number;
  // [key: string]: any;
}

interface CartResponse {
  data: {
    products: CartProduct[];
  };
}

export interface CartContextType {
  cartCountItems: number;
  setCartCountItems: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  const [cartCountItems, setCartCountItems] = useState<number>(0);

  async function getLoggedUserCart(): Promise<void> {
    try {
      const res = (await getUserCart()) as CartResponse;
      let sum = 0;
      res.data.products.forEach((product) => {
        sum += product.count;
      });
      setCartCountItems(sum);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  }

  useEffect(() => {
    if (session) {
      getLoggedUserCart();
    } else {
      setCartCountItems(0);
    }
  }, [session]);

  return (
    <CartContext.Provider value={{ cartCountItems, setCartCountItems }}>
      {children}
    </CartContext.Provider>
  );
}
// hook =>  "use client"
