import {

  useMediaQuery,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import ShoesList from "../../components/ShoesList.jsx";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  return (
   <div>
     <ShoesList/>

   </div>
  );
}

export default Dashboard;
