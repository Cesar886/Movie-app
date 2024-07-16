import { Badge, Card, Group, Image, MantineProvider, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const apiKey = "abf7d734dcd7cce557ecf0abc3a863bf";

export const Pelicula = ({ title, url, id, desc, rate }) => {
  const [movieData, setMovieData] = useState({});

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}`);
      const data = await response.json();
      setMovieData(data);
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
        <Card
          key={id}
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
            {url ? (
              <Image src={url} height={450} alt={title} />
            ) : (
              <Image src="fallback-image.jpg" height={450} alt={title} />
            )}
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text weight={500}>{title}</Text>
            <Badge color="blue">{rate}</Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {desc}
          </Text>
        </Card>
      </SimpleGrid>
    </MantineProvider>
  );
};