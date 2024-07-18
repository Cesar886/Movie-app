import { useEffect, useState } from 'react';
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem, Image, RingProgress, Card, Badge, Flex, useStyles } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
// import classes from './pelicula.module.css';
import  classes  from './pelicula.module.css';

const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';
const idioma = '?language=es-ES';

export const Pelicula = () => {

  const genreColors = {
    Acción: 'red',
    Comedia: 'orange',
    Drama: 'lime',
    Terror: 'purple',
    Romance: 'pink',
    SciFi: 'blue',
    Animación: 'violet',
    Familia: 'green',
    Aventura: 'cyan',
  };
  const getBadgeColor = (genreName) => genreColors[genreName] || 'blue';

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
  // const { classes } = useStyles();

  return (
  
    <Container size="md">
      {movieData && (
        <div className={classes.inner}>
          <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>
              <span>{movieData.title}</span>
            </Title>
            <Text c="dimmed" mt="md">
              {movieData.overview}
            </Text>
            <Card withBorder p="xl" radius="md" className={classes.card} mt='lg'>
              <div className={classes.iner}>
                <div className={classes.content}>
                  <div className={classes.leftContent}>                 
                    <Flex
                      // mih={0}
                      // bg="rgba(0, 0, 0, .3)"
                      gap={12}
                      justify="flex-start"
                      align="center"
                      direction="row"
                      wrap="wrap"
                    >
                    <Text fz="xl" className={classes.label}>
                      Vista General
                    </Text>
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
                    </Flex>

                    <div>
                      <Text className={classes.lead} mt={30}>
                        {movieData.release_date}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        Fecha de lanzamiento:
                      </Text>
                    </div>
                  </div>
                  <div>
                      <Text className={classes.lead} mt={30}>
                        Géneros
                      </Text>
                      <div className={classes.genreList}>
                        {movieData.genres && movieData.genres.map(genre => (
                          <Badge
                          variant='light'
                            key={genre.id}
                            color={getBadgeColor(genre.name)}
                            m={10}
                            // className={classes.genreBadge}
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>  
                </div>
              {/* </div> */}
            </Card>
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
        </div>
      )}



   </Container>
   
  );
};
