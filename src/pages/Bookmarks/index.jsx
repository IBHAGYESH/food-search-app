import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { Card } from "@mui/material";
import {
  useGetBookmarksQuery,
  useRemoveBookmarkMutation,
} from "../../services/bookmarks";
import RecipeCard from "../../components/RecipeCard";
import Skeleton from "@mui/material/Skeleton";
import useAuth from "../../hooks/useAuth";
import Meta from "../../components/Meta";

export default function Bookmarks() {
  const { auth } = useAuth();
  const { data: bookmarks, isLoading } = useGetBookmarksQuery(auth.id);

  const [removeBookmark] = useRemoveBookmarkMutation();
  return (
    <Container sx={{ my: 5 }}>
      <Meta title="Bookmarks" />
      <Grid container spacing={2}>
        {isLoading &&
          Array.from(new Array(12)).map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton
                  key={card}
                  variant="rectangular"
                  width={"100%"}
                  height={118}
                />
                <Skeleton width="60%" />
                <Skeleton />
                <Skeleton />
              </Card>
            </Grid>
          ))}
        {bookmarks &&
          bookmarks.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <RecipeCard
                id={card.recipe_id}
                image={card.recipe_image}
                title={card.recipe_title}
                summary={card.recipe_summary}
                bookmarked={true}
                removeBookmark={removeBookmark}
              />
            </Grid>
          ))}
        {bookmarks && !bookmarks.length ? `No Bookmarks` : null}
      </Grid>
      {bookmarks && bookmarks.length > 10 ? (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 6,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Box>
      ) : null}
    </Container>
  );
}
