import { Title, Input, Card, Image, SimpleGrid, Button, Group, Box, FileInput } from '@mantine/core';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import { IconSquareRoundedCheck } from '@tabler/icons-react';

import React from 'react';

export const MyProfile = () => {
  const [value, setValue] = useState(null);
  const [logo, setLogo] = useState("/Logo.svg");

  const handleLogoUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Group justify='space-between' >
        <Title order={3} >My Profile</Title>
        <Button color='green' size='xs' leftSection={<IconSquareRoundedCheck size={14} />} >Save</Button>
      </Group>

      <Card radius={"md"} mt={10} >
        <Title order={5} >Recruiter Details</Title>

        <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: 'md' }}
          verticalSpacing={{ base: 'md', sm: 'md' }}
        >
          <Input.Wrapper label="Recruiter Name" >
            <Input placeholder="Akshay Ashokan Pothan" />
          </Input.Wrapper>
          <Input.Wrapper label="Recruiter Mail ID" >
            <Input placeholder="akshayashokanpothan@imiot.co.in" />
          </Input.Wrapper>
        </SimpleGrid>
      </Card>

      <Card radius={"md"} mt={20}>
        <Title order={5} >Company Details</Title>


          <Box mt={10} w={100} h={100}  >
            {logo ? (
              <Image radius={"lg"} src={logo} alt="Company Logo" />
            ) : (
              <Image radius={"lg"} src={"./Logo.svg"} alt="Default Logo" />
            )}
          </Box>

        <FileInput
          mt={"md"}
          placeholder="Upload Company Logo"
          label="Company Logo"
          accept="image/*"
          onChange={handleLogoUpload}
        />

        <SimpleGrid
          mt={"md"}
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: 'md' }}
          verticalSpacing={{ base: 'md', sm: 'md' }}
        >
          <Input.Wrapper label="Company Name" >
            <Input placeholder="IMIOT" />
          </Input.Wrapper>
          <Input.Wrapper label="Company Mail" >
            <Input placeholder="contactn@imiot.co.in" />
          </Input.Wrapper>
          <Input.Wrapper label="Contact Number" >
            <Input placeholder="895 896 1234" />
          </Input.Wrapper>
          <Input.Wrapper label="Company Website" >
            <Input placeholder="www.imiot.co.in" />
          </Input.Wrapper>
        </SimpleGrid>

        <SimpleGrid
          mt={"md"}
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'md' }}
          verticalSpacing={{ base: 'md', sm: 'md' }}
        >
          <Input.Wrapper label="Company Category" >
            <Input placeholder="Software AI" />
          </Input.Wrapper>
          <Input.Wrapper label="Company Type" >
            <Input placeholder="Startup product based" />
          </Input.Wrapper>
          <Input.Wrapper label="Company Size" >
            <Input placeholder="0-50 employees" />
          </Input.Wrapper>
          <Input.Wrapper label="Minimum Payroll Offered" >
            <Input placeholder="3.5LPA" />
          </Input.Wrapper>
        </SimpleGrid>
      </Card>
    </>
  )
};
