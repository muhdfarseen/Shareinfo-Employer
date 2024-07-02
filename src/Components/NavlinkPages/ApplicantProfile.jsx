import React, { useEffect, useState } from "react";
import {
    Card,
    Text,
    Group,
    Flex,
    Avatar,
    Title,
    Button,
    Pill,
    ActionIcon,
    ThemeIcon,
    Badge
} from "@mantine/core";
import { IconChevronLeft, IconClipboard, IconCertificate, IconSettings2, IconFileTypePdf, IconMessage } from '@tabler/icons-react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../Helpers/axios";

export const ApplicantProfile = ({ applicationId }) => {
    const [applicantDetails, setApplicantDetails] = useState(null);

    useEffect(() => {
        const fetchApplicantDetails = async () => {
            try {
                const response = await axiosInstance.get(`/specific-student/${applicationId}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                setApplicantDetails(response.data);
                console.log("response of in modal", response.data);
            } catch (error) {
                toast.error("Error fetching jobs");
                console.error("Error fetching jobs:", error);
            }
        };

        fetchApplicantDetails();
    }, [applicationId]);

    if (!applicantDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <Flex gap={10} mb={20} align={"center"}>
                <ActionIcon size="lg" radius="xl" variant="default" aria-label="Settings">
                    <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Title order={3}>Candidate Profile</Title>
            </Flex>

            <Flex wrap={'wrap'} gap={20} justify={"space-between"} direction={"row"}>

                <Card w={{ base: "100%", xs: "100%", sm: "100%", md: "30%" }} radius={"lg"} withBorder>
                    <Flex gap={20}>
                        <Avatar size={"xl"} src={"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"} />
                        <Flex justify={"flex-end"} align={"flex-start"} direction={"column"}>
                            <Title order={4}>{applicantDetails.candidateprofile.full_name}</Title>
                            <Text size='sm' c={"dimmed"}>{applicantDetails.candidateprofile.current_position}</Text>
                            <Group gap={5} mt={4}>
                                <Pill size='xs' radius={0} variant='default'>{applicantDetails.candidateprofile.current_organization}</Pill>
                            </Group>
                        </Flex>
                    </Flex>

                    <Group mt={20} gap={10} grow>
                        <Button variant='default' size='xs' leftSection={<IconFileTypePdf size={14} />} radius={"sm"} color='red'>
                            <a href={applicantDetails.cvresume_set[0].cv} target="_blank" rel="noopener noreferrer">Resume</a>
                        </Button>
                        <Button variant='default' size='xs' leftSection={<IconMessage size={14} />} radius={"sm"} color='blue'>Message Now</Button>
                    </Group>

                    <Text size='sm' mt={20} fw={600}>Summary</Text>
                    <Text size='sm' mt={10}>
                        {applicantDetails.summary ? applicantDetails.summary.summary || "No summary available" : "No summary available"}
                    </Text>

                    <Text size='sm' mt={20} fw={600}>Skills</Text>
                    <Group gap={5} mt={10}>
                        {applicantDetails.skills.map((skill, index) => (
                            <Pill key={index} size='xs' variant='default'>{skill}</Pill>
                        ))}
                    </Group>

                    <Text size='sm' mt={20} fw={600}>Academic & Placement Details</Text>
                    <Flex mt={10} gap={20}>
                        <Flex gap={5} direction={"column"}>
                            <Text size='sm'>Phone No.</Text>
                            <Text size='sm'>Email</Text>
                        </Flex>
                        <Flex gap={5} direction={"column"}>
                            <Text size='sm' fw={600}>: {applicantDetails.phone_no}</Text>
                            <Text size='sm' fw={600}>: {applicantDetails.email}</Text>
                        </Flex>
                    </Flex>
                </Card>

                <Card flex={1} radius={"lg"} withBorder>
                    <Flex wrap={'wrap'} gap={"sm"} direction={"row"}>
                        <Flex flex={1} gap={10} direction={"column"}>
                            <Text size='sm' fw={600}>Projects</Text>
                            {applicantDetails.project_set.map((project, index) => (
                                <Card key={index} radius={"lg"} withBorder>
                                    <Flex align={"flex-start"} gap={20} direction={"row"}>
                                        <ThemeIcon radius={"lg"} variant="light" color="indigo">
                                            <IconSettings2 style={{ width: '70%', height: '70%' }} />
                                        </ThemeIcon>
                                        <Flex direction={"column"}>
                                            <Text size='md' fw={600}>{project.pname}</Text>
                                            <Text size='sm' c={"dimmed"}>{project.role}</Text>
                                            <Text size='xs' c={"dimmed"}>
                                                {project.start_date} - {project.end_date || "Present"}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))}
                        </Flex>

                        <Flex flex={1} gap={10} direction={"column"}>
                            <Text size='sm' fw={600}>Certification and Licenses</Text>
                            {applicantDetails.certification_set.length === 0 ? (
                                <Text size='sm' c={"dimmed"}>No certifications available</Text>
                            ) : (
                                applicantDetails.certification_set.map((certification, index) => (
                                    <Card key={index} radius={"lg"} withBorder>
                                        <Flex align={"flex-start"} gap={20} direction={"row"}>
                                            <ThemeIcon radius={"lg"} variant="light" color="red">
                                                <IconCertificate style={{ width: '70%', height: '70%' }} />
                                            </ThemeIcon>
                                            <Flex direction={"column"}>
                                                <Text size='md' fw={600}>{certification.name}</Text>
                                                <Text size='sm' c={"dimmed"}>{certification.issuer}</Text>
                                                <Text size='xs' c={"dimmed"}>{certification.date}</Text>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                ))
                            )}
                        </Flex>

                        <Flex flex={1} gap={10} direction={"column"}>
                            <Text size='sm' fw={600}>Assessments</Text>
                            <Card radius={"lg"} withBorder>
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="yellow">
                                        <IconClipboard style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600}>Communication</Text>
                                        <Text size='sm' c={"dimmed"}>Score: {applicantDetails.communication_score || "N/A"}</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                            <Card radius={"lg"} withBorder>
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="yellow">
                                        <IconClipboard style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600}>Technical</Text>
                                        <Text size='sm' c={"dimmed"}>Score: {applicantDetails.technical_score || "N/A"}</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                            <Card radius={"lg"} withBorder>
                                <Flex align={"flex-start"} gap={20} direction={"row"}>
                                    <ThemeIcon radius={"lg"} variant="light" color="yellow">
                                        <IconClipboard style={{ width: '70%', height: '70%' }} />
                                    </ThemeIcon>
                                    <Flex direction={"column"}>
                                        <Text size='md' fw={600}>Aptitude</Text>
                                        <Text size='sm' c={"dimmed"}>Score: {applicantDetails.aptitude_score || "N/A"}</Text>
                                    </Flex>
                                </Flex>
                            </Card>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </>
    );
}
