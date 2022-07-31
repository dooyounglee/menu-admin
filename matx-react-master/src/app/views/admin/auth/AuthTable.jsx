import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const AuthTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [authList, setAuthList] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setAuthList(props.authList);
  }, [props.authList]);

  function handleClickOpen(auth) {
    setOpen(true);
    setState({ id: auth.id, name: auth.name, del: auth.del });
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      "del": event.target.checked
    });
  };

  const saveAuth = () => {
    axios.post("/auth/save", state).then(() => {
      setOpen(false);
      props.changeRender();
    })
  };

  const deleteAuth = () => {
    axios.delete("/auth/delete", {data: state}).then(() => {
      setOpen(false);
      props.changeRender();
    })
  };

  const {
    name,
    del,
  } = state;

  return (
    <Box width="100%" overflow="auto">
      <Button onClick={() => handleClickOpen({})}>New</Button>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">isDel</TableCell>
            <TableCell align="center">수정,삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authList.length > 0 &&  authList.map((auth, index) => (
            <TableRow key={index}>
              <TableCell align="left">{auth.name}</TableCell>
              <TableCell align="center">{auth.del ? "Y" : "N"}</TableCell>
              <TableCell align="center">
              <Button variant="outlined" color="primary" onClick={() => handleClickOpen(auth)}>
                Detail
              </Button>
              <Button onClick={() => props.setAuth(auth)}>show</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={authList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            name="name"
            value={name || ""}
            fullWidth
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={del || false}
            label="isDel"
            name="isDel"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={deleteAuth} color="primary">
            Delete
          </Button>
          <Button onClick={saveAuth} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthTable;
