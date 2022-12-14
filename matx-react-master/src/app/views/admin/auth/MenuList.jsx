import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuList,
  Snackbar,
  styled,
} from '@mui/material';
import { menuToTree, strfor } from 'app/utils/customUtil';
import React, { useEffect, useState } from 'react';

const AppButtonRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .formControl': { margin: theme.spacing(2) },
}));

export default function FormGroupCheckbox(props) {
  const [state, setState] = React.useState({});
  const [menuList, setMenuList] = useState([]);
  const [open, setOpen] = useState(false);

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const saveMenu = () => {
    props.saveMenu(state);
    setOpen(true);
  };

  useEffect(() => {
    setMenuList(props.menuList);
  }, [props.menuList]);

  useEffect(() => {
    if (!!props.auth) {
      let tempObj = {};
      for (let menuId of props.auth.menus) {
        tempObj = { ...tempObj, [menuId]: true };
      }
      setState(tempObj);
    }
  }, [props.auth]);

  return (
    <>
      <AppButtonRoot>
        <FormControl component="fieldset" className="formControl">
          <FormLabel component="legend">
            <Button onClick={() => saveMenu()}>Save</Button>
          </FormLabel>
          <FormGroup>
            {menuList.map((menu, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={state[menu.id] || false}
                    onChange={handleChange(menu.id)}
                    value={menu.id}
                  />
                }
                label={strfor(menu.level - 1, 'ㅡ ') + menu.name}
              />
            ))}
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
      </AppButtonRoot>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}
