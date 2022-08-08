//import { DatePicker } from "@mui/lab";
import { DatePicker } from '@mui/x-date-pickers'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
//import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LocalizationProvider } from '@mui/x-date-pickers'
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = (props) => {
  const [state, setState] = useState({});
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState(props.menuList);

  function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    setMenuList(props.menuList);
  }, [props.menuList])
  
  useEffect(() => {
    if(props.menu != null) setState(props.menu);
  }, [props.menu]);

  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  //     if (value !== state.password) return false;

  //     return true;
  //   });
  //   return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  // }, [state.password]);

  const handleSubmit = (event) => {
    const token = localStorage.getItem("jwt");
    axios.post("http://localhost:8080/menu/save", state, { headers : { 'Authorization': token } }).then((response) => {
      console.log(response.data);
      props.reRender();
      setOpen(true);
    });
  };

  const handleChange = (event) => {
    //event.persist();
    let tempObj = { ...state, };
    tempObj = {
      ...tempObj,
      [event.target.name]: event.target.value,
    };
    if(event.target.name === "dropdown"){
      tempObj = {
        ...tempObj,
        "dropdown": event.target.checked
      };
    }
    if(event.target.name === "parentId"){
      let parentMenuIndex = menuList.findIndex(o => o.id === event.target.value);
      tempObj = {
        ...tempObj,
        "level": !menuList[parentMenuIndex] ? 0 : menuList[parentMenuIndex]["level"],
      };
    }
    setState(tempObj);
  };

  // const handleDateChange = (date) => setState({ ...state, date });

  const newMenu = () => {
    setState({});
  }

  const {
    name,
    icon,
    order,
    route,
    component,
    columns,
    rowsPerColumn,
    dropdown,
    parentId,
    level,
    description,
    delYn,
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={name || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="name"
              validators={["required"]}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>parentId</InputLabel>
              <Select label="parentId"
                      value={parentId || ""}
                      onChange={handleChange}
                      name="parentId">
                <MenuItem key={-1} value="">no parent</MenuItem>
                { menuList.length > 0 &&
                  menuList.map((menu,index) => <MenuItem key={index} value={menu.id}>{menu.name}</MenuItem>)
                }
              </Select>
            </FormControl>

            <TextField
              type="number"
              name="level"
              label="level"
              value={level || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Date picker"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider> */}

            <TextField
              type="number"
              name="order"
              label="order"
              onChange={handleChange}
              value={order || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>delYn</InputLabel>
              <Select label="delYn"
                      value={delYn || "N"}
                      onChange={handleChange}
                      name="delYn">
                <MenuItem key={0} value="Y">Y</MenuItem>
                <MenuItem key={1} value="N">N</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              type="text"
              name="icon"
              label="icon"
              onChange={handleChange}
              value={icon || ""}
              errorMessages={["this field is required"]}
            />
            
            <TextField
              type="text"
              name="route"
              value={route || ""}
              label="route"
              onChange={handleChange}
              //validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="component"
              label="component"
              value={component || ""}
              onChange={handleChange}
              //validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="columns"
              onChange={handleChange}
              label="columns"
              value={columns || ""}
              //validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "password didn't match"]}
            />
            <TextField
              type="number"
              name="rowsPerColumn"
              onChange={handleChange}
              label="rowsPerColumn"
              value={rowsPerColumn || ""}
              //validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "password didn't match"]}
            />
            <TextField
              type="text"
              name="description"
              label="description"
              value={description || ""}
              onChange={handleChange}
              //validators={["required"]}
              errorMessages={["this field is required"]}
            />
            {/* <RadioGroup
              row
              name="dropdown"
              sx={{ mb: 2 }}
              value={dropdown || ""}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                label="Male"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
          </RadioGroup> */}

            <FormControlLabel
              control={<Checkbox />}
              checked={dropdown || false}
              label="dropdown"
              name="dropdown"
              onChange={handleChange}
            />
            
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
        <Button color="secondary" variant="contained" type="button" onClick={newMenu}>
          <Icon>add_box</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>New</Span>
        </Button>
      </ValidatorForm>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleForm;
