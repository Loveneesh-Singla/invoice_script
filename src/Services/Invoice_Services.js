import { AXIOS } from "./Setup";

export const createInvoice = (action) => {
  return AXIOS.post("/api/add-invoice", action?.payload);
};

export const fetchInvoices = (action) => {
  const params = {
    page: action?.payload?.page ? action?.payload?.page : 1,
    rows: action?.payload?.row ? action?.payload?.row : 10,
  };

  return AXIOS.get("api/all-client-invoice", { params });
};

export const removeInvoice = (action) => {
  return AXIOS.delete(`/api/delete-invoice/${action}`);
};

export const fetchInvoice = (action) => {
  return AXIOS.get(`/api/get-invoice/${action}`);
};

export const editInvoice = (action) => {
  return AXIOS.put("/api/update-invoice/", action?.payload);
};

export const _downloadPdf = (action) => {
  return AXIOS.get(`/api/download-invoice/${action}`);
};
