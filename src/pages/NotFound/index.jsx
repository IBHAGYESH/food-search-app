import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";

function NotFound() {
  return (
    <Box>
      <Meta title="Error" />
      <h1>404 Not Found</h1>
      <Link to="/">GO HOME</Link>
    </Box>
  );
}

export default NotFound;
