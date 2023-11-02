import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { IconButton } from "@mui/material";
import useAuth from "../hooks/useAuth";

function RecipeCard({
  id,
  image,
  title,
  summary,
  bookmarked = false,
  removeBookmark,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 4,
        },
        boxShadow: 2,
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
          cursor: "pointer",
        }}
        image={image}
        onClick={() => {
          navigate(`/recipe/${id}`);
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        {/* <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {parse(summary)}
        </Typography> */}
      </CardContent>
      {bookmarked && (
        <CardActions disableSpacing>
          <IconButton
            aria-label="bookmark"
            size="medium"
            edge="start"
            onClick={() => removeBookmark({ user_id: auth.id, recipe_id: id })}
          >
            <BookmarkIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}

export default RecipeCard;
