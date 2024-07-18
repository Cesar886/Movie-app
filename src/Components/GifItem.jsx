import { MantineProvider, RingProgress, SimpleGrid } from "@mantine/core"
import { Badge, Button, Card, Group, Text, Image, Modal } from '@mantine/core';
import { Props } from "../utils/props";
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";


export const GifItem = ({ title, url, id, desc, rate }) => {

    // const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate();

    const info = () => {
        navigate(`/movie/${id}`, { replace: true });
        console.log("🚀 ~ handleInfoClick ~ `/movie/${id}`:", `/movie/${id}`)
    };


  return (
        <MantineProvider>
            <SimpleGrid cols={1} spacing="lg">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section component="a">
                        <Image
                        src={ url }
                        height={450}
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Props desc={ title } maxWords={3} />
                        <RingProgress
                            sections={[{ value: rate * 10, color: 'blue' }]}
                            size={70}
                            thickness={8}
                            label={
                                <Text c="blue" fw={500} ta="center" size={10}>
                                    { rate }
                                </Text>
                            }
                        />
                    </Group>

                    <Text size="sm" c="dimmed">
                        <Props desc={ desc } maxWords={5} />
                        {/* {desc} */}
                        
                    </Text>

                    <Button onClick={ info }>
                        Ver mass
                    </Button>


                    {/* <Button opened={opened} onClose={close} withCloseButton={false}>
                        Ver mass.
                    </Button> */}

                    {/* <Modal opened={opened} onClose={close} withCloseButton={false} >
                        <Text> { desc } </Text>
                    </Modal> */}

                </Card>
            </SimpleGrid>
        </MantineProvider>
    )
}
