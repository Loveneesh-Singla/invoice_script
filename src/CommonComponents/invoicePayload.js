export const getInvoicePayload = (data) => {
  return {
    duedate: data.duedate,
    client_id: data?.clientId,
    invoicedate: data?.invoicedate,
    shareInvoiceWithEmail: data?.shareInvoiceWithEmail,
    invoicetotalvalue: data?.total_amount,
    tasks: JSON.stringify(data?.allTasks),
  };
};
