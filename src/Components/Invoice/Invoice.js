import { Box } from "@mui/material";
import ProtectedRoute from "../../Routes/ProtectedRoute";
import { RenderInvoiceTable } from "./RenderInvoiceTable";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clientCreating } from "../../Store/Slices/Clients";

export const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addClient = () => {
    dispatch(clientCreating(true));
    navigate("/createInvoice");
  };

  return (
    <ProtectedRoute>
      <Box mt={10} ml={2} mr={2} className="min_height">
        <Box className="client_table_upper">
          <Typography variant="h5">ALL INVOICES</Typography>
          <Button sx={{ border: "1px solid" }} onClick={addClient}>
            Create Invoice
          </Button>
        </Box>
        <Box mt={2}>{<RenderInvoiceTable />}</Box>
      </Box>
    </ProtectedRoute>
  );
};
