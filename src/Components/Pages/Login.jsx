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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const HandleLogin = async (values) => {
    try {
      const response = await axiosInstance.post('/login/', values);
      if (response.status === 200) {
        const { access_token, refresh_token, is_profile_created, full_name } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('full_name', full_name);
        localStorage.setItem('is_profile_created', is_profile_created);
        localStorage.setItem("email", values.email);

        navigate("dashboard/home");
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast.error(`Error logging in: ${errorMessage}`);
    }
  };

  const mailtofaceissue = () => {
    const mailtoLink = 'mailto:accountsupport@shareinfo.io?subject=%23Urgent%2C%20Sign-up%20Error%3B%20ShareInfo%20for%20Recruiter&body=Hey%20Support%20Team%2C%0A%0A%7BEstablish%20Your%20Issue%20Here%7D';
    window.open(mailtoLink, '_blank');
  };

  return (
    <>
          <ToastContainer />

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
              justify={"center"}
              gap={40}
              padding="lg"
              radius="xl"
              h={"80dvh"}
            >
              <Image
                w={180}
                h={"100dvh"}
                src={"/Logo.svg"}
              />

              <Box>
                <Title order={2}>Welcome Back</Title>
                <Text mb={20} c={"dimmed"} size="sm">Please enter your details to sign in</Text>

                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Required'),
                    password: Yup.string()
                      .required('Required'),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    await HandleLogin(values);
                    setSubmitting(false);
                  }}
                >
                  {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <Input.Wrapper my={10} label="Email" error={touched.email && errors.email}>
                        <Input
                          radius={"lg"}
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Email"
                        />
                      </Input.Wrapper>
                      <PasswordInput
                        radius={"lg"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Password"
                        placeholder="Password"
                        error={touched.password && errors.password}
                      />

                      <Button type="submit" mt={10} fullWidth radius="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Log In"}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Flex gap={10} direction={"column"} >
                <Text c={"dimmed"} size="sm">
                  Don't have an account?{" "}
                  <Anchor onClick={open}>Sign up</Anchor>
                </Text>

                <Text c={"dimmed"} size="sm">
                  Facing issue while Log In?{" "}
                  <Anchor onClick={mailtofaceissue} > Contact us</Anchor>
                </Text>
              </Flex>
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
