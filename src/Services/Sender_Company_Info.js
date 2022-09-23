import { AXIOS } from "./Setup";

export const createSenderCompany = (action) => {
  return AXIOS.post("/api/add-sender-party", action?.payload);
};

export const fetchSenderCompany = () => {
  return AXIOS.get("/api/sender-party/1");
};

export const modifySenderCompany = (action) => {
  return AXIOS.put("/api/update-sender-party/", action?.payload);
};
