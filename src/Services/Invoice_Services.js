import { AXIOS } from "./Setup";
import fileDownload from "js-file-download";
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

export const _downloadPdf = async (action) => {
  return AXIOS.get(`/api/generate-pdf/${action}`, {
    responseType: "blob",
  }).then((res) => {
    console.log(res, "<========res");
    fileDownload(res.data, "invoice.pdf");
  });
};

export const mark_payment_done = (action) => {
  return AXIOS.put(`/api/update-payment-status/${action}`);
};
