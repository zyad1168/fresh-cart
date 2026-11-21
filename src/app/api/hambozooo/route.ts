import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );

  const payload = await response.json();

  return NextResponse.json(payload);
}
