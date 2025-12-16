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
};

export default function ReceiptDetailPage({ data, related, locale }: Props) {
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

  return (
    <main className="w-full max-w-md mx-auto px-3 py-4 text-[13px] text-gray-800 bg-gray-100 min-h-screen">
      {/* Brand & Store */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-2 flex items-start gap-3">
        {brand?.logoUrl && (
          <Image src={brand.logoUrl} alt={brand.name} width={32} height={32} className="rounded-md" />
        )}
        <div>
          <h1 className="font-semibold">{storeInformation?.storeName}</h1>
          <p className="text-gray-500 text-xs">{formatDate(receiptDate, locale)}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
        {purchasedItems.items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between mb-3 last:mb-0">
            <div className="flex gap-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={48}
                height={48}
                className="rounded object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                {item.adjustments?.map((adj, i) => (
                  <p key={i} className="text-green-600 text-xs">{adj.label}</p>
                ))}
              </div>
            </div>
            <div className="text-right font-medium text-sm whitespace-nowrap mt-1">
              {formatCurrency(item.price, currency, locale)}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
        <div className="text-gray-700 space-y-1">
          {purchaseSummary.totalDiscount > 0 && (
            <p>Toplam İndirim: {formatCurrency(purchaseSummary.totalDiscount, currency, locale)}</p>
          )}
          {purchaseSummary.totalTax > 0 && (
            <p>KDV: {formatCurrency(purchaseSummary.totalTax, currency, locale)}</p>
          )}
        </div>
        <div className="text-right text-base font-bold mt-2">
          {formatCurrency(purchaseSummary.totalAmount, currency, locale)}
        </div>
      </div>

      {/* Related Products */}
      {related?.products?.length > 0 && (
        <div className="bg-green-50 border border-gray-200 rounded-lg p-3 mb-2">
          <h3 className="text-center font-semibold text-sm mb-3">{related.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            {related.products.slice(0, 2).map((p, i) => (
              <a
                key={i}
                href={p.productUrl}
                target="_blank"
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
        </div>
      )}

      {/* E-Arşiv */}
      {fiscalisation?.fiscalisationDocuments?.[0]?.details?.url && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2 flex justify-between items-center">
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

      {/* Footer */}
      {footerNote?.notes?.[0] && (
        <p className="text-xs text-gray-500 text-center mt-4">{footerNote.notes[0]}</p>
      )}
    </main>
  );
}