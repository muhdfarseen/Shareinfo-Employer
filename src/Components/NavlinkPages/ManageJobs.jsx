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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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


  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    openDeleteModal();
  };

  const handleDeleteConfirm = async () => {
    if (selectedJob) {
      try {
        await axiosInstance.delete(`/specific-job/${selectedJob.job_id}/`);
        setJobs(jobs.filter((job) => job.job_id !== selectedJob.job_id));
        closeDeleteModal();
        toast.success("Job post deleted successfully");

      } catch (error) {
        toast.error("Failed to delete job. Please try again.");
      }
    }
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
      

      <Table.Td>   
          <ActionIcon
            variant="light"
            color="red"
            aria-label="Delete"
            onClick={() => handleDeleteClick(job)}
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
      </Table.Td>

    </Table.Tr>
  ));

  return (
    <>
          <ToastContainer position="top-center" />

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
              <Table.Th></Table.Th>
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
          <Button onClick={handleDeleteConfirm} size="xs" color="red">
            Delete
          </Button>
        </Flex>
      </Modal>      
    </>
  );
};
