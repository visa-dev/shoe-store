
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { BsSendFill } from "react-icons/bs";
import {
  DashboardOutlined,
  MenuOutlined,

} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
               <Link to='/'>
               <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                /></Link>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                >
                  <Link to='/'>THE SHOES</Link>
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              Viraj Sachin
            </Typography>

          </Box>
        </Box>
      )}

        <Box>
              <Menu
                menuItemStyles={{
                  button: {
                    ":hover": {
                      color: "#868dfb",
                      background: "transparent",
                      transition: ".4s ease",
                    },
                  },
                }}
              >
                <Item
                  title="REQUESTS"
                  path="/requests"
                  colors={colors}
                  icon={<BsSendFill />}
                />
              </Menu>
        </Box>

      {/*<Box mb={5} pl={collapsed ? undefined : "5%"}>*/}
      {/*  <Menu*/}
      {/*    menuItemStyles={{*/}
      {/*      button: {*/}
      {/*        ":hover": {*/}
      {/*          color: "#868dfb",*/}
      {/*          background: "transparent",*/}
      {/*          transition: ".4s ease",*/}
      {/*        },*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Item*/}
      {/*      title="Dashboard"*/}
      {/*      path="/"*/}
      {/*      colors={colors}*/}
      {/*      icon={<DashboardOutlined />}*/}
      {/*    />*/}
      {/*  </Menu>*/}
      {/*  <Typography*/}
      {/*    variant="h6"*/}
      {/*    color={colors.gray[300]}*/}
      {/*    sx={{ m: "15px 0 5px 20px" }}*/}
      {/*  >*/}
      
      {/*  </Typography>{" "}*/}
      {/*  <Menu*/}
      {/*    menuItemStyles={{*/}
      {/*      button: {*/}
      {/*        ":hover": {*/}
      {/*          color: "#868dfb",*/}
      {/*          background: "transparent",*/}
      {/*          transition: ".4s ease",*/}
      {/*        },*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Item*/}
      {/*      title="Manage Team"*/}
      {/*      path="/team"*/}
      {/*      colors={colors}*/}
      {/*      icon={<PeopleAltOutlined />}*/}
      {/*    />*/}
      {/*    <Item*/}
      {/*      title="Contacts Information"*/}
      {/*      path="/contacts"*/}
      {/*      colors={colors}*/}
      {/*      icon={<ContactsOutlined />}*/}
      {/*    />*/}
      {/*    <Item*/}
      {/*      title="Invoices Balances"*/}
      {/*      path="/invoices"*/}
      {/*      colors={colors}*/}
      {/*      icon={<ReceiptOutlined />}*/}
      {/*    />*/}
      {/*  </Menu>*/}
      {/*</Box>*/}
    </Sidebar>
  );
};

export default SideBar;
