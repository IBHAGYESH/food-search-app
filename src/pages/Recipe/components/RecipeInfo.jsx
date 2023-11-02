import { Box, List, ListItem, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";

function RecipeInfo({ infoTitle, infoDetails }) {
  return (
    <Box>
      <Typography variant="h5">{infoTitle}</Typography>
      <List>
        {infoDetails.map((info) => (
          <ListItem key={info}>
            <ArrowRightIcon fontSize="small" />
            {info}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RecipeInfo;
