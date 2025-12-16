"use client";

import Image from "next/image";
import { formatCurrency, formatDate } from "@/utils/format";
import type { ReceiptDto, RelatedProductDto } from "@/types/receipt.types";
import { ExternalLink } from "lucide-react";

type Props = {
  data: ReceiptDto;
  related?: RelatedProductDto | null;
  locale: string;
  instance: string;
  t: Record<string, string>;
};

export default function ReceiptDetailPage({ data, related, locale, t }: Props) {
  const {
    brand,
    storeInformation,
    purchasedItems,
    purchaseSummary,
    receiptDate,
    currency,
    footerNote,
    fiscalisation,
  } = data;

  const relatedProducts = related?.products ?? [];

  return (
    <main className="w-full max-w-md mx-auto px-4 py-5 text-sm text-gray-800 bg-gray-100 min-h-screen font-medium">
      {/* Brand & Store */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
        <div className="flex items-center gap-3 justify-center text-center">
          {brand?.logoUrl && (
            <Image
              src={brand.logoUrl}
              alt={brand.name}
              width={40}
              height={40}
              className="rounded-md shrink-0"
            />
          )}
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {storeInformation?.storeName}
            </p>
            <p className="text-xs text-gray-500 leading-none">
              {formatDate(receiptDate, locale)}
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl border border-gray-200 px-4 pt-4 pb-2 mb-2">
        {purchasedItems.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-start gap-2 pb-3 mb-2 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0"
          >
            <div className="flex gap-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={48}
                height={48}
                className="rounded object-cover shrink-0"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-snug break-words">
                  {item.name}
                </p>
                {item.adjustments?.map((adj, i) => (
                  <p key={i} className="text-green-600 text-xs mt-1 leading-none">
                    {adj.label}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-right min-w-[72px] ml-2">
              <p className="font-medium text-sm whitespace-nowrap">
                {formatCurrency(item.price, currency, locale)}
              </p>
              {item.adjustments?.map((adj, i) => (
                <p key={i} className="text-green-600 text-xs leading-none">
                  {adj.value}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Summary inside same card */}
        <div className="pt-3 text-sm text-gray-700 space-y-1">
          {purchaseSummary.totalDiscount > 0 && (
            <p>
              Toplam İndirim: {formatCurrency(purchaseSummary.totalDiscount, currency, locale)}
            </p>
          )}
          {purchaseSummary.totalTax > 0 && (
            <p>
              KDV: {formatCurrency(purchaseSummary.totalTax, currency, locale)}
            </p>
          )}
        </div>
        <div className="text-right text-base font-bold mt-2">
          {formatCurrency(purchaseSummary.totalAmount, currency, locale)}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-green-50 border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-center font-semibold text-sm mb-3">
            {related?.title || t["relatedProducts"]}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.slice(0, 2).map((p, i) => (
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
                <p className="mt-2 leading-tight break-words">{p.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* E-Arşiv */}
      {fiscalisation?.fiscalisationDocuments?.[0]?.details?.url && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="font-medium">E-Arşiv Fatura</p>
            <p className="text-xs text-gray-500">XXXXXXXXX</p>
          </div>
          <a
            href={fiscalisation.fiscalisationDocuments[0].details.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      )}
      {/* Return QR Code */}
      {data.externalReceiptId && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* QR ikon - Lucide veya istediğin başka bir ikon */}
              <ExternalLink size={18} className="text-green-600" />
              <p className="text-xs text-gray-600 font-medium">
                {t["receiptQrTitle"] ?? "Fatura QR Kodu"}
              </p>
            </div>
            <div className="p-2 bg-white border border-gray-200 rounded-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${data.externalReceiptId}`}
                alt="QR Code"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      {footerNote?.notes?.[0] && (
        <p className="text-xs text-gray-500 text-center mt-4">
          {footerNote.notes[0]}
        </p>
      )}
    </main>
  );
}