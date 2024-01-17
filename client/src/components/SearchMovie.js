import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchMovie = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [genreID, setGenreID] = useState("");
  const [moviesSearched, setMoviesSearched] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  const [cardsArray, setCardsArray] = useState([false, false, false, false]);

  const handleTitleChange = (event) => {
    setSearchInput(event.target.value);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjU1MGIwMzBiOTljYmU2NWRhYjA3OWZhZjQ3MzFhYiIsInN1YiI6IjY1YTYzNGI4Y2EwZTE3MDEyZTllM2ZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bPAjDB3F9_6_OW8f0PSiu9Lua_xW4OH_Kw3GwMb5p7Q",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInput}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMoviesSearched(filterResults(response.results));
        console.log(moviesSearched);
      })
      .catch((err) => console.error(err));
  };

  const filterResults = (results) => {
    return results.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = moviesSearched.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCardsArray([false, false, false, false]);
  };

  const handleExpandClick = (index) => {
    const updatedArray = [...cardsArray];
    updatedArray[index] = !updatedArray[index];
    setCardsArray(updatedArray);
  };

  const handleDetalisClick = (movieID) => {
    navigate("/moviedetails", { state: { movieID } });
  };

  const handleSubmitClick = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjU1MGIwMzBiOTljYmU2NWRhYjA3OWZhZjQ3MzFhYiIsInN1YiI6IjY1YTYzNGI4Y2EwZTE3MDEyZTllM2ZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bPAjDB3F9_6_OW8f0PSiu9Lua_xW4OH_Kw3GwMb5p7Q",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMoviesSearched(response.results);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <div>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          backgroundColor: "lavender",
          borderRadius: "10px",
          border: "2px solid gray",
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding={3}
        >
          <Button
            variant="outlined"
            onClick={handleLogOutClick}
            style={{ alignSelf: "flex-end" }}
          >
            LogOut
          </Button>

          <Typography variant="h3" mb={4}>
            Movie Search
          </Typography>

          <TextField
            label="Movie Title"
            variant="outlined"
            onChange={handleTitleChange}
          ></TextField>
          <Box display="flex" flexWrap="wrap" justifyContent="space-around">
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              mt={3}
            >
              <InputLabel id="demo-simple-select-label">
                Filter By Genre
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Genre"
                style={{ width: "220px" }}
                onChange={(e) => setGenreID(e.target.value)}
              >
                <MenuItem value={28}>Action</MenuItem>
                <MenuItem value={12}>Adventure</MenuItem>
                <MenuItem value={16}>Animation</MenuItem>
                <MenuItem value={35}>Comedy</MenuItem>
                <MenuItem value={80}>Crime</MenuItem>
                <MenuItem value={99}>Documentary</MenuItem>
                <MenuItem value={18}>Drama</MenuItem>
                <MenuItem value={10751}>Family</MenuItem>
                <MenuItem value={14}>Fantasy</MenuItem>
              </Select>
            </Box>
            <Button
              variant="outlined"
              style={{ height: "57px", alignSelf: "flex-end" }}
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
          marginTop={2}
        >
          {currentMovies.map((movie, index) => (
            <Card
              key={movie.id}
              style={{
                width: "250px",
                margin: "10px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {movie.title}
                  </Typography>
                </Box>
                <Typography variant="h7">
                  <span style={{ textDecoration: "underline" }}>
                    release date:
                  </span>{" "}
                  {movie.release_date}
                </Typography>
                <br />
                <Typography
                  variant="h7"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: cardsArray[index] ? "unset" : 4,
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ textDecoration: "underline" }}>overview:</span>{" "}
                  {movie.overview}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={2}
                >
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="outlined"
                    onClick={() => handleExpandClick(index)}
                  >
                    {cardsArray[index] ? "Collapse" : "Expand"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDetalisClick(movie.id)}
                  >
                    More Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box mt={3} mb={3} display="flex" justifyContent="center">
          {[...Array(Math.ceil(moviesSearched.length / moviesPerPage))].map(
            (movie, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                style={{ margin: "0 5px" }}
              >
                {index + 1}
              </Button>
            )
          )}
        </Box>
      </Container>
    </div>
  );
};

export default SearchMovie;
