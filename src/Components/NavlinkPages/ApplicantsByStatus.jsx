import React, { useEffect, useState } from "react";
import {
  Title,
  Card,
  Select,
  Text,
  Modal,
  Image,
  SimpleGrid,
  Button,
  Group,
  Box,
  FileInput,
  Badge,
  ActionIcon,
  Flex,
  Radio,
  Switch,
  Pill,
} from "@mantine/core";
import { ApplicantProfile } from "./ApplicantProfile";
import { useDisclosure } from "@mantine/hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Helpers/axios";

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

export const ApplicantsByStatus = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

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

  return (
    <>
      <ToastContainer position="top-center" />

      <Flex mb={10} align={"center"} justify={"space-between"}>
        <Title order={3}>Applicants by Status</Title>
        <Select
          size="xs"
          placeholder="Select Job"
          searchable
          data={jobs.map((item) => ({
            value: String(item.job_id),
            label: item.job_title,
          }))}
        />
      </Flex>

        {data.map((item, index) => (
          <Card
            key={index}
            onClick={open}
            radius={"lg"}
            withBorder
            mb={10}
          >
            <Flex gap={10} key={index} align="flex-start">
              <Image
                radius={"xl"}
                h={50}
                w={50}
                src={item.image}
                alt={item.name}
              />
              <Flex gap={3} direction="column">
                <Text fw={700}>{item.name}</Text>
                <Text size="sm" c={"dimmed"}>
                  {item.location}
                </Text>
                <Pill>{item.skills}</Pill>
              </Flex>
            </Flex>
          </Card>
        ))}

      <Modal
        opened={opened}
        size="100%"
        onClose={close}
        title="Authentication"
        centered
      >
        <ApplicantProfile />
      </Modal>
    </>
  );
};
