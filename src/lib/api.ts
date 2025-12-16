// lib/api.ts

import type { ReceiptDetailDto } from "@/types/receipt.types";

export async function getReceiptDetailByShortCode(
  shortCode: string,
  lang: string
): Promise<ReceiptDetailDto | null> {
  // ⚠️ Geçici mock verisi — sonra gerçek fetch eklenebilir
  if (shortCode === "abc12345") {
    const res = await import("../../mock/receipt-abc12345.json");
    return res.default as ReceiptDetailDto;
  }

  return null;
}