import React, { useEffect, useState } from 'react'
import { Title, Skeleton, Card, Select, Text, Modal, Image, SimpleGrid, Button, Group, Box, FileInput, Badge, ActionIcon, Flex, Radio, Switch, Pill } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ApplicantProfile } from './ApplicantProfile';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../Helpers/axios";
import {
    IconPasswordUser,
    IconExternalLink,
    IconBriefcase,
    IconShieldCheck,
    IconListSearch,
  } from "@tabler/icons-react";


const data = [
    {
        name: "John Doe",
        location: "New York, USA",
        image: "https://via.placeholder.com/150",
        skills: "JavaScript, React, Node.js",
    },
];


export const AllApplicants = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [selectedJobId, setselectedJobId] = useState("");
    const [selectedJobName, setselectedJobName] = useState("");

    const [applicationId, setApplicationId] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await axiosInstance.get("/job-list/", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              });
            setJobs(response.data);
            // console.log(response.data);
          } catch (error) {
            toast.error("Error fetching jobs");
          }
        };
    
        fetchJobs();
      }, []);

      const fetchApplicantsForJob = async (jobId) => {
        setselectedJobId(jobId);
        try {
          const response = await axiosInstance.get(`/specific-job/${jobId}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setApplicants(response.data.applications); 
          console.log(response.data.applications);
        } catch (error) {
          toast.error('Error fetching applicants');
          console.error('Error fetching applicants for job:', error);
        }
      };

      console.log(applicationId);

    return (
        <>
            <ToastContainer position="top-center" />

            <Flex align={"center"} justify={"space-between"} >
                <Title order={3} >All Applicants</Title>
                <Select
                    size='xs'
                    placeholder="Select Job"
                    searchable
                    data={jobs.map((item) => ({
                        value: String(item.job_id), 
                        label: item.job_title,
                      }))}
                    onChange={(value) => {
                        fetchApplicantsForJob(value)
                        setselectedJobName(jobs.find((item) => item.job_id === value).job_title)

                    }}
                />
            </Flex>

            {
                !selectedJobName &&
                <Flex pt={50} align={"center"} justify={"center"} direction={"column"} gap={5} >
                    <IconListSearch color="gray" size={18} />
                    <Text c={"dimmed"} size={"sm"} >Select Job from dropdown</Text>
                </Flex>
            }
            {selectedJobName && (
              <>
                <Card my={10} radius="md">
                  <Flex align="center" justify="space-between">
                    <Group align="center">
                      <IconBriefcase color="blue" size={18} />
                      <Text fw={700}>{selectedJobName}</Text>
                    </Group>
                    <Flex align={"center"} gap={5}>
                      <Text size="xs" c="dimmed">
                        Total Applicant :
                      </Text>
                      <Badge variant="light">{applicants.length}</Badge>
                    </Flex>
                  </Flex>
                </Card>

                  <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 3 }}
                    spacing={{ base: "md", sm: "md" }}
                    verticalSpacing={{ base: "md", sm: "md" }}
                  >
                    {applicants.map((applicant, index) => (
                      <Card
                        key={index}
                        onClick={() => {
                            setApplicationId(applicant.application_id.replace("#", ""));
                            open();
                        }}
                        className="hoverclassscale"
                        radius="md"
                      
                      >
                        <Flex gap={15} align="flex-start">
                          <Image
                            radius="md"
                            h={50}
                            w={50}
                            src={
                              applicant.profile_photo ||
                              "https://via.placeholder.com/150"
                            }
                            alt={applicant.name}
                          />
                          <Flex gap={3} direction="column">
                            <Flex gap={5} align={"center"}>
                              <Text fw={700}>{applicant.name}</Text>
                            </Flex>

                            <Text size="xs" color="dimmed">
                              {applicant.current_position} at{" "}
                              {applicant.current_organization}
                            </Text>

                            <Text size="xs" color="dimmed">
                              {`${applicant.city}, ${applicant.state}`}
                            </Text>
                            <Flex wrap={"wrap"} gap={8}>
                              {applicant.skills.map((skill, idx) => (
                                <Pill key={idx} size="xs">
                                  {skill}
                                </Pill>
                              ))}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Card>
                    ))}
                  </SimpleGrid>

                <Modal
                  opened={opened}
                  size="100%"
                  onClose={close}
                  title="Authentication"
                  centered
                >
                  <ApplicantProfile applicationId={applicationId} />
                </Modal>
              </>
            )}
        </>
            

    )
}
