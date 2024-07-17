import { useEffect, useState } from "react";
import { Badge, Button, Card, Group, Image, MantineProvider, RingProgress, SimpleGrid, Text } from "@mantine/core";
import './pelicula.css'


const apiKey = "abf7d734dcd7cce557ecf0abc3a863bf";

export const Pelicula = ({ title, url, id, desc, rate }) => {
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
    <MantineProvider>
      <SimpleGrid cols={1} spacing="lg">
        {movieData ? (
          <Card
            key={movieData.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[0],
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
            })}
          >
            <Card.Section component="a">
                <Image src={`https://image.tmdb.org/t/p/w500${ movieData.poster_path }`} height={450} alt={movieData.title} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text weight={500}>{movieData.title}</Text>
              <Badge color="blue">{movieData.vote_average}</Badge>
              <RingProgress
                sections={[{ value: 40, color: 'blue' }]}
                label={
                  <Text c="blue" fw={700} ta="center" size="xl">
                    40%
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
      </SimpleGrid>
    </MantineProvider>
  );
};
