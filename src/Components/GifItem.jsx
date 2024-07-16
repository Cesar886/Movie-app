import { MantineProvider, SimpleGrid } from "@mantine/core"
import { Badge, Button, Card, Group, Text, Image, Modal } from '@mantine/core';
import { Props } from "../utils/props";
import { useDisclosure } from '@mantine/hooks';


export const GifItem = ({ title, url, id, desc, rate }) => {

    const [opened, { open, close }] = useDisclosure(false);


  return (
        <MantineProvider>
            <SimpleGrid cols={1} spacing="lg">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section component="a">
                        <Image
                        src={ url }
                        height={450}
                        alt={ title }
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{ title }</Text>
                        <Badge color="blue">{ rate }</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        <Props desc={ desc } maxWords={5} />
                        {/* {desc} */}
                        
                    </Text>

                    <Modal opened={opened} onClose={close} >
                        <Text> jkdjdjdjj</Text>
                    </Modal>

                    <Button onClick={open}>Open Modal</Button>

                </Card>
            </SimpleGrid>
        </MantineProvider>
    )
}
