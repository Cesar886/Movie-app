import { Flex, MantineProvider, RingProgress, SimpleGrid } from "@mantine/core"
import { Button, Card, Text, Image } from '@mantine/core';
import { Props } from "../utils/props";
import { useNavigate } from "react-router-dom";



export const GifItem = ({ title, url, id, desc, rate }) => {

    // const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate();
    // const [loading, { toggle }] = useDisclosure();



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
                    <Flex
                        mb="xs"
                        mt="md"
                        gap="md"
                        justify="space-between"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                        >

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
                    </Flex>
                    <Text size="sm" c="dimmed">
                        <Props desc={ desc } maxWords={5} />
                        {/* {desc} */}
                        
                    </Text>

                    <Button onClick={ info } mt={10} variant="light">
                        Ver mass
                    </Button>
                </Card>
            </SimpleGrid>
        </MantineProvider>
    )
}
