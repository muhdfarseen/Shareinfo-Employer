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
  Badge,
  Textarea,
  Input,
  ButtonGroup,
  Select,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconClipboard,
  IconCertificate,
  IconSettings2,
  IconFileTypePdf,
  IconMessage,
} from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Helpers/axios";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";

const secretKey32 = import.meta.env.VITE_SECRET_KEY32;
const secretKey16 = import.meta.env.VITE_SECRET_KEY16;
const azureBlobUrl = import.meta.env.VITE_BLOBURLRESUME;

function encryptedUserName(email) {
    if (!email) return null;
    const key = CryptoJS.enc.Utf8.parse(secretKey32);
    const iv = CryptoJS.enc.Utf8.parse(secretKey16);
    const encrypted = CryptoJS.AES.encrypt(email, key, { iv: iv, mode: CryptoJS.mode.CBC });
    const ivBytes = Buffer.from(iv.toString(CryptoJS.enc.Utf8), 'utf-8');
    const encryptedBytes = Buffer.from(encrypted.ciphertext.toString(CryptoJS.enc.Hex), 'hex');
    const combinedBytes = Buffer.concat([ivBytes, encryptedBytes]);
    let base64String = combinedBytes.toString('base64');
  
    base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
    return base64String;
  }
  
  

export const ApplicantProfile = ({ applicationId, handleClose }) => {
  const [applicantDetails, setApplicantDetails] = useState(null);

  

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/specific-student/${applicationId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
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

  const encryptedEmail = encryptedUserName(applicantDetails.email);
  const responseUrl = applicantDetails.cvresume_set[0].cv;
  const fullUrl = `${azureBlobUrl}/${encryptedEmail}${responseUrl}`;

  return (
    <>
      <Flex gap={10} mb={20} align={"center"}>
        <ActionIcon
          size="lg"
          radius="xl"
          variant="default"
          aria-label="Settings"
        >
          <IconChevronLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
            onClick={handleClose}
          />
        </ActionIcon>
        <Title order={3}>Candidate Profile</Title>
      </Flex>

      <Flex wrap={"wrap"} gap={20} justify={"space-between"} direction={"row"}>
        <Card
          w={{ base: "100%", xs: "100%", sm: "100%", md: "30%" }}
          radius={"lg"}
          withBorder
        >
          <Flex gap={20}>
            <Avatar
              size={"xl"}
              src={
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Fprofile-placeholder&psig=AOvVaw2tpt2bwCa0Xu8WQil-LopC&ust=1720099832439000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDfu639iocDFQAAAAAdAAAAABAJ"
              }
            />
            <Flex
              justify={"flex-end"}
              align={"flex-start"}
              direction={"column"}
            >
              <Title order={4}>
                {applicantDetails.candidateprofile.full_name}
              </Title>
              <Text size="sm" c={"dimmed"}>
                {applicantDetails.candidateprofile.current_position}
              </Text>
              <Group gap={5} mt={4}>
                <Pill size="xs" radius={0} variant="default">
                  {applicantDetails.candidateprofile.current_organization}
                </Pill>
              </Group>
            </Flex>
          </Flex>

          <Group mt={20} gap={10} grow>
            <Button
              variant="default"
              size="xs"
              leftSection={<IconFileTypePdf size={14} />}
              radius={"sm"}
              color="red"
            >
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>
            <Button
              variant="default"
              size="xs"
              leftSection={<IconMessage size={14} />}
              radius={"sm"}
              color="blue"
            >
              Message Now
            </Button>
          </Group>

          <Text size="sm" mt={20} fw={600}>
            Summary
          </Text>
          <Text size="sm" mt={10}>
            {applicantDetails.summary
              ? applicantDetails.summary.summary || "No summary available"
              : "No summary available"}
          </Text>

          <Text size="sm" mt={20} fw={600}>
            Skills
          </Text>
          <Group gap={5} mt={10}>
            {applicantDetails.skills.map((skill, index) => (
              <Pill key={index} size="xs" variant="default">
                {skill}
              </Pill>
            ))}
          </Group>

          <Text size="sm" mt={20} fw={600}>
            Academic & Placement Details
          </Text>
          <Flex mt={10} gap={20}>
            <Flex gap={5} direction={"column"}>
              <Text size="sm">Phone No.</Text>
              <Text size="sm">Email</Text>
            </Flex>
            <Flex gap={5} direction={"column"}>
              <Text size="sm" fw={600}>
                : {applicantDetails.phone_no}
              </Text>
              <Text size="sm" fw={600}>
                : {applicantDetails.email}
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Card flex={1} radius={"lg"} withBorder>
          <Flex gap="sm" wrap="wrap" direction={{ base: "column", sm: "row" }}>
            <Flex flex={1} gap={10} direction={"column"}>
              <Text size="sm" fw={600}>
                Projects
              </Text>
              {applicantDetails.project_set.map((project, index) => (
                <Card key={index} radius={"lg"} withBorder>
                  <Flex align={"flex-start"} gap={20} direction={"row"}>
                    <ThemeIcon radius={"lg"} variant="light" color="indigo">
                      <IconSettings2 style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>
                    <Flex direction={"column"}>
                      <Text size="md" fw={600}>
                        {project.pname}
                      </Text>
                      <Text size="sm" c={"dimmed"}>
                        {project.role}
                      </Text>
                      <Text size="xs" c={"dimmed"}>
                        {project.start_date} - {project.end_date || "Present"}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>

            <Flex flex={1} gap={10} direction={"column"}>
              <Text size="sm" fw={600}>
                Certification and Licenses
              </Text>
              {applicantDetails.certification_set.length === 0 ? (
                <Text size="sm" c={"dimmed"}>
                  No certifications available
                </Text>
              ) : (
                applicantDetails.certification_set.map(
                  (certification, index) => (
                    <Card key={index} radius={"lg"} withBorder>
                      <Flex align={"flex-start"} gap={20} direction={"row"}>
                        <ThemeIcon radius={"lg"} variant="light" color="red">
                          <IconCertificate
                            style={{ width: "70%", height: "70%" }}
                          />
                        </ThemeIcon>
                        <Flex direction={"column"}>
                          <Text size="md" fw={600}>
                            {certification.name}
                          </Text>
                          <Text size="sm" c={"dimmed"}>
                            {certification.issuer}
                          </Text>
                          <Text size="xs" c={"dimmed"}>
                            {certification.date}
                          </Text>
                        </Flex>
                      </Flex>
                    </Card>
                  )
                )
              )}
            </Flex>

            {/* <Flex flex={1} gap={10} direction={"column"}>
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
                        </Flex> */}
          </Flex>
        </Card>
      </Flex>

      <Flex mt={20}>
        <Card flex={1} radius={"lg"} withBorder>
          <Textarea
            radius={"md"}
            label="Add remarks"
            placeholder="Add interview remarks"
            autosize
            minRows={6}
          />
          <Flex align={"end"} justify={"space-between"}>
            <Flex align={"end"} justify={"space-between"} gap={10} mt={10}>
              <Input.Wrapper label="Communication Mark">
                <Input radius={"md"} placeholder="Enter the Score" />
              </Input.Wrapper>
              <Input.Wrapper label="Technical Mark">
                <Input radius={"md"} placeholder="Enter the Score" />
              </Input.Wrapper>
              <Input.Wrapper label="Apptitude Mark">
                <Input radius={"md"} placeholder="Enter the Score" />
              </Input.Wrapper>
            </Flex>
            <Group align="end" justify="end">
              <Select
                label="Candidate Status"
                defaultValue={"pending"}
                radius={"md"}
                placeholder="Select status"
                data={[
                  { value: "Pending", label: "Pending" },
                  { value: "Approved", label: "Shortlisted" },
                  { value: "Rejected", label: "Rejected" },
                  { value: "Shortlisted", label: "On Hold" },
                ]}
              />
              <Button radius={"md"}>Save</Button>
            </Group>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
