import { Badge, Card, Group, Image, MantineProvider, SimpleGrid, Text } from '@mantine/core'
import './pelicula.css'


export const Pelicula = ({ title, url, id, desc, rate }) => {
    
  return (
    <MantineProvider>
      <SimpleGrid cols={1} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section component="a">
            <Image src={url} height={450} alt={title} />
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
  )
}


