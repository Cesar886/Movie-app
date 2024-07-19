import { useEffect, useState } from 'react';
import { SimpleGrid, Container } from '@mantine/core';
import { GifItem } from './GifItem';
import { AddCategory } from './AddCategory';
import trimText from "../helpers/trimText";

export default function Home() {
  const [categories, setCategories] = useState([' ']);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // const [opened, { open, close }] = useDisclosure(false);


  const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  
  useEffect(() => { 
    fetch(popularUrl)
      .then(response => response.json())
      .then(data => {
        // console.log("🚀 ~ useEffect ~ data:", data)
        setPopularMovies(data.results);
      })
      .catch(error => {
        console.error("Syntax Error ", error);
      });
  }, [ ]);

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
    <Container size='90%'>
      <AddCategory  
        onNewCategory={(event) => onAddCategory(event)}
      />

      <SimpleGrid cols={5} spacing="lg">
        {!isSearching ? (
          popularMovies.map((movie) => (
            <GifItem
              id={movie.id}
              key={movie.id}
              title={movie.title}
              url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              desc={trimText(movie.overview, 20)}
              rate={movie.vote_average}
              genero={ movie.genres }
            />
          ))
        ) : (
          searchResults.map((movie) => (
            <GifItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              desc={trimText(movie.overview, 5)}
              rate={movie.vote_average}
              genero={ movie.genres }
            />
          ))
        )}
      </SimpleGrid>
    </Container>
  );
}
