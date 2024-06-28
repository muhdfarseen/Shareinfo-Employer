import React from "react";
import { Title, Text, Button, Group, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {

  const navigate = useNavigate();
  const handleGoHome = () =>{
    navigate("/dashboard/home")
  }

  return (
    <Flex h={"100vh"} justify={"center"} align={"center"} direction={"column"} gap={20}>
       <Title order={1} opacity={"20%"} >404</Title>
      <Title order={3}>Nothing to see here</Title>
      <Text c="dimmed" size="sm" ta="center">
        Page you are trying to open does not exist. You may have mistyped <br />
        the address, or the page has been moved to another URL. If you <br />
        think this is an error contact support.
      </Text>
      <Group justify="center">
        <Button onClick={handleGoHome} variant="default" size="xs">Take me back to home page</Button>
      </Group>
    </Flex>
  );
};
