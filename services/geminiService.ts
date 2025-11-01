
import { GoogleGenAI, Type } from "@google/genai";
import type { ExtractedData } from '../types';

// Declare XLSX from the script loaded in index.html
declare var XLSX: any;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        invoices: {
            type: Type.ARRAY,
            description: "List of all invoices found in the document. Consolidate multi-page invoices or related rows into one.",
            items: {
                type: Type.OBJECT,
                properties: {
                    serialNumber: { type: Type.STRING, description: "The unique invoice number or ID." },
                    customerName: { type: Type.STRING, description: "The name of the customer, consignee, or buyer." },
                    productName: { type: Type.STRING, description: "A concatenated string of all product names/descriptions in the invoice, separated by commas." },
                    quantity: { type: Type.NUMBER, description: "The total quantity of all line items in the invoice." },
                    taxAmount: { type: Type.NUMBER, description: "The total of all tax amounts (like CGST, SGST, IGST) for the invoice." },
                    totalAmount: { type: Type.NUMBER, description: "The final, total amount payable for the invoice." },
                    invoiceDate: { type: Type.STRING, description: "The date of the invoice in 'DD Mon YYYY' format (e.g., '12 Nov 2024')." }
                },
                 required: ["serialNumber", "customerName", "productName", "quantity", "taxAmount", "totalAmount", "invoiceDate"]
            }
        },
        products: {
            type: Type.ARRAY,
            description: "List of all individual products or line items across all invoices.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name or description of the product/service." },
                    quantity: { type: Type.NUMBER, description: "Quantity of the product." },
                    unitPrice: { type: Type.NUMBER, description: "Rate or price per unit/item before tax." },
                    tax: { type: Type.NUMBER, description: "Total tax amount for this line item. If a percentage is given, calculate the value." },
                    priceWithTax: { type: Type.NUMBER, description: "Total amount for this line item including tax." }
                },
                 required: ["name", "quantity", "unitPrice", "tax", "priceWithTax"]
            }
        },
        customers: {
            type: Type.ARRAY,
            description: "List of all unique customers identified. Consolidate customer data if they appear in multiple invoices.",
            items: {
                type: Type.OBJECT,
                properties: {
                    customerName: { type: Type.STRING, description: "Name of the customer, consignee or buyer." },
                    phoneNumber: { type: Type.STRING, description: "Customer's phone number. Extract from consignee or buyer details." },
                    totalPurchaseAmount: { type: Type.NUMBER, description: "The sum of total amounts for all invoices associated with this customer in the document." }
                },
                required: ["customerName", "phoneNumber", "totalPurchaseAmount"]
            }
        }
    },
    required: ["invoices", "products", "customers"]
};


export const extractDataFromFile = async (file: File): Promise<ExtractedData> => {
    let requestContents: { parts: any[] };
    
    // Handle XLSX files by converting them to CSV text
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csvText = XLSX.utils.sheet_to_csv(worksheet);
        
        const prompt = `You are an expert data extraction agent. Analyze the provided CSV data extracted from a spreadsheet. Extract all invoice, product line item, and customer details. Consolidate related rows into single entries where necessary (e.g., one invoice might span multiple rows). Calculate customer total purchase amounts from all their invoices in the document. Return a single JSON object matching the provided schema. If a field is not present, use an empty string "" for string types and 0 for number types. For phone numbers, extract only the digits.\n\nHere is the CSV data:\n\n${csvText}`;
        requestContents = { parts: [{ text: prompt }] };

    } else { // Handle Image/PDF files
        const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
        
        const filePart = {
            inlineData: {
                mimeType: file.type,
                data: base64Data,
            },
        };

        const prompt = `You are an expert data extraction agent. Analyze the provided document (MIME type: ${file.type}). It could be an image, PDF, or spreadsheet. Extract all invoice, product line item, and customer details. Consolidate multi-page invoices into single entries. Calculate customer total purchase amounts from all their invoices in the document. Return a single JSON object matching the provided schema. If a field is not present, use an empty string "" for string types and 0 for number types. For phone numbers, extract only the digits.`;
        
        requestContents = { parts: [filePart, { text: prompt }] };
    }


    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: requestContents,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText) as ExtractedData;
        
        // Basic validation
        if (!data.invoices || !data.products || !data.customers) {
            throw new Error("Extracted data is missing required fields.");
        }
        
        return data;

    } catch (error) {
        console.error("Error extracting data with Gemini:", error);
        throw new Error("Failed to extract data. The AI model could not process the file. Please try a clearer document.");
    }
};