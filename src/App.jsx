import './App.css'
import { useEffect, useState } from 'react';
import { MantineProvider, SimpleGrid } from '@mantine/core';
import { GifItem } from './Components/GifItem';
import { AddCategory } from './Components/AddCategory';

export default function BasicAppShell() {
  const [categories, setCategories] = useState([' ']);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  
  useEffect(() => { 
    fetch(popularUrl)
      .then(response => response.json())
      .then(data => {
        setPopularMovies(data.results);
      })
      .catch(error => {
        console.error("Syntax Error ", error);
      });
  }, []);

  const fetchMovies = (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results);
        setIsSearching(true);
      })
      .catch(error => {
        console.error("Syntax Error ", error);
      });
  };

  const onAddCategory = (onNewCategory) => {
    if (categories.includes(onNewCategory)) return;
    setCategories([onNewCategory, ...categories]);
    fetchMovies(onNewCategory);
  };

  return (
    <MantineProvider>
      <>
        <AddCategory  
          onNewCategory={(event) => onAddCategory(event)}
        />

        <SimpleGrid cols={6} spacing="lg">
          {!isSearching ? (
            popularMovies.map((movie) => (
              <GifItem
                key={movie.id}
                title={movie.title}
                url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                desc={movie.overview}
                rate={movie.vote_average}
              />
            ))
          ) : (
            searchResults.map((movie) => (
              <GifItem
                key={movie.id}
                title={movie.title}
                url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                desc={movie.overview}
                rate={movie.vote_average}
              />
            ))
          )}
        </SimpleGrid>
      </>
    </MantineProvider>
  );
}
