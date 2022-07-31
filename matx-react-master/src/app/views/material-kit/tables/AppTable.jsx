import { Box, Grid, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
import SimpleTable from "./SimpleTable";
import DlendudTable from "./DlendudTable";
import SimpleForm from "./SimpleForm";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { menuToTree } from "app/utils/customUtil";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {
  const [menu, setMenu] = useState(null);
  const [render, setRender] = useState(false);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    //setMenuList([]);
    axios.get("http://localhost:8080/menu/all").then((response) => {
      console.time('code_measure');
      console.log(response.data);
      let arr = response.data;
      let arr2 = menuToTree(arr);
      console.timeEnd('code_measure');
      setMenuList(arr2);
      console.log(arr2);
    });
  }, [render]);

  const delMenu = (menu) => {
    axios.delete("http://localhost:8080/menu/delete", {data: menu}).then((response) => {
      console.log(response.data);
      //let arr = response.data;
      //let arr2 = menuToTree(arr);
      //console.log(arr2);
      //setMenuList(arr2);
      setRender(!render);
    });
  };

  const reRender = () => {
    setMenu({});
    setRender(!render);
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>

      {/* <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard>

      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard> */}

      
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <SimpleCard title="Dlendud Table">
              <DlendudTable setMenu={setMenu} reRender={reRender} menuList={menuList} delMenu={delMenu}/>
            </SimpleCard>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="Dlendud Table">
              <SimpleForm menu={menu} reRender={reRender} menuList={menuList}/>
            </SimpleCard>
          </Grid>
        </Grid>

    </Container>
  );
};

export default AppTable;
