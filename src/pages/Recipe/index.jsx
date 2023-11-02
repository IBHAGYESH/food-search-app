import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import { useGetRecipeInformationQuery } from "../../services/recipes";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../../services/bookmarks";
import Skeleton from "@mui/material/Skeleton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";
import RecipePreviewCard from "./components/RecipePreviewCard";
import RecipeInfo from "./components/RecipeInfo";
import RecipeInfoDetailed from "./components/RecipeInfoDetailed";
import Meta from "../../components/Meta";
import useAuth from "../../hooks/useAuth";
import RecipeChart from "./components/RecipeChart";

export default function Recipe() {
  const { auth } = useAuth();
  const [bookmarked, setBookmarked] = useState(null);
  let navigate = useNavigate();
  let { recipe_id } = useParams();
  const {
    data: recipe,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipeInformationQuery(recipe_id);

  const [addBookmark, { isLoading: addBookmarkLoading }] =
    useAddBookmarkMutation();
  const [removeBookmark, { isLoading: removeBookmarkLoading }] =
    useRemoveBookmarkMutation();

  useEffect(() => {
    if (bookmarked === null && !isLoading && recipe?.bookmarked) {
      setBookmarked(true);
    }
  }, [bookmarked, isLoading, recipe?.bookmarked]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark({ user_id: auth.id, recipe_id });
      setBookmarked(false);
    } else {
      await addBookmark({
        recipe_id,
        recipe_title: recipe.title,
        recipe_image: recipe.image,
        recipe_summary: recipe.summary,
        user_id: auth.id,
      });
      setBookmarked(true);
    }
  };

  return (
    <Container>
      <Meta title="Recipe Info" />
      <IconButton
        aria-label="back"
        size="large"
        edge="start"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      {isLoading && (
        <Grid container component="main" spacing={2}>
          <Grid item xs={12} sm={4} md={6}>
            <Stack spacing={2} justifyContent={"space-evenly"}>
              <Box sx={{ height: "100%", width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height="250px" />
                <Skeleton width="60%" height={50} />
                <Skeleton height={30} />
              </Box>
              <Box>
                <Skeleton width="30%" height={30} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Box>
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </Box>
          </Grid>
        </Grid>
      )}
      {recipe && (
        <Grid container component="main" spacing={2}>
          <Grid item xs={12} sm={4} md={6}>
            <Stack spacing={2} justifyContent={"space-evenly"}>
              <RecipePreviewCard
                image={recipe.image}
                title={recipe.title}
                creditsText={recipe.creditsText}
              />
              <Box>
                <IconButton
                  aria-label="bookmark"
                  size="large"
                  edge="start"
                  onClick={async () => await toggleBookmark()}
                  disabled={addBookmarkLoading || removeBookmarkLoading}
                >
                  {bookmarked ? (
                    <BookmarkIcon fontSize="inherit" />
                  ) : (
                    <BookmarkBorderIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Box>
              <RecipeInfo infoTitle="Cuisines" infoDetails={recipe.cuisines} />
              <RecipeInfo infoTitle="Diets" infoDetails={recipe.diets} />
              <RecipeInfo
                infoTitle="Dish Types"
                infoDetails={recipe.dishTypes}
              />
              <RecipeInfo
                infoTitle="Suited Wines"
                infoDetails={recipe.winePairing?.pairedWines}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Stack spacing={2} justifyContent={"space-evenly"}>
              <RecipeInfoDetailed
                infoTitle="Summary"
                infoDetails={recipe.summary}
              />
              <RecipeInfoDetailed
                infoTitle="Instructions"
                infoDetails={recipe.instructions}
              />
              {/* <RecipeChart
                chartTitle="Properties"
                chartData={recipe.nutrition.properties}
              /> */}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
