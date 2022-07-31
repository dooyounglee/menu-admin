import { Box, Grid, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import AuthTable from "./AuthTable";
import MenuList from "./MenuList";
import UserList from "./UserList";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AdminAuth = () => {
  const [authList, setAuthList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [auth, setAuth] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios.get("/auth/all").then((response) => {
      console.log(response.data);
      setAuthList(response.data);
    });
  }, [render]);

  useEffect(() => {
    axios.get("/menu/all").then((response) => {
      console.log(response.data);
      setMenuList(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/user/all").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
  }, []);

  const saveMenu = (obj) => {
    let arr = [];
    for(let x in obj){
      if(obj[x]) arr.push(x);
    }
    let data = {auth: auth.id, arr: arr}
    axios.post("/auth/menus", data).then(() => {
      changeRender();
    })
  };

  const saveUser = (obj) => {
    let arr = [];
    for(let x in obj){
      if(obj[x]) arr.push(x);
    }
    let data = {auth: auth.id, arr: arr}
    axios.post("/auth/users", data).then(() => {
      changeRender();
    })
  };

  const changeRender = () => {
    setRender(!render);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>
      
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="Auth Table">
              <AuthTable authList={authList} setAuth={setAuth} changeRender={changeRender}/>
            </SimpleCard>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="Menu Table">
              <MenuList menuList={menuList} saveMenu={saveMenu} auth={auth}/>
            </SimpleCard>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="User Table">
              <UserList userList={userList} saveUser={saveUser} auth={auth}/>
            </SimpleCard>
          </Grid>
        </Grid>

    </Container>
  );
};

export default AdminAuth;
