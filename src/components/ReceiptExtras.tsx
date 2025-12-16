"use client";

import { formatCurrency } from "@/utils/format";
import QRCode from "react-qr-code";
import { ExternalLink } from "lucide-react";

type Props = {
  externalReceiptId?: string;
  paymentInformation?: {
    paymentMethod: string;
    fields: { label: string; value: string }[];
  };
  footerNote?: {
    notes: string[];
  };
  fiscalisation?: {
    fiscalisationDocuments: {
      type: string;
      details: {
        documentId: string;
        url: string;
      };
    }[] | null;
  };
  currency: string;
  locale: string;
  t: Record<string, string>;
};

export default function ReceiptExtras({
  externalReceiptId,
  paymentInformation,
  footerNote,
  fiscalisation,
  currency,
  locale,
  t,
}: Props) {
  const bankName = paymentInformation?.fields?.find(
    (f) => f.label.toLowerCase().includes("banka")
  )?.value;

  const transactionNumber = paymentInformation?.fields?.find(
    (f) =>
      f.label.toLowerCase().includes("işlem") ||
      f.label.toLowerCase().includes("transaction")
  )?.value;

  const archiveUrl = fiscalisation?.fiscalisationDocuments?.[0]?.details?.url;

  return (
    <div className="space-y-4">
      {/* Payment Info */}
      {transactionNumber && (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2">{t["paymentInfo"]}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              {t["bankName"]}:{" "}
              <span className="text-gray-800 font-medium">
                {bankName || "-"}
              </span>
            </p>
            <p>
              {t["transactionNumber"]}:{" "}
              <span className="text-gray-800 font-medium">
                {transactionNumber}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* QR Code */}
      {externalReceiptId && (
        <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-600">{t["qrCode"]}</p>
            <p className="text-xs text-gray-400 mt-1">{externalReceiptId}</p>
          </div>
          <div className="bg-white p-2 border rounded-md">
            <QRCode value={externalReceiptId} size={72} />
          </div>
        </div>
      )}

      {/* E-Arşiv Kutusu */}
      {archiveUrl && (
        <div className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">
              {t["eArchiveInvoice"] || "E-Arşiv Fatura"}
            </p>
            <p className="text-xs text-gray-500">
              {t["clickToView"] || "Görüntülemek için tıklayın"}
            </p>
          </div>
          <a
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      )}

      {/* Footer Note */}
      {footerNote?.notes?.length > 0 && (
        <div className="text-xs text-gray-500 mt-2">
          {footerNote.notes[0]}
        </div>
      )}
    </div>
  );
}