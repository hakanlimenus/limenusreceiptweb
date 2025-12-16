// app/[instance]/[shortCode]/page.tsx

import { getReceiptDetailByShortCode } from "@/lib/api";
import ReceiptDetailPage from "@/components/ReceiptDetailPage";
import { notFound } from "next/navigation";
import { getTranslations } from "@/utils/i18n"; // i18n helper'ı ekle

type Props = {
  params: {
    instance: string;
    shortCode: string;
  };
  searchParams?: {
    lang?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { instance, shortCode } = params;
  const lang = searchParams?.lang?.toUpperCase() || "TR";

  const receiptData = await getReceiptDetailByShortCode(shortCode, lang);
  if (!receiptData) return notFound();

  const t = getTranslations(lang); // ✅ Burada çeviri nesnesi alınıyor

  return (
    <div className="min-h-screen bg-gray-50">
      <ReceiptDetailPage
        data={receiptData.receiptDto}
        related={receiptData.relatedProductDto}
        locale={lang}
        instance={instance}
        t={t} // ✅ Çeviri nesnesi geçiliyor
      />
    </div>
  );
}