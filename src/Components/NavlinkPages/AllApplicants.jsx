import React, { useEffect, useState } from "react";
import {
  Title,
  Skeleton,
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
import { useDisclosure } from "@mantine/hooks";
import { ApplicantProfile } from "./ApplicantProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Helpers/axios";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import {
  IconPasswordUser,
  IconExternalLink,
  IconBriefcase,
  IconShieldCheck,
  IconListSearch,
} from "@tabler/icons-react";

const secretKey32 = import.meta.env.VITE_SECRET_KEY32;
const secretKey16 = import.meta.env.VITE_SECRET_KEY16;
const azureBlobUrl = import.meta.env.VITE_BLOBURLRESUME;

function encryptedUserName(email) {
  if (!email) return null;
  const key = CryptoJS.enc.Utf8.parse(secretKey32);
  const iv = CryptoJS.enc.Utf8.parse(secretKey16);
  const encrypted = CryptoJS.AES.encrypt(email, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });
  const ivBytes = Buffer.from(iv.toString(CryptoJS.enc.Utf8), "utf-8");
  const encryptedBytes = Buffer.from(
    encrypted.ciphertext.toString(CryptoJS.enc.Hex),
    "hex"
  );
  const combinedBytes = Buffer.concat([ivBytes, encryptedBytes]);
  let base64String = combinedBytes.toString("base64");

  base64String = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64String;
}

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
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setApplicants(response.data.applications);
    } catch (error) {
      toast.error("Error fetching applicants");
    }
  };

  console.log(applicants);

  return (
    <>
      <ToastContainer style={{ zIndex: 999 }} position="top-center" />

      <Flex align={"center"} justify={"space-between"}>
        <Title order={3}>All Applicants</Title>
        <Select
          placeholder="Select Job"
          searchable
          allowDeselect={false}
          data={jobs.map((item) => ({
            value: String(item.job_id),
            label: item.job_title,
          }))}
          onChange={(value) => {
            fetchApplicantsForJob(value);
            setselectedJobName(
              jobs.find((item) => item.job_id === value).job_title
            );
          }}
        />
      </Flex>

      {!selectedJobName && (
        <Flex
          pt={50}
          align={"center"}
          justify={"center"}
          direction={"column"}
          gap={5}
        >
          <IconListSearch color="gray" size={18} />
          <Text c={"dimmed"} size={"sm"}>
            Select Job from dropdown
          </Text>
        </Flex>
      )}
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
                      `https://shareinfo.blob.core.windows.net/candidate/${encryptedUserName(
                        applicant.name
                      )}${applicant.profile_photo}${azureBlobUrl}` ||
                      "/profilePlaceholder.jpg"
                    }
                    alt=""
                  />
                  <Flex gap={3} direction="column">
                    {applicant.name && (
                      <Flex gap={5} align={"center"}>
                        <Text fw={700}>{applicant.name} </Text>
                      </Flex>
                    )}

                    {applicant.current_position && (
                      <Text size="xs" color="dimmed">
                        {applicant.current_position} at{" "}
                        {applicant.current_organization}
                      </Text>
                    )}

                    {applicant.city && (
                      <Text size="xs" color="dimmed">
                        {applicant.city}, {applicant.state}
                      </Text>
                    )}

                    {applicant.skills.length > 0 && (
                      <Flex wrap={"wrap"} gap={8}>
                        {applicant.skills.map((skill, idx) => (
                          <Pill key={idx} size="xs">
                            {skill}
                          </Pill>
                        ))}
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Card>
            ))}
          </SimpleGrid>

          <Modal
            style={{ zIndex: 799 }}
            opened={opened}
            size="100%"
            onClose={close}
            centered
            withCloseButton={false}
          >
            <ApplicantProfile
              applicationId={applicationId}
              handleClose={close}
            />
          </Modal>
        </>
      )}
    </>
  );
};
