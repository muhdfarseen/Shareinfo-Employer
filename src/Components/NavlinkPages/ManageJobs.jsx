import { Title, Table, Textarea, Input, Text, Card, Modal, Image, SimpleGrid, Button, Group, Box, FileInput, Badge, ActionIcon, Flex, Radio, Switch } from '@mantine/core';
import { IconEye, IconTrash, IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconSquareRoundedCheck } from '@tabler/icons-react'
import { DateInput } from '@mantine/dates';


const elements = [
  {
    title: 'Software Engineer',
    applications: 45,
    createdExpiry: '2024-01-01 to 2024-03-01',
    status: 'Open',
    quickAction: 'Edit'
  },
  {
    title: 'Data Scientist',
    applications: 30,
    createdExpiry: '2024-02-01 to 2024-04-01',
    status: 'Closed',
    quickAction: 'View'
  },
  {
    title: 'Product Manager',
    applications: 20,
    createdExpiry: '2024-01-15 to 2024-03-15',
    status: 'Open',
    quickAction: 'Edit'
  },
  {
    title: 'UX Designer',
    applications: 25,
    createdExpiry: '2024-02-10 to 2024-04-10',
    status: 'Open',
    quickAction: 'Edit'
  },
  {
    title: 'Marketing Specialist',
    applications: 35,
    createdExpiry: '2024-03-01 to 2024-05-01',
    status: 'Closed',
    quickAction: 'View'
  },

];

export const ManageJobs = () => {

  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);


  const rows = elements.map((element) => (
    <Table.Tr key={element.title}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.applications}</Table.Td>
      <Table.Td>{element.createdExpiry}</Table.Td>
      <Table.Td><Badge variant={"light"} color={(element.status == 'Open') ? 'green' : 'red'} >{element.status}</Badge></Table.Td>
      <Table.Td>

        <Group gap={10}>
          <ActionIcon variant="light" color="gray" aria-label="Edit" onClick={openEditModal}>
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" aria-label="Delete" onClick={openDeleteModal}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>

      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>

      <Title order={3} >Manage Jobs</Title>
      <Card radius={"md"} mt={10}>
        <Table withRowBorders={false} verticalSpacing="md" >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Applications</Table.Th>
              <Table.Th>Created & Expiry</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Quick Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>


      {/* Delete Confirmation Modal */}
      <Modal size="auto" opened={deleteModalOpened} onClose={closeDeleteModal} withCloseButton={false}>
        <Flex gap={20} align="center" justify="center">
          <Text>Are you sure to delete this Job post?</Text>
          <Button onClick={closeDeleteModal} size="xs" color="red">
            Delete
          </Button>
        </Flex>
      </Modal>

      {/* Edit Modal */}
      <Modal size="auto" opened={editModalOpened} onClose={closeEditModal} withCloseButton={false}>
        <Group justify="space-between">
          <Title order={3} >Edit Job</Title>
          <Switch
            defaultChecked
            label="Active / Inactive"
          />
          <Button color='green' size='xs' leftSection={<IconSquareRoundedCheck size={14} />} >Save</Button>

        </Group>


        <Card radius={"md"} mt={10} >
          <Input.Wrapper label="Job Title" >
            <Input placeholder="" />
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
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Input.Wrapper label="Job Level" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Working Mode" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Working Preference" >
              <Input placeholder="" />
            </Input.Wrapper>
          </SimpleGrid>

          <Textarea
            mt={10}
            label="Perks & Benefits"
            autosize
            minRows={2}
          />
        </Card>

        <Card radius={"md"} mt={20} >
          <SimpleGrid
            mt={10}
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'md' }}
          >
            <Input.Wrapper label="Salary Type" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Minimum Salary" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Maximum Salary" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Job Category" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Experience Type" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Minimum Experience" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Educational Qualification" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Reference Website" >
              <Input placeholder="" />
            </Input.Wrapper>
            <Input.Wrapper label="Number of Vacancies" >
              <Input placeholder="" />
            </Input.Wrapper>
          </SimpleGrid>

          <Input.Wrapper mt={10} label="Required Skills" >
            <Input placeholder="" />
          </Input.Wrapper>

          <SimpleGrid
            mt={10}
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Input.Wrapper label="Job Location" >
              <Input placeholder="" />
            </Input.Wrapper>
            <DateInput
              valueFormat="DD/MM/YYYY"
              label="Recruitment Start Date"
              placeholder="Recruitment Start Date"
            />
            <DateInput
              valueFormat="DD/MM/YYYY"
              label="Recruitment End Date"
              placeholder="Recruitment End Date"
            />
          </SimpleGrid>

        </Card>
      </Modal>

    </>
  )
}
