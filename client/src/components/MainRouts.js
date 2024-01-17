import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchMovie from './SearchMovie'
import MovieDetails from './MovieDetails'
import WelcomePage from './WelcomePage'
import SignUp from './SignUp'
import Favorites from './Favorites'

const MainRouts = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<WelcomePage/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/moviesearch' element={<SearchMovie/>}></Route>
            <Route path='/moviedetails' element={<MovieDetails/>}></Route>
            <Route path='/favorites' element={<Favorites/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default MainRouts