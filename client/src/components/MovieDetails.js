import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MovieDetails = () => {
  const { state } = useLocation();
  const [movieID, setMovieID] = useState(state.movieID);
  const [movieDetails, setMovieDetails] = useState({});
  const [similarmoviesDetails, setSimilarMoviesDetails] = useState([]);
  const [showSimilarMovies, setShowSimilarMovies] = useState(false);

  const navigate = useNavigate('')

  useEffect(() => {
    const fetchMovieData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjU1MGIwMzBiOTljYmU2NWRhYjA3OWZhZjQ3MzFhYiIsInN1YiI6IjY1YTYzNGI4Y2EwZTE3MDEyZTllM2ZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bPAjDB3F9_6_OW8f0PSiu9Lua_xW4OH_Kw3GwMb5p7Q",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}`,
          options
        );
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovieData();
  }, [movieID]);

  const fetchSimilarMovieData = async () => {
    setShowSimilarMovies(!showSimilarMovies);
    if (!showSimilarMovies) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjU1MGIwMzBiOTljYmU2NWRhYjA3OWZhZjQ3MzFhYiIsInN1YiI6IjY1YTYzNGI4Y2EwZTE3MDEyZTllM2ZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bPAjDB3F9_6_OW8f0PSiu9Lua_xW4OH_Kw3GwMb5p7Q",
        },
      };
      if (movieDetails.id) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieDetails.id}/similar`,
            options
          );
          const data = await response.json();
          setSimilarMoviesDetails(data.results.slice(0, 3));
          console.log(similarmoviesDetails);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const getMovieID = (event) => {
        const movieTitle = event.target.dataset.title
        const movie = similarmoviesDetails.filter((movie) => {
            return movie.title == movieTitle
        })
        setShowSimilarMovies(false)
        setMovieID(movie[0].id)
  }

  const handleAddTofavorites = () => {
    const fetchUserData = async () => {
      console.log(localStorage.getItem('token'));
      try {
        const response = await axios.post(
          'http://localhost:3001/movies',
          {
            title: movieDetails.title,
            img_url: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
          },
          {
            headers: {
              'x-api-key': localStorage.getItem('token')
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
        navigate('/')
      }
    };
    fetchUserData()

    toast.success('Added to favorites', {
      position: 'top-right',
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div>
      <ToastContainer />
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
          alignItems="center"
          pb={3}
          pt={3}
        >
          <Typography variant="h3" mb={3}>
            {movieDetails.title}
          </Typography>
          <Typography variant="h4" mb={5}>
            {movieDetails.tagline}
          </Typography>
          {movieDetails.status === "In Production" ? (
            <Typography variant="h5" mb={5}>
              Still In Production
            </Typography>
          ) : (
            <Typography variant="h5" mb={5}>
              Vote Average: {movieDetails.vote_average}
            </Typography>
          )}

          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignSelf={"normal"}
            justifyContent="space-evenly"
          >
            <Card style={{ width: "300px" }}>
              <CardMedia
                component="img"
                height="300"
                alt={movieDetails.title}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              />
              <CardContent>
                <Typography>{movieDetails.overview}</Typography>
              </CardContent>
            </Card>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Typography variant="h6">Production Companies:</Typography>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-around"
                padding={3}
              >
                {movieDetails.production_companies?.map((company) => (
                  <Card
                    style={{ width: "150px", height: "160px", margin: "5px" }}
                  >
                    <CardMedia
                      component="img"
                      height="100"
                      alt={company.name}
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    />
                    <CardContent style={{ padding: "10px" }}>
                      <Typography variant="body2">{company.name}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <Typography variant="h6" mb={2} mt={3}>
                Genres:
              </Typography>
              <Box
                display={"flex"}
                flexDirection="row"
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                {movieDetails.genres?.map((genre) => (
                  <Button
                    variant="outlined"
                    style={{ height: "100px", width: "100px", margin: "5px" }}
                  >
                    {genre.name}
                  </Button>
                ))}
              </Box>
              <Typography variant="h6" mt={3}>
                Run Time: {movieDetails.runtime} minutes
              </Typography>
              <Typography variant="h6" mt={3}>
                Budget: {movieDetails.budget}$
              </Typography>
              <Typography variant="h6" mt={3}>
                Revenue: {movieDetails.revenue}$
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"}
                flexDirection="row"
                flexWrap="wrap"
                justifyContent={"space-between"}>
          <Button variant="outlined" style={{marginTop:'20px'}} onClick={() => handleAddTofavorites()}>Add To Favorites</Button>
          <Button variant="outlined" style={{marginTop:'20px'}} onClick={() => navigate('/favorites')}>See My Favorites</Button>
          </Box>
          <Button style={{marginTop:'20px'}} variant="outlined" onClick={() => fetchSimilarMovieData()}>
            {showSimilarMovies ? "hide" : "Show Similar Movies"}
          </Button>
          {showSimilarMovies ? (
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-around"
              marginTop={2}
            >
              {similarmoviesDetails?.map((movie) => (
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
                    <Box display="flex" flexDirection={'column'} justifyContent="center" alignItems={'center'}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }} mb={1}>
                        {movie.title}
                      </Typography>
                      <Button variant="outlined" onClick={getMovieID} data-title={movie.title}>More Details</Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <br />
          )}
          <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        </Box>
      </Container>
    </div>
  );
};

export default MovieDetails;
