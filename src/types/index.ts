export type CategoryData = {
  id: number;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[]; // 재귀적으로 동일한 구조를 가질 수 있음
  id?: number;
  price?: number;
  stockQuantity: number;
};

export type OrderHistory = {
  optionName: string;
  optionId: number;
  productName: string;
  imageUrl: string;
  productId: number;
  quantity: number;
};

export type OrderFormData = {
  optionId: number;
  quantity: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
  point?: number;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
