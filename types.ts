
export interface Invoice {
  serialNumber: string;
  customerName: string;
  productName: string;
  quantity: number;
  taxAmount: number;
  totalAmount: number;
  invoiceDate: string;
}

export interface Product {
  id: string; // Unique ID for editing
  name: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  priceWithTax: number;
}

export interface Customer {
  id: string; // Unique ID for editing
  customerName:string;
  phoneNumber: string;
  totalPurchaseAmount: number;
}

export interface ExtractedData {
  invoices: Omit<Invoice, 'id'>[];
  products: Omit<Product, 'id'>[];
  customers: Omit<Customer, 'id'>[];
}
