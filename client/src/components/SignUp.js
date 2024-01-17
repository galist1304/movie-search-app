import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState({});
  const [token, setToken] = useState(null);

  const navigate = useNavigate("");

  const handleSignUp = (event) => {
    event.preventDefault();
    setUserInput((prevData) => ({ ...prevData, email, password }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userInput.email !== undefined && userInput.password !== undefined) {
        try {
          const response = await axios.post(
            "http://localhost:3001/users",
            userInput
          );
          setToken(response.data.token);
          console.log(response.data.token);
        } catch (error) {
          if(error.response.data.code === 11000){
            toast.error("Email already in system!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else{
            toast.error("Password must be more than 3 characters!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          
          console.log(error);
        }
      }
    };

    fetchUserDetails();
  }, [userInput]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/moviesearch");
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="body2">
              Already have an account? Log In
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
