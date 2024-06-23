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
  PasswordInput,
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Register } from "./Register";
import axiosInstance from "../../Helpers/axios"; 

export const Login = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login/', { email, password });
      if (response.status === 201) {
        // Handle successful login
        navigate("dashboard/newjob");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error (e.g., show an error message)
    }
  };

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
                <Text mb={20} c={"dimmed"} size="sm">Please enter your details to sign in</Text>

                <Input.Wrapper my={10} label="Email">
                  <Input
                    radius={"lg"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Input.Wrapper>
                <PasswordInput
                  radius={"lg"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Password"
                />

                <Button onClick={HandleLogin} mt={10} fullWidth radius="lg">
                  Login
                </Button>
              </Box>

              <Text c={"dimmed"} size="sm">
                Don't have an account?{" "}
                <Anchor onClick={open}>Sign up</Anchor>
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
