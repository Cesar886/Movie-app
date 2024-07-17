import { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Group, Image, MantineProvider, RingProgress, SimpleGrid, Text } from "@mantine/core";
import './pelicula.css';

const apiKey = "abf7d734dcd7cce557ecf0abc3a863bf";

export const Pelicula = ({ id }) => {
  const [movieData, setMovieData] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}`);
      const data = await response.json();
      setMovieData(data);
      console.log("🚀 ~ fetchMovies ~ data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  return (
    <Container>
      {movieData ? (
        <Card
          key={movieData.id}
          shadow="sm"
          padding="xl"
          radius="xl"
        >
          <Card.Section component="a">
            <Image 
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} 
              height={450} 
              alt={movieData.title} 
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{movieData.title}</Text>
            <RingProgress
              sections={[{ value: movieData.vote_average * 10, color: 'blue' }]}
              size={70}
              thickness={6}
              label={
                <Text color="blue" weight={700} align="center" size={12}>
                  {movieData.vote_average}
                </Text>
              }
            />
          </Group>

          <Text size="sm" color="dimmed">
            {movieData.overview}
          </Text>
        </Card>
      ) : (
        <Text>Cargando...</Text>
      )}
    </Container>
  );
};
