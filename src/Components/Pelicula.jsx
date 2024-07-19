import { useEffect, useState } from 'react';
import { Container, Title, Button, Text, Image, RingProgress, Card, Badge, Flex, Modal, Group, SimpleGrid } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import  classes  from './pelicula.module.css';
import { useDisclosure } from '@mantine/hooks';


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
  const [opened, { open, close }] = useDisclosure(false);
  
  // const { classes } = useStyles();
  
  return (
    
    <Container size='80%'>
      {movieData && (
        <div className={classes.inner}>
          <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className={classes.image} />
          <div className={classes.content}>
          <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            // wrap="wrap"
            // rowGap='xl'
          >
            <Container size='55%'>
              <Title className={classes.title}>
                <span>{movieData.title}</span>
              </Title>
              <Text c="dimmed" mt="md">
                {movieData.overview}
              </Text>
              <Modal opened={opened} onClose={close} withCloseButton={false}>
                Suscribasee
              </Modal>
              <Button onClick={open} variant='light' mt='md' radius='lg' leftSection={<IconPlayerPlay size={14} />}>Ver ahora</Button>
            </Container>
            <Container size={8000}>
              <Card withBorder p="lg" radius="md" className={classes.card} mt='lg'>
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
              </Card>
            </Container>
          </Flex>
          </div>
        </div>
      )}
      <Container withBorder shadow="sm" padding="lg">
        <SimpleGrid cols={4} spacing="lg">
          {movieData.production_companies && movieData.production_companies.map((company, index) => (
            company.logo_path && (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" href="https://mantine.dev/">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    height={160}
                    // alt={company.name}
                    />
                </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{company.name}</Text>
                  <Badge color="pink">{ company.origin_country }</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  LOrem ipsum dolor sit amet
                </Text>
                <Button color="blue" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
            )
          ))}
        </SimpleGrid>
      </Container>
    </Container>
   
  );
};
