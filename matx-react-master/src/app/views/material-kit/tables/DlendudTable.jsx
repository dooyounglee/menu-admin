import {
  Box,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect, useState } from "react";
import { strfor } from "app/utils/customUtil";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

const DlendudTable = (props) => {
  const [list, setList] = useState(props.menuList);
  
  useEffect(() => {
    setList(props.menuList);
  }, [props.menuList]);

  const selectMenu = (menu) => {
    props.setMenu(menu);
  }

  const delMenu = (menu) => {
    if(!window.confirm("really?")) return;
    props.delMenu(menu);
  }

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Icon</TableCell>
            <TableCell align="center">Level</TableCell>
            <TableCell align="center">Order</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Detail</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.length > 0 && list.map((menu, index) => (
            <TableRow key={index}>
              <TableCell align="left">{strfor(menu.level - 1, "ㅡ ")}{menu.name}</TableCell>
              <TableCell align="center">{menu.icon}</TableCell>
              <TableCell align="center">{menu.level}</TableCell>
              <TableCell align="center">{menu.order}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => delMenu(menu)}>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => selectMenu(menu)}>Detail</Button>
              </TableCell>
            </TableRow>
          ))}
          {list.length === 0 && (
            <TableRow key="0">
              <TableCell align="center" colSpan={6}>
                <CircularProgress className="progress" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default DlendudTable;
