// src/App.jsx
import './App.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import { Pelicula } from "./Components/Pelicula";

export default function App({ id }) {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} exact />
          <Route path={`/movie/${id}`} element={<Pelicula />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
