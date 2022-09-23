import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
  loading: false,
  clientCreating: false,
};

const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {
    _saveClients: (state, action) => {
      return {
        ...state,
        clients: action?.payload,
        loading: false,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action?.payload,
      };
    },
    clientCreated: (state, action) => {
      return {
        ...state,
        loading: false,
        clientCreating: false,
      };
    },
    clientCreating: (state, action) => {
      return {
        ...state,
        clientCreating: action?.payload,
      };
    },
  },
});

export const { setLoading, _saveClients, clientCreated, clientCreating } =
  clients.actions;
export default clients.reducer;
