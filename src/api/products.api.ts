export async function getAllProducts(query: string = "") {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products${query}`, {
    method: "Get",
  });
  const data = await res.json();

  return data.data;
}
