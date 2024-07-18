import { useEffect, useState } from 'react';
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem, Image, RingProgress, Card, useMantineTheme, Badge } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
// import classes from './pelicula.module.css';
import  classes  from './pelicula.module.css';

const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';
const idioma = '?language=es-ES';

export const Pelicula = () => {

  // const theme = useMantineTheme();
  // const completed = 1887;
  // const total = 2334;
  // const stats = [
  //   { value: 447, label: 'Remaining' },
  //   { value: 76, label: 'In progress' },
  // ];
  // const items = stats.map((stat) => (
  //   <div key={stat.label}>
  //     <Text className={classes.label}>{stat.value}</Text>
  //     <Text size="xs" c="dimmed">
  //       {stat.label}
  //     </Text>
  //   </div>
  // ));

  const [movieData, setMovieData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}${idioma}&api_key=${apiKey}`);
        const data = await response.json();
        setMovieData(data);
        console.log("🚀 ~ fetchMovies ~ data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.id) {
      fetchMovies();
    }
  }, [params.id]);

  const numero = Math.round(movieData.vote_average * 100);
  const porcentaje = (numero / 10).toFixed(1);

  return (
  
    <Container size="md">
      {movieData && (
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span>{movieData.title}</span>
            </Title>
            <Text c="dimmed" mt="md">
              {movieData.overview}
            </Text>
            <Text>
              <b>Fecha de lanzamiento:</b> {movieData.release_date}
            </Text>
            {movieData.vote_average && (
              <RingProgress
                size={70}
                thickness={8}
                sections={[{ value: movieData.vote_average * 10, color: 'blue' }]}
                label={
                  <Text c="blue" fw={500} ta="center" size={10}>
                    {porcentaje}%
                  </Text>
                }
              />
            )}
            <b>Géneros:</b>
            {movieData.genres && movieData.genres.map(genre => <p key={genre.id}>{genre.name}</p>)}
            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>based</b> – build type safe applications, all components and hooks export types
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you can use Mantine in any project
              </List.Item>
              <List.Item>
                <b>No annoying focus ring</b> – focus ring will appear only when user navigates with keyboard
              </List.Item>
            </List>
            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Dar Like
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Suscribirse
              </Button>
            </Group>
          </div>
          <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className={classes.image} />
        </div>
      )}

    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.iner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Vista General
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {movieData.release_date}
            </Text>
            <Text fz="xs" c="dimmed">
              Fecha de lanzamiento:
            </Text>
          </div>

          <div>
            <Text className={classes.lead} mt={30}>
              Géneros
            </Text>
            <div className={classes.genreList}>
              {movieData.genres && movieData.genres.map(genre => (
                <Badge key={genre.id} color="blue" className={classes.genreBadge}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className={classes.ring}>
            <RingProgress
              roundCaps
              size={70}
              thickness={8}
              sections={[{ value: movieData.vote_average * 10, color: 'blue' }]}
              label={
                <Text c="blue" fw={500} ta="center" size={10}>
                  {porcentaje}%
                </Text>
              }
            />
          </div>
        </div>
      </div>
    </Card>
   </Container>
   
  );
};
