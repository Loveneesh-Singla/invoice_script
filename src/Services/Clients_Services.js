import { AXIOS } from "./Setup";

export const fetchClients = (action) => {
  const params = {
    page: action?.payload?.page ? action?.payload?.page : 1,
    rows: action?.payload?.row ? action?.payload?.row : 10,
  };

  return AXIOS.get("/api/all-client-list", { params });
};

export const removeClient = (action) => {
  return AXIOS.delete(`/api/delete-client/${action}`);
};

export const createClient = (action) => {
  return AXIOS.post("/api/add-client", action?.payload);
};

export const editClient = (action) => {
  return AXIOS.put("/api/update-client/", action?.payload);
};
