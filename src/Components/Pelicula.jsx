import { Badge, Button, Card, Group, Image, MantineProvider, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";


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
            </Group>

            <Text size="sm" color="dimmed">
              {movieData.overview}
            </Text>
          </Card>
        ) : (
          <Text>Cargando...</Text>
        )}



        <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a" href="https://mantine.dev/">
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button>
            </Card>
      </SimpleGrid>
    </MantineProvider>
  );
};
