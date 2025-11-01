
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../types';

interface CustomersState {
  customers: Customer[];
}

const initialState: CustomersState = {
  customers: [],
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
            state.customers[index] = action.payload;
        }
    },
     updateCustomerInvoices: (state, action: PayloadAction<{ customerName: string; totalPurchaseAmount: number }>) => {
      const customer = state.customers.find(c => c.customerName === action.payload.customerName);
      if(customer){
        customer.totalPurchaseAmount = action.payload.totalPurchaseAmount;
      }
    }
  },
});

export const { setCustomers, updateCustomer } = customersSlice.actions;
export default customersSlice.reducer;