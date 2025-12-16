"use client";

import Image from "next/image";
import { formatCurrency, formatDate } from "@/utils/format";
import ReceiptExtras from "./ReceiptExtras";
import type { ReceiptDto, RelatedProductDto } from "@/types/receipt.types";

type Props = {
  data: ReceiptDto;
  related?: RelatedProductDto | null;
  locale: string;
  instance: string;
  t: Record<string, string>;
};

export default function ReceiptDetailPage({
  data,
  related,
  locale,
  t,
}: Props) {
  const {
    brand,
    storeInformation,
    purchasedItems,
    purchaseSummary,
    receiptDate,
    currency,
    paymentInformation,
    footerNote,
    externalReceiptId,
    fiscalisation,
  } = data;

  return (
    <main className="max-w-xl mx-auto p-4 text-sm text-gray-800 bg-gray-50 min-h-screen">
      {/* Brand & Store Info */}
      <section className="flex items-start gap-4 mb-4 bg-white p-3 rounded-lg border">
        {brand?.logoUrl && (
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            width={40}
            height={40}
            className="rounded-md"
          />
        )}
        <div>
          <h1 className="text-base font-semibold">
            {storeInformation?.storeName || brand?.name}
          </h1>
          <p className="text-gray-500 text-xs">
            {formatDate(receiptDate, locale)}
          </p>
        </div>
      </section>

      {/* Items List */}
      <section className="bg-white rounded-lg border p-3 mb-3">
        <ul className="divide-y">
          {purchasedItems.items.map((item, idx) => (
            <li
              key={idx}
              className="py-3 flex items-start justify-between gap-2"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  {item.adjustments?.map((adj, i) => (
                    <p key={i} className="text-green-600 text-xs">
                      {adj.label}: {adj.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="text-right font-medium text-sm whitespace-nowrap mt-1">
                {formatCurrency(item.price, currency, locale)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Purchase Summary */}
      <section className="bg-white rounded-lg border p-3 mb-3">
        <div className="space-y-1 text-sm text-gray-600">
          {purchaseSummary.totalDiscount > 0 && (
            <p>
              {t["totalDiscount"]}:{" "}
              {formatCurrency(purchaseSummary.totalDiscount, currency, locale)}
            </p>
          )}
          {purchaseSummary.totalMemberDiscount > 0 && (
            <p>
              {t["memberDiscount"]}:{" "}
              {formatCurrency(
                purchaseSummary.totalMemberDiscount,
                currency,
                locale
              )}
            </p>
          )}
          {purchaseSummary.totalTax > 0 && (
            <p>
              {t["totalTax"]}:{" "}
              {formatCurrency(purchaseSummary.totalTax, currency, locale)}
            </p>
          )}
        </div>
        <div className="text-right font-bold text-base mt-2">
          {formatCurrency(purchaseSummary.totalAmount, currency, locale)}
        </div>
      </section>

      {/* Related Products */}
      {related?.products?.length > 0 && (
        <section className="bg-green-50 border rounded-lg p-3 mb-3">
          <h3 className="text-center font-semibold mb-3 text-sm">
            {related.title || t["relatedProducts"]}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {related.products.slice(0, 2).map((p, i) => (
              <a
                key={i}
                href={p.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center text-xs hover:opacity-90"
              >
                <Image
                  src={p.imagePath}
                  alt={p.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <p className="mt-2">{p.name}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Extras Section: E-Archive + Footer */}
      <ReceiptExtras
        externalReceiptId={externalReceiptId}
        paymentInformation={paymentInformation}
        footerNote={footerNote}
        fiscalisation={fiscalisation}
        currency={currency}
        locale={locale}
        t={t}
      />
    </main>
  );
}