import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  loading: false,
  invoiceCreating: false,
  invoiceToUpdate: {},
};

const invoices = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    _saveInvoice: (state, action) => {
      return {
        ...state,
        invoices: action?.payload,
        loading: false,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action?.payload,
      };
    },
    invoiceCreated: (state, action) => {
      return {
        ...state,
        loading: false,
        invoiceCreating: false,
      };
    },
    invoiceCreating: (state, action) => {
      return {
        ...state,
        invoiceCreating: action?.payload,
      };
    },
    setInvoiceToUpdate: (state, action) => {
      return {
        ...state,
        invoiceToUpdate: action?.payload,
        loading: false,
      };
    },
  },
});

export const {
  setLoading,
  _saveInvoice,
  invoiceCreated,
  invoiceCreating,
  setInvoiceToUpdate,
} = invoices.actions;
export default invoices.reducer;
