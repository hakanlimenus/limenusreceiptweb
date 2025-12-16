export interface ReceiptDetailDto {
  receiptDto: ReceiptDto;
  relatedProductDto?: RelatedProductDto | null;
}

export interface ReceiptDto {
  id: string;
  personaId: string;
  documentId: string;
  externalReceiptId: string;
  externalReceiptVersion: string;
  country: string;
  currency: string;
  brand: BrandDto;
  receiptDate: string;

  purchaseSummary: PurchaseSummaryDto;
  storeInformation: StoreInformationDto;
  purchasedItems: PurchasedItemsDto;
  paymentInformation: PaymentInformationDto;
  customerInformation: CustomerInformationDto;
  cashRegisterInformation?: CashRegisterInformationDto | null;
  fiscalisation?: FiscalisationDto | null;
  footerNote?: FooterNoteDto | null;
}

export interface PurchaseSummaryDto {
  totalAmount: number;
  totalTax: number;
  totalDiscount: number;
  totalMemberDiscount: number;
  remainingMemberPoints: string;
}

export interface StoreInformationDto {
  storeIdentifier: string;
  storeName: string;
  address: string;
  taxNumber: string;
  phoneNumber: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface PurchasedItemsDto {
  items: PurchasedItemDto[];
}

export interface PurchasedItemDto {
  name: string;
  itemBrand: string;
  itemGender: string;
  itemCategory: string;
  price: number;
  image: string;
  imageUrl: string;
  taxRatePercentage: number;
  adjustments: AdjustmentDto[];
}

export interface AdjustmentDto {
  label: string;
  value: string;
}

export interface PaymentInformationDto {
  paymentMethod: string;
  fields: Field[];
}

export interface CustomerInformationDto {
  identifierType: string;
  gsm: string;
  personaIdentifier?: string | null;
  citizenNumber?: string | null;
  alternativeIdentifier?: string | null;
}

export interface CashRegisterInformationDto {
  cashierCode: string;
  whatsappContactNumber: string | null;
  fields: Field[];
}

export interface FiscalisationDto {
  fiscalisationDocuments?: FiscalisationDocumentDto[] | null;
}

export interface FiscalisationDocumentDto {
  type: string;
  details: {
    documentId: string;
    url: string;
  };
}

export interface FooterNoteDto {
  notes: string[] | null;
}

export interface Field {
  label: string;
  value: string;
}

export interface RelatedProductDto {
  id: string;
  documentId: string;
  title: string;
  products: ProductDto[];
}

export interface ProductDto {
  name: string;
  imagePath: string;
  productUrl: string;
}

export interface BrandDto {
  name: string;
  logoUrl: string;
}