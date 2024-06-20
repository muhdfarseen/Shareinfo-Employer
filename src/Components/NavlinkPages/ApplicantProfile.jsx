import React from 'react'
import {
    Card,
    Text,
    Group,
    Flex,
    Image,
    Badge,
    Title,
    Box,
    Center,
    SimpleGrid,
    Avatar,
    Stepper,
    Divider,
    Button,
    Pill,
    ActionIcon,
    ThemeIcon
} from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconClipboard, IconCertificate, IconSettings2, IconFileTypePdf, IconMessage } from '@tabler/icons-react';


export const ApplicantProfile = () => {
    return (
        <>
            <Flex gap={10} mb={20} align={"center"} >
                <ActionIcon size="lg" radius="xl" variant="default" aria-label="Settings">
                    <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Title order={3}>Candidate Profile</Title>
            </Flex>

            <Flex wrap={'wrap'} gap={20} justify={"space-between"} direction={"row"}  >

                <Card w={{ base: "100%", xs: "100%", sm: "100%", md: "30%" }} radius={"lg"} withBorder>
                    <Flex gap={20}>
                        <Avatar size={"xl"} src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"} />
                        <Flex justify={"flex-end"} align={"flex-start"} direction={"column"}>
                            <Title order={4}>Cristina John</Title>
                            <Text size='sm' c={"dimmed"} >UI UX Designer</Text>
                            <Group gap={5} mt={4}>
                                <Pill size='xs' radius={0} variant='default' >ECE</Pill>
                                <Pill size='xs' radius={0} variant='default'>2021-25</Pill>
                                <Pill size='xs' radius={0} variant='default'>S 6</Pill>
                                <Pill size='xs' radius={0} variant='default'>CE-TLY</Pill>
                            </Group>
                        </Flex>
                    </Flex>

                    <Group mt={20} gap={10} grow>
                        <Button variant='default' size='xs' leftSection={<IconFileTypePdf size={14} />} radius={"sm"} color='red'>Resume</Button>
                        <Button variant='default' size='xs' leftSection={<IconMessage size={14} />} radius={"sm"} color='blue'>Message Now</Button>
                    </Group>


                    <Text size='sm' mt={20} fw={600} >Summary</Text>
                    <Text size='sm' mt={10}>
                        Aspiring Electronics & Communication whiz, wiring the future with code and circuits.
                        Proficient in [mention relevant software/hardware tools]. Project experience in
                        [mention key project achievements]. Seeking opportunities to innovate and connect
                        the world.
                    </Text>
                    <Text size='sm' mt={20} fw={600} >Skills</Text>
                    <Group gap={5} mt={10}>
                        <Pill size='xs' variant='default' >C++</Pill>
                        <Pill size='xs' variant='default'>Python</Pill>
                        <Pill size='xs' variant='default'>Java</Pill>
                        <Pill size='xs' variant='default'>Golang</Pill>
                    </Group>
                    <Text size='sm' mt={20} fw={600} >Academic & Placement Details</Text>
                    <Flex mt={10} gap={20}>
                        <Flex gap={5} direction={"column"}>
                            <Text size='sm' >Current CGPA</Text>
                            <Text size='sm' >No. of BackLogs</Text>
                            <Text size='sm' >No. of Application Made</Text>
                        </Flex>
                        <Flex gap={5} direction={"column"}>
                            <Text size='sm' fw={600} >: 00</Text>
                            <Text size='sm' fw={600} >: 00</Text>
                            <Text size='sm' fw={600} >: 00</Text>
                        </Flex>
                    </Flex>



                </Card>

                <Card flex={1} radius={"lg"} withBorder>
                    <Flex wrap={'wrap'} gap={"sm"} direction={"row"}>
                        <Flex flex={1} gap={10} direction={"column"} >
                            <Text size='sm' fw={600} >Projects</Text>

                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="indigo">
                                        <IconSettings2 style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >Local Sellers E-Commerce App</Text>
                                        <Text size='sm' c={"dimmed"}  >UI/UX Designer</Text>
                                        <Text size='xs' c={"dimmed"}  >July 2023 - September 2023 (03 Months)</Text>

                                    </Flex>
                                </Flex>
                            </Card>

                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="indigo">
                                        <IconSettings2 style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >Local Sellers E-Commerce App</Text>
                                        <Text size='sm' c={"dimmed"}  >UI/UX Designer</Text>
                                        <Text size='xs' c={"dimmed"}  >July 2023 - September 2023 (03 Months)</Text>

                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>

                        <Flex flex={1} gap={10} direction={"column"} >
                            <Text size='sm' fw={600} >Certification and Licenses</Text>
                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="red">
                                        <IconCertificate style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >UX in Real world</Text>
                                        <Text size='sm' c={"dimmed"}  >Google Designer Academy</Text>
                                        <Text size='xs' c={"dimmed"}  >September 2022</Text>

                                    </Flex>
                                </Flex>
                            </Card>

                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="red">
                                        <IconCertificate style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >UI/UX Fundamentals</Text>
                                        <Text size='sm' c={"dimmed"}  >Udemy Inc.</Text>
                                        <Text size='xs' c={"dimmed"}  >July 2023 </Text>

                                    </Flex>
                                </Flex>
                            </Card>

                        </Flex>

                        <Flex flex={1} gap={10} direction={"column"} >
                            <Text size='sm' fw={600} >Assessments</Text>

                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="yellow">
                                        <IconClipboard style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >Introduction to GIT</Text>
                                        <Text size='sm' c={"dimmed"}  >Google Designer Academy</Text>
                                        <Text size='xs' c={"dimmed"}  >September 2022</Text>
                                        <Badge mt={4} variant='outline' color='green' >Done</Badge>
                                    </Flex>
                                </Flex>
                            </Card>

                            <Card radius={"lg"} withBorder >
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="yellow">
                                        <IconClipboard style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600} >Know about MARKDOWN</Text>
                                        <Text size='sm' c={"dimmed"}  >Google Designer Academy</Text>
                                        <Text size='xs' c={"dimmed"}  >September 2022</Text>
                                        <Badge mt={4} variant='outline' color='red' >Pending</Badge>
                                    </Flex>
                                </Flex>
                            </Card>

                        </Flex>
                    </Flex>

                </Card>


            </Flex>
        </>
    )
}
