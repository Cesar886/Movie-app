// import React from 'react';
import { Card, Group, Text, Image, MantineProvider, Box, Collapse, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './movie.css';

export default function Movie() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineProvider>
      <Card className="movie-card" shadow="sm" withBorder>
        <Card.Section withPadding py="xs">
          <Group justify="center">
            {/* Aquí puedes colocar otros elementos dentro del Group si es necesario */}
          </Group>
        </Card.Section>

        <Card.Section withPadding mt="sm" style={{ backgroundColor: 'white'}}>
          <Image
            className="movie-poster"
            src="https://i.etsystatic.com/41234894/r/il/b89166/5855499503/il_fullxfull.5855499503_qy9e.jpg"
            alt="Movie Poster"
            style={{ width: '200px', margin: '0 auto' }}
          />
        </Card.Section>

        <Group justify="center" mt="md">
          <Text className="movie-subtitle" weight={500} size="md" align="center">Kung Fu Panda</Text>
        </Group>

        <Box mx="auto" style={{ backgroundColor: 'white', color: 'black' }}>
          <Group justify="center" style={{ backgroundColor: 'white', color: 'black' }} >
            <Button onClick={toggle} color='black'>Ver descripción completa</Button>
          </Group>

          <Collapse in={opened} >
            <Text style={{ backgroundColor: 'white', marginTop: '10px' }}>
              Antes de que se dé cuenta, el destino de Po le escoge para hacer realidad su sueño y, de paso, salvar el valle del malísimo Tai Lung. Po sólo es un principiante, pero no está dispuesto a rendirse, y demostrará a sus detractores que están equivocados.
            </Text>
          </Collapse>
        </Box>
      </Card>





      

      
    </MantineProvider>
  );
}
