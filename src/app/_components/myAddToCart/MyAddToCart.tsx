"use client";
import { addToCart } from "@/cartAction/addToCart.action";
import { toast } from "@/components/ui/toast";
import { CartContext } from "@/context/CartContext";
import { Button } from "@base-ui/react";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa6";

export default function MyAddToCart({
  id,
  isProductDertails,
}: {
  id: string;
  isProductDertails: boolean;
}) {
  const { cartCountItems, setCartCountItems } = useContext(CartContext) ?? {
    cartCountItems: 0,
    setCartCountItems: (count) => {},
  };

  async function addItetTocart(id: string) {
  try {
    const res = await addToCart(id);
    console.log(res);
    if (res.status == "success") {
      toast.add({
        title: res.message,
        type: "success",
        timeout: 1000,
      });
      setCartCountItems(cartCountItems + 1);
    } else {
      toast.add({
        title: "you should log in first",
        type: "error",
        timeout: 1000,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.add({
        title: error.message,
        type: "error",
        timeout: 1000,
      });
    }
  }
}
  return (
    <>
      {isProductDertails ? (
        <Button
          onClick={() => {
            addItetTocart(id);
          }}
          title="أضف إلى السلة"
          className={
            "  w-full h-11 bg-[#10b981] hover:bg-[#059669] text-white font-medium text-sm rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.45)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
          }
        >
          <ShoppingCart size={16} className="text-white fill-white" />
          <span>Add to Cart</span>
        </Button>
      ) : (
        <button
          onClick={() => {
            addItetTocart(id);
          }}
          type="button"
          className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-200 transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          title="أضف إلى السلة"
        >
          <FaPlus className="text-xs" />
        </button>
      )}
    </>
  );
}
