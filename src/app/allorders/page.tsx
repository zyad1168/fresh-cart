import { IProducts } from "@/interfaces/products";
import { ICart } from "@/interfaces/cart";
import AllOrdersList from "./AllOrdersList";


export default async function AllOrders() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
    cache: "no-store",
  });
  const data = await res.json();

  const orders = Array.isArray(data) ? data : data?.data || [];

  const products: IProducts[] = orders.flatMap(
    (order: { cartItems: ICart[] }) =>
      (order.cartItems || []).map((item) => ({
        ...(item.product as unknown as IProducts),
        price: item.price,
      })),
  );

  return <AllOrdersList products={products} prefixTitle="Ordered" />;
}