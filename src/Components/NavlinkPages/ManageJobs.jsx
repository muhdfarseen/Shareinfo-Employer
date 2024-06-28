import { useState, useEffect } from "react";
import {
  Title,
  Table,
  Textarea,
  Input,
  Text,
  Card,
  Modal,
  Image,
  SimpleGrid,
  Button,
  Group,
  Box,
  Badge,
  ActionIcon,
  Flex,
  Switch,
} from "@mantine/core";
import { IconEye, IconTrash, IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { IconSquareRoundedCheck } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import axiosInstance from "../../Helpers/axios";

export const ManageJobs = () => {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/job-list/");
        setJobs(response.data);
      } catch (error) {
        // console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    openEditModal();
  };

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    openDeleteModal();
  };

  const rows = jobs.map((job) => (
    <Table.Tr key={job.job_id}>
      <Table.Td>{job.job_title}</Table.Td>
      <Table.Td>
        {job.recruitment_start_date} to {job.recruitment_end_date}
      </Table.Td>
      <Table.Td>{job.working_mode}</Table.Td>
      <Table.Td>{job.preference}</Table.Td>
      <Table.Td>{job.location}</Table.Td>

      <Table.Td>{job.applied_count}</Table.Td>
      

      {/* <Table.Td>
        <Group gap={10}>
          <ActionIcon
            variant="light"
            color="gray"
            aria-label="Edit"
            onClick={() => handleEditClick(job)}
          >
            <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="red"
            aria-label="Delete"
            onClick={() => handleDeleteClick(job)}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td> */}


    </Table.Tr>
  ));

  return (
    <>
      <Title order={3}>Manage Jobs</Title>
      <Card radius={"md"} mt={10}>
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Created & Expiry</Table.Th>
              <Table.Th>Working mode</Table.Th>
              <Table.Th>Preference</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Applications</Table.Th>
              {/* <Table.Th>Quick Action</Table.Th> */}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        size="auto"
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        withCloseButton={false}
      >
        <Flex gap={20} align="center" justify="center">
          <Text>Are you sure to delete this Job post?</Text>
          <Button onClick={closeDeleteModal} size="xs" color="red">
            Delete
          </Button>
        </Flex>
      </Modal>

      {/* Edit Modal */}
      <Modal
        size="auto"
        opened={editModalOpened}
        onClose={closeEditModal}
        withCloseButton={false}
      >
        {selectedJob && (
          <>
            <Group justify="space-between">
              <Title order={3}>Edit Job</Title>
              <Switch defaultChecked label="Active / Inactive" />
              <Button
                color="green"
                size="xs"
                leftSection={<IconSquareRoundedCheck size={14} />}
              >
                Save
              </Button>
            </Group>

            <Card radius="md" mt={10}>
              <Input.Wrapper label="Job Title">
                <Input placeholder="" defaultValue={selectedJob.job_title} />
              </Input.Wrapper>

              <Textarea
                mt={10}
                label="Job Description"
                autosize
                minRows={5}
                placeholder="In this dynamic role, you will be responsible for [brief, attention-grabbing description of 2-3 key responsibilities]. You will play a crucial part in [explain how this role contributes to the team/company's success]."
              />

              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: "xl" }}
                verticalSpacing={{ base: "md", sm: "xl" }}
              >
                <Input.Wrapper label="Job Level">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Working Mode">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Working Preference">
                  <Input placeholder="" />
                </Input.Wrapper>
              </SimpleGrid>

              <Textarea mt={10} label="Perks & Benefits" autosize minRows={2} />
            </Card>

            <Card radius="md" mt={20}>
              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: "xl" }}
                verticalSpacing={{ base: "md", sm: "md" }}
              >
                <Input.Wrapper label="Salary Type">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Minimum Salary">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Maximum Salary">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Job Category">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Experience Type">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Minimum Experience">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Educational Qualification">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Reference Website">
                  <Input placeholder="" />
                </Input.Wrapper>
                <Input.Wrapper label="Number of Vacancies">
                  <Input placeholder="" />
                </Input.Wrapper>
              </SimpleGrid>

              <Input.Wrapper mt={10} label="Required Skills">
                <Input placeholder="" />
              </Input.Wrapper>

              <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: "xl" }}
                verticalSpacing={{ base: "md", sm: "xl" }}
              >
                <Input.Wrapper label="Job Location">
                  <Input placeholder="" />
                </Input.Wrapper>
                <DateInput
                  valueFormat="DD/MM/YYYY"
                  label="Recruitment Start Date"
                  placeholder="Recruitment Start Date"
                  defaultValue={new Date(selectedJob.recruitment_start_date)}
                />
                <DateInput
                  valueFormat="DD/MM/YYYY"
                  label="Recruitment End Date"
                  placeholder="Recruitment End Date"
                  defaultValue={new Date(selectedJob.recruitment_end_date)}
                />
              </SimpleGrid>
            </Card>
          </>
        )}
      </Modal>
    </>
  );
};
