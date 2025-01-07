import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Button,
  Text,
  Image,
  RingProgress,
  Card,
  Badge,
  Flex,
  Modal,
  Group,
  Input,
  PasswordInput
} from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import ReactPlayer from 'react-player';
import { IconAt } from '@tabler/icons-react';

const apiKey = 'abf7d734dcd7cce557ecf0abc3a863bf';
const idioma = '?language=es-ES';

export const Ver = () => {
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
  const [showModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}${idioma}&api_key=${apiKey}`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (params.id) {
      fetchMovies();
    }
  }, [params.id]);

  const porcentaje = ((movieData.vote_average || 0) * 10).toFixed(1);

  const handleProgress = (progress) => {
    if (progress.played >= 0.1 && isPlaying) {
      setIsPlaying(false); // Pausar el video
      openModal(); // Mostrar modal de registro
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f9fafc' }}>
      {/* Fondo */}
      <Image
        src="../../docs/moview.jpeg"
        alt="movie"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(0.6)',
        }}
      />

      <Container size="90%" px="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Reproductor de video */}
        <div style={{ marginBottom: '2rem', position: 'relative', paddingTop: '56.25%' }}>
          <ReactPlayer
            url={'../../Universal.mp4'}
            className="react-player"
            playing={isPlaying}
            controls
            onProgress={handleProgress}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>

        {/* Información de la película */}
        {movieData && (
          <Card withBorder shadow="lg" radius="md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem' }}>
            <Flex
              direction="column"
              gap="lg"
              align="flex-start"
              style={{ color: '#333' }}
            >
              <Title
                order={1}
                style={{ fontSize: '2.5rem', color: '#333', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                {movieData.title}
              </Title>
              <Text
                mt="md"
                style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}
              >
                {movieData.overview}
              </Text>

              <Flex
                direction="row"
                wrap="wrap"
                gap="lg"
                align="center"
                justify="space-between"
                style={{ width: '100%' }}
              >
                <RingProgress
                  roundCaps
                  size={80}
                  thickness={10}
                  sections={[{ value: movieData.vote_average * 10, color: 'blue' }]}
                  label={
                    <Text color="blue" fw={500} align="center" size="sm">
                      {porcentaje}%
                    </Text>
                  }
                />
                <Text style={{ fontSize: '1rem', color: '#555' }}>
                  Fecha de lanzamiento: {movieData.release_date}
                </Text>
                <Flex gap="sm" wrap="wrap">
                  {movieData.genres?.map((genre) => (
                    <Badge key={genre.id} color={getBadgeColor(genre.name)}>
                      {genre.name}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
              
              <Modal opened={showModal} onClose={closeModal} title="Iniar sesion" centered>
                <Text>Debes registrar una cuenta gratis para continuar viendo</Text>
                
              <Input placeholder="Correo electronico" leftSection={<IconAt size={16} />} />
              <PasswordInput placeholder="Input component" />
              Registro rápido!
              Se tarda menos de 1 minuto en registrarse y luego puede disfrutar de películas y series ilimitados.

              </Modal>
            </Flex>
          </Card>
        )}
      </Container>
    </div>
  );
};
