"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { getUserWishlist } from "@/wishlistAction/getWishlist.action";
import { addToWishlist } from "@/wishlistAction/addToWishlist.action";
import { removeFromWishlist } from "@/wishlistAction/removeFromWishlist.action";
import { toast } from "@/components/ui/toast";
import { IProducts } from "@/interfaces/products";

interface WishlistResponse {
  status?: string;
  data?: IProducts[];
}

export interface WishlistContextType {
  wishlistItems: IProducts[];
  wishlistIds: string[];
  wishlistCount: number;
  loadingId: string | null;
  loadingWishlist: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [wishlistItems, setWishlistItems] = useState<IProducts[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loadingWishlist, setLoadingWishlist] = useState<boolean>(false);

  const refreshWishlist = useCallback(async () => {
    setLoadingWishlist(true);
    try {
      const res = (await getUserWishlist()) as WishlistResponse;
      if (res?.status === "success" && Array.isArray(res.data)) {
        setWishlistItems(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoadingWishlist(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      refreshWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [session, refreshWishlist]);

  const wishlistIds = wishlistItems
    .map((item) => item.id || (item as { _id?: string })._id)
    .filter((id): id is string => Boolean(id));

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!session) {
        toast.add({
          title: "Please sign in first to use wishlist",
          type: "error",
          timeout: 1500,
        });
        return;
      }

      const alreadySaved = wishlistIds.includes(productId);
      setLoadingId(productId);

      try {
        if (alreadySaved) {
          const res = await removeFromWishlist(productId);
          if (res?.status === "success") {
            setWishlistItems((prev) =>
              prev.filter(
                (item) =>
                  (item.id || (item as { _id?: string })._id) !== productId
              )
            );
            toast.add({
              title: res.message || "Removed from wishlist",
              type: "success",
              timeout: 1200,
            });
          }
        } else {
          const res = await addToWishlist(productId);
          if (res?.status === "success") {
            await refreshWishlist();
            toast.add({
              title: res.message || "Added to wishlist",
              type: "success",
              timeout: 1200,
            });
          }
        }
      } catch (error) {
        console.error("Wishlist toggle error:", error);
      } finally {
        setLoadingId(null);
      }
    },
    [session, wishlistIds, refreshWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        wishlistCount: wishlistItems.length,
        loadingId,
        loadingWishlist,
        isInWishlist,
        toggleWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside WishlistContextProvider");
  }
  return ctx;
}