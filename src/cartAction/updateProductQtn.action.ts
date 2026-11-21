
import { getMyToken } from "@/utilities/getMyToken";

export async function updateProductQtn(id: string, count: number) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("You should be logged in first");
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: Number(count),
        }),
      },
    );

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {
        status: "fail",
        message:
          "Server returned HTML response (Invalid Endpoint or Product ID)",
      };
    }

    const payload = await res.json();
    return payload;
  } catch (error: any) {
    return {
      status: "fail",
      message: error?.message || "Failed to update product quantity",
    };
  }
}
