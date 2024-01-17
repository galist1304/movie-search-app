import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    const navigate = useNavigate('')

    useEffect(() => {
        const fetchFavorites = async() => {
            try {
                const {data} = await axios.get('http://localhost:3001/movies', {
                headers: {
                    'x-api-key': localStorage.getItem('token')
                }
            })
            setFavorites(data)
            console.log(data);
            } catch (error) {
                navigate('/')
                console.log(error);
            }
            
        }
        fetchFavorites()
    }, [])
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
        <Typography textAlign={'center'} variant="h2">My Favorite Movies</Typography>
        <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-around"
              marginTop={2}
            >
              {favorites?.map((movie) => (
                <Card
                  key={movie._id}
                  style={{
                    width: "250px",
                    margin: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.img_url}`}
                  />
                  <CardContent>
                    <Box display="flex" flexDirection={'column'} justifyContent="center" alignItems={'center'}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }} mb={1}>
                        {movie.title}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box display={'flex'} justifyContent={'center'} m={4}>
            <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
            </Box>
      </Container>
    </div>
  );
};

export default Favorites;
