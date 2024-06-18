import { useState } from "react";
import {
  Center,
  Card,
  Image,
  Text,
  Button,
  Title,
  Input,
  Flex,
  Box,
  Anchor,
  Divider,
  PasswordInput,
  SegmentedControl,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { Register } from "./Register";

export const Login = () => {

  const navigate = useNavigate()

  const HandleLogin = ()=>{
    navigate("dashboard/newjob")
  }

  const NavigateToRegister = () =>{
    navigate("register")
  }

  const [opened, { open, close }] = useDisclosure(false);



  return (
    <>
      <Flex>
        <Image
          flex={1}
          w={{ base: "0", sm: "50vw" }}
          h={"100dvh"}
          src={"/blu.gif"}

        />

        <Box
          // bg={"var(--mantine-color-green-2)"}
          w={{ base: "100vw", sm: "50vw" }}
        >
          <Center style={{ height: "100dvh" }}>
            <Flex
              w={{ base: "280px", sm: "320px" }}
              direction={"column"}
              justify={"space-between"}
              padding="lg"
              radius="xl"
              h={"80dvh"}
            >
              <Image
                w={140}
                h={"100dvh"}
                src={"/Logo.svg"}
              />

              <Box>
                <Title order={2}>Welcome Back</Title>
                <Text mb={20} c={"dimmed"} size="sm" >Please enter your details to sign in</Text>

                <Input.Wrapper my={10} label="Username">
                  <Input radius={"lg"} label="Username" placeholder="Username" />
                </Input.Wrapper>
                <PasswordInput
                  radius={"lg"}
                  label="Password"
                  placeholder="Password"
                />

                <Button onClick={HandleLogin} mt={10} fullWidth radius="lg">
                  Login
                </Button>
              </Box>

              <Text c={"dimmed"} size="sm" >
                Dont have an account?{" "}
                <Anchor onClick={open} >Sign up</Anchor>
              </Text>

            </Flex>
          </Center>
        </Box>
      </Flex>

      <Modal
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={"lg"}
        centered
        opened={opened} onClose={close} withCloseButton={false}
      >
        <Register closefun={close} />
        
      </Modal>

    </>
  );
};
