import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { Outlet } from "react-router-dom";

import foodImage from "../assets/food.jpg";

export default function PublicLayout() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        component={Paper}
        square
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Outlet />
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        display="flex"
        alignItems="end"
        justifyContent="center"
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light" ? "#F8F9FC" : t.palette.grey[900],
        }}
      >
        <Box>
          <img src={foodImage} alt="food image" width="100%" />
        </Box>
      </Grid>
    </Grid>
  );
}
