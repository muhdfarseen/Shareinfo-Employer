import { Title, Card, Select, Text, Modal, Image, SimpleGrid, Button, Group, Box, FileInput, Badge, ActionIcon, Flex, Radio, Switch, Pill } from '@mantine/core';
import { ApplicantProfile } from './ApplicantProfile';
import { useDisclosure } from '@mantine/hooks';


const data = [
    {
        name: "John Doe",
        location: "New York, USA",
        image: "https://via.placeholder.com/150",
        skills: "JavaScript, React, Node.js",
    },

    {
        name: "Michael Wilson",
        location: "Berlin, Germany",
        image: "https://via.placeholder.com/150",
        skills: "C++, Unreal Engine, Game Development",
    },
    {
        name: "Sarah Johnson",
        location: "San Francisco, USA",
        image: "https://via.placeholder.com/150",
        skills: "Ruby on Rails, PostgreSQL, Backend Development",
    },
    {
        name: "David Lee",
        location: "Seoul, South Korea",
        image: "https://via.placeholder.com/150",
        skills: "Kotlin, Android Development, Mobile Apps",
    },
    {
        name: "Laura Kim",
        location: "Tokyo, Japan",
        image: "https://via.placeholder.com/150",
        skills: "Swift, iOS Development, UI/UX Design",
    },
    {
        name: "James White",
        location: "Paris, France",
        image: "https://via.placeholder.com/150",
        skills: "PHP, Laravel, Full Stack Development",
    },

];


export const Shortlisted = () => {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Flex align={"center"} justify={"space-between"} >
                <Title order={3} >Shortlisted Candidates</Title>
                <Select
                    size='xs'
                    placeholder="Select Job"
                    data={['UI Designer', 'SDE 2', 'Java Developer', 'DevOps']}
                />
            </Flex>

            <Card radius={"md"} mt={10}>

                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 3 }}
                    spacing={{ base: 'md', sm: 'md' }}
                    verticalSpacing={{ base: 'md', sm: 'md' }}
                >
                    {data.map((item, index) => (
                        <Card key={index} onClick={open} className='hoverclassscale' radius={"lg"} withBorder >
                            <Flex gap={10} key={index} align="flex-start">
                                <Image radius={"xl"} h={50} w={50} src={item.image} alt={item.name} />
                                <Flex gap={3} direction="column">
                                    <Text fw={700} >{item.name}</Text>
                                    <Text size='sm' c={"dimmed"} >{item.location}</Text>
                                    <Pill>{item.skills}</Pill>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}

                </SimpleGrid>


            </Card>

            <Modal opened={opened} size="100%" onClose={close} title="Authentication" centered>
                <ApplicantProfile />
            </Modal>

        </>

    )
}
