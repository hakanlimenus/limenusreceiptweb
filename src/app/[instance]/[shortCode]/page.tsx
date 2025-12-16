import { notFound } from 'next/navigation';

import ReceiptDetailPage from '@/components/ReceiptDetailPage';
import { getReceiptDetailByShortCode } from '@/lib/api';
import { getTranslations } from '@/utils/i18n';

type PageProps = {
  params: Promise<{
    instance: string;
    shortCode: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  // ✅ Next.js 15: params ve searchParams await edilir
  const { instance, shortCode } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const lang = (resolvedSearchParams?.lang || 'TR').toUpperCase();

  const receiptData = await getReceiptDetailByShortCode(shortCode, lang);
  if (!receiptData) return notFound();

  const t = getTranslations(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <ReceiptDetailPage
        data={receiptData.receiptDto}
        related={receiptData.relatedProductDto}
        locale={lang}
        instance={instance}
        t={t}
      />
    </div>
  );
}