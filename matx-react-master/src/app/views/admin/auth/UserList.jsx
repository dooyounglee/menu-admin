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
import React, { useEffect, useState } from 'react';

const AppButtonRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .formControl': { margin: theme.spacing(2) },
}));

export default function FormGroupCheckbox(props) {
  const [state, setState] = React.useState({});
  const [userList, setUserList] = useState([]);
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

  const saveUser = () => {
    props.saveUser(state);
    setOpen(true);
  };

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList]);

  useEffect(() => {
    if (!!props.auth) {
      let tempObj = {};
      for (let userId of props.auth.users) {
        tempObj = { ...tempObj, [userId]: true };
      }
      setState(tempObj);
    }
  }, [props.auth]);

  return (
    <>
      <AppButtonRoot>
        <FormControl component="fieldset" className="formControl">
          <FormLabel component="legend">
            <Button onClick={() => saveUser()}>Save</Button>
          </FormLabel>

          <FormGroup>
            {userList.map((user, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={state[user.id] || false}
                    onChange={handleChange(user.id)}
                    value={user.id}
                  />
                }
                label={user.username + '(' + user.email + ')'}
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
