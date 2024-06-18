import { Title, Input, Card, Textarea, SimpleGrid, Button, Group } from '@mantine/core'
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import { IconSquareRoundedCheck } from '@tabler/icons-react'

import React from 'react'

export const NewJob = () => {
  const [value, setValue] = useState(null);
  return (
    <>
      <Group justify='space-between' >
        <Title order={3} >Post a New Job</Title>
        <Button color='green' size='xs' leftSection={<IconSquareRoundedCheck size={14} />} >Publish</Button>
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
    </>
  )
}
