import { Title, Table, Input, Card, Image, SimpleGrid, Button, Group, Box, FileInput, Badge, ActionIcon } from '@mantine/core';
import { IconEye, IconTrash, IconEdit } from '@tabler/icons-react';

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

  const rows = elements.map((element) => (
    <Table.Tr key={element.title}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.applications}</Table.Td>
      <Table.Td>{element.createdExpiry}</Table.Td>
      <Table.Td><Badge variant={"light"} color={(element.status == 'Open') ? 'green' : 'red'} >{element.status}</Badge></Table.Td>
      <Table.Td>

        <Group gap={10} >
          <ActionIcon variant="light" aria-label="Settings">
            <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="light" color='gray' aria-label="Settings">
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="light" color='red' aria-label="Settings">
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


    </>
  )
}
