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
  Flex,
  Pill,
} from "@mantine/core";
import { ApplicantProfile } from "./ApplicantProfile";
import { useDisclosure } from "@mantine/hooks";
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

export const ApplicantsByStatus = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");
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
      } catch (error) {
        toast.error("Error fetching jobs");
      }
    };

    fetchJobs();
  }, []);

  const fetchApplicantsByStatus = async () => {
    try {
      const response = await axiosInstance.get(
        `/specific-job/by-status/${selectedJobId}/${selectedStatus}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setApplicants(response.data);
    } catch (error) {
      toast.error("Error fetching applicants");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <Flex mb={10} align={"center"} justify={"space-between"}>
        <Title order={3}>Applicants by Status</Title>
        <Group align="end" gap={10}>
          <Select
            label="Select Job"
            placeholder="Select Job"
            allowDeselect={false}
            searchable
            data={jobs.map((item) => ({
              value: String(item.job_id),
              label: item.job_title,
            }))}
            onChange={(value) => setSelectedJobId(value)}
          />
          <Select
            label="Candidate Status"
            defaultValue={"Pending"}
            allowDeselect={false}
            placeholder="Select status"
            data={[
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
              { value: "Shortlisted", label: "Shortlisted" },
            ]}
            onChange={(value) => setSelectedStatus(value)}
          />
          <Button onClick={fetchApplicantsByStatus}>Fetch Applicants</Button>
        </Group>
      </Flex>

      {(!applicants || applicants.length === 0) && (
        <Flex
          pt={50}
          align={"center"}
          justify={"center"}
          direction={"column"}
          gap={5}
        >
          <Text c={"dimmed"} size={"sm"}>
            Select Job and Status from dropdowns
          </Text>
        </Flex>
      )}
      {applicants && applicants.length > 0 && (
        <>
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
                    alt={applicant.name}
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
