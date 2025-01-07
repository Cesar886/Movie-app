import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Authentication';
import { Pelicula } from "./Components/Pelicula";

export default function App({ id }) {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movie/:id' element={<Pelicula />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
