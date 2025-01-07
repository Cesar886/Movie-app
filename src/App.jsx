import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import { Pelicula } from "./Components/Pelicula";
import { Ver } from "./Components/Ver";

export default function App({ id }) {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/:id' element={<Pelicula />} />
          <Route path='/:id/:ver' element={<Ver />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
