import { Box, Typography } from "@mui/material";
import React from "react";

function RecipePreviewCard({ image = "", title, creditsText }) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <img src={image} alt="123" width="100%" />
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6">{creditsText}</Typography>
    </Box>
  );
}

export default RecipePreviewCard;
