import * as React from "react";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { Cached, Delete, Visibility } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Modal,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  Fade,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { field: "email", headerName: "Email", width: 400 },
  { field: "description", headerName: "Descripción", width: 400 },
  { field: "status", headerName: "Estado", width: 400 },
  { field: "createdAt", headerName: "Fecha", width: 400 },
];

export default function Sugerencias() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedInfo, setSelectedInfo] = React.useState({});
  const [loadingInfo, setLoadingInfo] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [editLoading, setEditLoading] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setStatus("");
    setOpenModal(false);
  };

  const getRows = async () => {
    setLoading(true);
    await axios
      .get("https://valorantfa-api.herokuapp.com/api/sugerencias")
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reloadRows = async () => {
    setRows([]);
    setLoading(true);
    setTimeout(function () {
      getRows();
    }, 500);
  };

  React.useEffect(() => {
    getRows();
  }, []);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const notify = (text, type) => {
    if (type === "error") {
      toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "info") {
      toast.info(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteAlert = async () => {
    if (selected.length > 0) {
      setOpenAlert(true);
    } else {
      notify("No hay nada seleccionado", "info");
    }
  };

  const deleteRows = async () => {
    const seleccionados = selected.length;
    const toastId = toast.loading("Procesando...");
    if (seleccionados === 1) {
      const id = selected[0];
      await axios
        .delete(`https://valorantfa-api.herokuapp.com/api/sugerencias/${id}`)
        .then(() => {
          reloadRows();
          toast.update(toastId, {
            render: `Elemento eliminado`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          });
        })
        .catch((err) => {
          toast.update(toastId, {
            render: "Algo salió mal",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          });
        });
    } else {
      try {
        selected.map(async (elemento) => {
          await axios.delete(
            `https://valorantfa-api.herokuapp.com/api/sugerencias/${elemento}`
          );
        });
        reloadRows();
        setTimeout(function () {
          toast.update(toastId, {
            render: `${seleccionados} elementos eliminados`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          });
        }, 2000);

        //notify(`${seleccionados} elementos eliminados`, "success");
      } catch (err) {
        toast.update(toastId, {
          render: "Algo salió mal",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    }
  };

  const openEdit = async () => {
    if (selected.length === 1) {
      setLoadingInfo(true);
      handleOpenModal();
      const elemento = selected[0];
      await axios
        .get(`https://valorantfa-api.herokuapp.com/api/sugerencias/${elemento}`)
        .then((res) => {
          setLoadingInfo(false);
          setSelectedInfo(res.data);
          setStatus(res.data.status);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notify("Selecciona un elemento", "info");
    }
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const editRow = async () => {
    const toastId = toast.loading("Procesando...");
    const elemento = selectedInfo;
    setEditLoading(true);
    await axios
      .put(
        `https://valorantfa-api.herokuapp.com/api/sugerencias/${elemento._id}`,
        {
          email: elemento.email,
          description: elemento.description,
          status: status,
        }
      )
      .then(() => {
        setEditLoading(false);
        handleCloseModal();
        getRows();
        toast.update(toastId, {
          render: "Elemento actualizado",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      })
      .catch((err) => {
        toast.update(toastId, {
          render: "Algo salió mal",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      });
  };

  function CustomToolbar() {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <GridToolbarFilterButton />
          <Button>
            <Cached onClick={reloadRows} />
          </Button>
        </Box>
        <Box>
          <Button>
            <Delete onClick={deleteAlert} />
          </Button>
          <Button>
            <Visibility onClick={openEdit} />
          </Button>
        </Box>
      </Box>
    );
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    transition: "10s ease",
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            {loadingInfo ? (
              <>
                <CircularProgress
                  color="secondary"
                  sx={{
                    position: "relative",
                    left: "50%",
                    transform: "translate(0, 0)",
                  }}
                />
              </>
            ) : (
              <>
                <Fade in={!loadingInfo}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h1"
                  >
                    {selectedInfo.email}
                  </Typography>
                </Fade>
                <Fade
                  in={!loadingInfo}
                  style={{ transitionDelay: !loadingInfo ? "100ms" : "0ms" }}
                >
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 3, mb: 5 }}
                  >
                    {selectedInfo.description}
                  </Typography>
                </Fade>
                <Fade
                  in={!loadingInfo}
                  style={{ transitionDelay: !loadingInfo ? "200ms" : "0ms" }}
                >
                  <FormControl sx={{ mb: 5 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Age"
                      onChange={(e) => handleChangeStatus(e)}
                    >
                      <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                      <MenuItem value={"Visto"}>Visto</MenuItem>
                      <MenuItem value={"Por hacer"}>Por hacer</MenuItem>
                      <MenuItem value={"En Proceso"}>En proceso</MenuItem>
                    </Select>
                  </FormControl>
                </Fade>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={editRow}
                  disabled={editLoading}
                >
                  Guardar
                </Button>
                <Button color="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Dialog
          open={openAlert}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {selected.length === 1
              ? `¿Desea eliminar este elemento?`
              : `¿Desea eliminar ${selected.length} elementos?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Cuando sea eliminado no habra forma de recuperarlo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button
              onClick={() => {
                handleCloseAlert();
                deleteRows();
              }}
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <DataGrid
        getRowId={(e) => e._id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        //disableSelectionOnClick
        disableColumnMenu
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
        }}
        onSelectionModelChange={(select) => setSelected(select)}
      />
    </div>
  );
}
