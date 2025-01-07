import { useEffect, useState } from 'react';
import { Container, Title, Button, Text, Image, RingProgress, Card, Badge, Flex, Modal, Group, SimpleGrid } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
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
  // const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}${idioma}&api_key=${apiKey}`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.id) {
      fetchMovies();
    }
  }, [params.id]);

  const porcentaje = ((movieData.vote_average || 0) * 10).toFixed(1);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f9fafc' }}>
      {/* Fondo */}
      <Image
        src="../../docs/moview.jpeg"
        alt="movie"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(0.6)",
        }}
      />

      <Container size="90%" px="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {movieData && (
          <Flex
            direction={{ base: "column", md: "row" }}
            gap="lg"
            align="flex-start"
            justify="center"
            style={{ marginBottom: '2rem' }}
          >
            {/* Portada */}
            <div style={{ flexShrink: 0, maxWidth: '100%', textAlign: 'center' }}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title}
                width="100%"
                style={{
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>

            {/* Contenido */}
            <div style={{ flex: 1 }}>
              <Title order={1} style={{ fontSize: '2.5rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {movieData.title}
              </Title>
              <Text color="dimmed" mt="md" style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {movieData.overview}
              </Text>
              <Button
                onClick={() => navigate(`/${params.id}/ver`)}
                variant="light"
                mt="lg"
                radius="lg"
                leftSection={<IconPlayerPlay size={14} />}
              >
                Ver ahora
              </Button>
              {/* <Modal opened={opened} onClose={close} withCloseButton={false} title="Suscríbase">
                ¡Próximamente disponible!
              </Modal> */}

              {/* Información Extra */}
              <Card mt="lg" withBorder shadow="lg" radius="md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  gap="lg"
                  align="center"
                  justify="space-between"
                >
                  <RingProgress
                    roundCaps
                    size={70}
                    thickness={8}
                    sections={[{ value: movieData.vote_average * 10, color: 'blue' }]}
                    label={
                      <Text color="blue" fw={500} align="center" size="sm">
                        {porcentaje}%
                      </Text>
                    }
                  />
                  <Text>Fecha de lanzamiento: {movieData.release_date}</Text>
                  <Flex gap="sm" wrap="wrap">
                    {movieData.genres?.map((genre) => (
                      <Badge key={genre.id} color={getBadgeColor(genre.name)}>
                        {genre.name}
                      </Badge>
                    ))}
                  </Flex>
                </Flex>
              </Card>
            </div>
          </Flex>
        )}

        {/* Compañías de Producción */}
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 },
          ]}
        >
          {movieData.production_companies?.map((company) => (
            company.logo_path && (
              <Card key={company.id} withBorder shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
                <Card.Section>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    height={150}
                    fit="contain"
                    alt={company.name}
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text fw={500}>{company.name}</Text>
                  <Badge>{company.origin_country}</Badge>
                </Group>
                <Button fullWidth radius="md" variant="light">
                  Saber más
                </Button>
              </Card>
            )
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};
