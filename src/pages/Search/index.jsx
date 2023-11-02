import React, { useCallback, useEffect, useReducer, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { Button, Card, MenuItem, Select } from "@mui/material";
import { useSearchRecipesQuery } from "../../services/recipes";
import RecipeCard from "../../components/RecipeCard";
import Skeleton from "@mui/material/Skeleton";
import Meta from "../../components/Meta";
import HookTextField from "../../components/HookFormFields/HookTextField";
import { useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import AutocompleteTextInput from "../../components/AutocompleteTextInput";
import ReactHookFormSelect from "../../components/HookFormFields/ReactHookFormSelect";
import validationSchemas from "../../utils/validationSchema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const diets = [
  { id: 1, title: "vegetarian" },
  { id: 2, title: "vegan" },
  { id: 3, title: "ketogenic" },
  { id: 4, title: "paleo" },
  { id: 5, title: "primal" },
  { id: 6, title: "pescetarian" },
  { id: 7, title: "gluten free" },
  {
    id: 8,
    title: "lacto-vegetarian",
  },
  {
    id: 9,
    title: "ovo-vegetarian",
  },
];

const mealTypes = [
  { id: 1, title: "main course" },
  { id: 2, title: "side dish" },
  { id: 3, title: "dessert" },
  { id: 4, title: "appetizer" },
  { id: 5, title: "salad" },
  { id: 6, title: "bread" },
  { id: 7, title: "breakfast" },
  { id: 8, title: "soup" },
  { id: 9, title: "beverage" },
  { id: 10, title: "sauce" },
  { id: 11, title: "marinade" },
  { id: 12, title: "fingerfood" },
  { id: 13, title: "snack" },
  { id: 14, title: "drink" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("burger");
  const [Diets, setDiets] = useState("");
  const [Meal, setMeal] = useState("");

  /**
   * Pagination logic
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const PER_PAGE = 12;

  const handlePaginationChange = (e, nextPage) => {
    // logic to count the offset
    if (nextPage === 1) {
      setOffset(0);
    } else {
      setOffset((nextPage - 1) * PER_PAGE);
    }
    setCurrentPage(nextPage);
  };

  /**
   * FIlters
   */
  const initialState = { selectedOptions: [] };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_SELECTED_OPTIONS":
        return { selectedOptions: action.payload.options };

      case "REMOVE_OPTION":
        return {
          selectedOptions: state.selectedOptions.filter(
            (option) => option.id !== action.payload.id
          ),
        };
      default:
        throw new Error();
    }
  }
  const [dietState, dispatch] = useReducer(reducer, initialState);

  const handleDietChange = useCallback(
    (event, values) => {
      dispatch({ type: "SET_SELECTED_OPTIONS", payload: { options: values } });
    },
    [dispatch]
  );

  const removeDietOption = useCallback(
    (id) => {
      dispatch({ type: "REMOVE_OPTION", payload: { id: id } });
    },
    [dispatch]
  );

  /**
   * Search Handler
   */
  const validationSchema = yup.object({
    search: validationSchemas.search,
  });

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      search: "",
      meal: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async ({ search, meal }) => {
      //search handler
      const selectedDiets = [];
      dietState.selectedOptions.forEach((diet) =>
        selectedDiets.push(diet.title)
      );
      setCurrentPage(1);
      setValue("search", search);
      setDiets(selectedDiets.join("|"));
      setMeal(meal);
      setSearchQuery(search);
    },
    [dietState, pageCount]
  );

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useSearchRecipesQuery({
    query: searchQuery,
    number: PER_PAGE,
    offset: offset,
    diet: Diets,
    type: Meal,
  });

  useEffect(() => {
    if (!isFetching && posts?.totalResults) {
      setPageCount(Math.ceil(posts?.totalResults / PER_PAGE));
      setTotalPostCount(posts?.totalResults);
    }
  }, [isFetching]);

  return (
    <Container sx={{ my: 5 }}>
      <Meta title="Search Recipes" />
      <Grid
        container
        spacing={2}
        my={5}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid item xs={7} md={10}>
          <HookTextField
            control={control}
            required
            fullWidth
            id="search"
            label="Search Recipes"
            name="search"
            autoComplete="search"
            autoFocus
          />
        </Grid>
        <Grid item xs={5} md={2}>
          <Button
            sx={{ height: "100%", width: "100%" }}
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <AutocompleteTextInput
            id="diets"
            name="diets"
            label="Add Diets"
            options={diets}
            dietState={dietState}
            handleDietChange={handleDietChange}
            removeDietOption={removeDietOption}
            getOptionLabel={(option) => option.title}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <ReactHookFormSelect
            name="meal"
            label="meal"
            control={control}
            fullWidth
          >
            {mealTypes.map((mealType) => (
              <MenuItem key={mealType.id} value={mealType.title}>
                {mealType.title}
              </MenuItem>
            ))}
          </ReactHookFormSelect>
        </Grid>
      </Grid>
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
        {posts?.results &&
          posts.results.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <RecipeCard
                id={card.id}
                image={card.image}
                title={card.title}
                // summary={card.summary}
              />
            </Grid>
          ))}
      </Grid>
      {posts && totalPostCount > PER_PAGE ? (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 6,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            variant="outlined"
            shape="rounded"
            page={currentPage}
            count={pageCount}
            onChange={handlePaginationChange}
          />
        </Box>
      ) : null}
    </Container>
  );
}
