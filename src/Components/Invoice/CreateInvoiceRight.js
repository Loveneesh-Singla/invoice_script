import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getInvoicePayload } from "../../CommonComponents/invoicePayload";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INVOICE, UPDATE_INVOICE } from "../../Store/Action_Constants";
import { invoiceCreating, setLoading } from "../../Store/Slices/Invoice";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
const columns = [
  { id: "taskName", label: "Task Name", minWidth: 100 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "hourly_units_worked", label: "Hours/Units", minWidth: 100 },
  { id: "totalPrice", label: "Total Price", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

export const CreateInvoiceRight = ({
  selectedClient,
  tasks,
  totalAmount,
  invoiceDate,
  dueDate,
  deleteTask,
  editTask,
  shareInvoiceWith,
  isInvoiceUpdate,
}) => {
  const sender = JSON.parse(localStorage.getItem("sender"));
  const invoice_date = new Date(invoiceDate) + "";
  const due_date = new Date(dueDate) + "";
  const dispatch = useDispatch();
  const [invoiceDetails, setInvoiceDetails] = React.useState({
    clientId: "",
    invoicedate: "",
    duedate: "",
    allTasks: [],
    total_amount: 0,
    shareInvoiceWithEmail: "",
  });
  const { invoiceId } = useParams();
  const { loading } = useSelector((state) => state.invoices);
  useEffect(() => {
    setInvoiceDetails({
      clientId: selectedClient?.id,
      invoicedate:
        invoice_date.slice(4, 15) !== "lid Date"
          ? invoice_date.slice(4, 15) + ""
          : "",
      duedate:
        due_date.slice(4, 15) !== "lid Date" ? due_date.slice(4, 15) + "" : " ",
      allTasks: tasks,
      total_amount: totalAmount,
      shareInvoiceWithEmail: shareInvoiceWith,
    });
  }, [
    tasks,
    totalAmount,
    invoiceDate,
    dueDate,
    selectedClient,
    shareInvoiceWith,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = getInvoicePayload(invoiceDetails);
    if (
      !payload.client_id ||
      !payload.duedate ||
      !payload.invoicedate ||
      !payload.invoicetotalvalue ||
      payload?.tasks?.length === 0
    ) {
      toast.error("Please fill all the fields", {
        toastId: "sender_form",
      });
      return;
    }
    dispatch(invoiceCreating(true));
    dispatch(setLoading(true));

    if (invoiceId) {
      payload.id = invoiceId;
      dispatch({ type: UPDATE_INVOICE, payload: payload });
      return;
    }
    dispatch({ type: ADD_INVOICE, payload: payload });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
      }}
      className="border-left"
    >
      <Spinner loading={loading} />
      <Box sx={{ display: "flex", width: "80%" }}>
        <Box sx={{ width: "50%" }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 600 }}>
            Sender
          </Typography>
          <Typography mt={1}>Name:-&nbsp;{sender.name}</Typography>
          <Typography mt={0}>Pan No:-&nbsp;{sender.pan}</Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography className="textStyle" sx={{ fontWeight: 600 }}>
            Client
          </Typography>
          <Typography mt={1}>Name:-&nbsp;{selectedClient.name}</Typography>
          <Typography mt={0}>
            Company:-&nbsp;{selectedClient.companyName}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "80%", display: "flex" }}>
        <Typography mt={1} sx={{ width: "50%" }}>
          Invoice Date:- &nbsp;
          {invoiceDetails?.invoicedate}
        </Typography>
        <Typography mt={1}>
          Due Date:- &nbsp;
          {invoiceDetails?.duedate}
        </Typography>
      </Box>
      <Box mt={3}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              minHeight: 300,
              maxHeight: 300,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <b>{column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceDetails?.allTasks?.length > 0 ? (
                  invoiceDetails?.allTasks?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ width: "100px", overflowX: "hidden" }}
                            >
                              {column.id === "actions" ? (
                                <Box sx={{ display: "flex" }}>
                                  <EditIcon
                                    className="cursor_pointer"
                                    onClick={() => editTask(index)}
                                  />
                                  &nbsp; &nbsp;&nbsp; &nbsp;
                                  <DeleteForeverIcon
                                    onClick={() => deleteTask(index)}
                                    className="cursor_pointer"
                                  />
                                </Box>
                              ) : column.id === "taskName" ? (
                                `${value.slice(0, 7)}..`
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <div className="titleStyle">Please add some tasks</div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px solid",
            paddingBottom: "20px",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
            Total Amount
          </Typography>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
            {invoiceDetails.total_amount}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "87%", textAlign: "end", paddingRight: "50px" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, width: "40%" }}
        >
          {invoiceId ? "Update Invoice " : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};
