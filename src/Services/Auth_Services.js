import { AXIOS } from "./Setup";

export const loginRequest = (action) => {
  return AXIOS.post("/api/login", action?.payload);
};
