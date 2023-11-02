import React from "react";
import parse from "html-react-parser";
import { Box, Typography } from "@mui/material";

function RecipeInfoDetailed({ infoTitle, infoDetails }) {
  return (
    <Box>
      <Typography variant="h5">{infoTitle}</Typography>
      <Typography>{parse(infoDetails)}</Typography>
    </Box>
  );
}

export default RecipeInfoDetailed;
