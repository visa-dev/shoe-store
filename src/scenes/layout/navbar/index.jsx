import {
  Badge,
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens, ColorModeContext } from "../../../theme";
import { useContext, useEffect } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ToggledContext } from "../../../App";
import {FaCartArrowDown} from "react-icons/fa";


const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);
  const navigater= useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartSize = cartItems.length;
 
  const goToCart=()=>{
    navigater("/cart");
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
       {
        isHomePage && <div>
         <Box
           display="flex"
           alignItems="center"
           bgcolor={colors.primary[400]}
           borderRadius="3px"
           sx={{ display: `${isXsDevices ? "none" : "flex"}` }}
         >
           <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
           <IconButton type="button" sx={{ p: 1 }}>
             <SearchOutlined />
           </IconButton>
         </Box>
         </div>
       }
      </Box>

      <Box >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
      
        <IconButton onClick={goToCart} sx={{ position: 'relative' }}>
      <Badge
        badgeContent={cartSize}
        color="secondary"
        overlap="circular"
        sx={{
          position: 'absolute',
          top: -3, 
          right: -3, 
        }}
      >
        <FaCartArrowDown size={24} />
      </Badge>
    </IconButton>
       
      </Box>
    </Box>
  );
};

export default Navbar;
