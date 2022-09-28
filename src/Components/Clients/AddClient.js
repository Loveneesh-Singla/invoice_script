import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "../../Routes/ProtectedRoute";
import { getClientPayload } from "../../CommonComponents/clientPayload";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Store/Slices/Clients";
import { SAVE_CLIENT, UPDATE_CLIENT } from "../../Store/Action_Constants";
import Spinner from "../Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

const theme = createTheme();

export default function Add_Client() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, clientCreating, clients } = useSelector(
    (state) => state.clients
  );
  const navigate = useNavigate();
  const [clientInfo, setClientInfo] = React.useState({
    name: "",
    address: "",
    phone: "",
    pan: "",
    companyname: "",
    gstin: "",
    pin: "",
    tan: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = getClientPayload(data);

    if (!payload.name || !payload.address || !payload.email || !payload.phone) {
      toast.error("Please fill all the required fields", {
        toastId: "sender_form",
      });
      return;
    }
    dispatch(setLoading(true));

    if (id) {
      payload.id = clientInfo.id;
      dispatch({
        type: UPDATE_CLIENT,
        payload: payload,
      });
      return;
    }

    dispatch({
      type: SAVE_CLIENT,
      payload: payload,
    });
  };

  React.useEffect(() => {
    if (id) {
      setClientInfo(clients[id]);
    }
  }, []);

  React.useEffect(() => {
    if (!clientCreating) {
      navigate("/clients");
    }
  }, [clientCreating]);

  const handleInput = (e) => {
    setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <Spinner loading={loading} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {id ? "Update Client" : "Add Client"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="NAME"
                    name="name"
                    autoComplete="name"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="companyname"
                    label="COMPNAY NAME"
                    name="companyname"
                    autoComplete="companyname"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.companyname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="ADDRESS"
                    name="address"
                    autoComplete="address"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="PHONE"
                    name="phone"
                    autoComplete="phone"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="pan"
                    label="PAN NUMBER"
                    name="pan"
                    autoComplete="pan"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.pan}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="gstin"
                    label="GSTIN"
                    name="gstin"
                    autoComplete="gstin"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.gstin}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="pin"
                    label="PIN NUMBER"
                    name="pin"
                    autoComplete="pin"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.pin}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="tan"
                    label="TAN"
                    name="tan"
                    autoComplete="tan"
                    inputProps={{ sx: { height: 10, marginTop: 1 } }}
                    onChange={handleInput}
                    value={clientInfo.tan}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {id ? "Update Client" : "Save Client"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </ProtectedRoute>
  );
}
