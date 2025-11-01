
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Invoice } from '../types';

interface InvoicesState {
  invoices: Invoice[];
}

const initialState: InvoicesState = {
  invoices: [],
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    syncProductNameInInvoices: (state, action: PayloadAction<{ originalName: string; newName: string }>) => {
      const { originalName, newName } = action.payload;
      state.invoices.forEach(invoice => {
        if (invoice.productName.includes(originalName)) {
          // Use a regex to replace all occurrences
          const regex = new RegExp(originalName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
          invoice.productName = invoice.productName.replace(regex, newName);
        }
      });
    },
    syncCustomerNameInInvoices: (state, action: PayloadAction<{ originalName: string; newName: string }>) => {
        const { originalName, newName } = action.payload;
        state.invoices.forEach(invoice => {
            if (invoice.customerName === originalName) {
                invoice.customerName = newName;
            }
        });
    },
  },
});

export const { setInvoices, syncProductNameInInvoices, syncCustomerNameInInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;