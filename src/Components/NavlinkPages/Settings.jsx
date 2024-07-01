import React, { useState } from "react";
import {
  Title,
  Card,
  SimpleGrid,
  Modal,
  TextInput,
  Button,
  Group,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconPasswordUser,
  IconExternalLink,
  IconArticle,
  IconShieldCheck,
} from "@tabler/icons-react";
import axiosInstance from "../../Helpers/axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Settings = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const accessToken = localStorage.getItem("access_token");

  const handleSubmit = async () => {
    try {
      // Verify the current password
      const response = await axiosInstance.post(
        "/reset-password/",
        { password: currentPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        // If verification is successful, update the password
        const updateResponse = await axiosInstance.put(
          "/reset-password/",
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (updateResponse.status === 200) {
          toast.success("Password updated successfully");
          setModalOpened(false)

        } else {
          toast.error("Failed to update password");

        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Current password does not match");

      } else if (error.response && error.response.status === 406) {
        toast.error("Invalid input data");

      } else {
        toast.error("An error occurred");

      }
    } 
  };

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <Title order={3}>Settings</Title>
      <SimpleGrid mt={10} cols={1} spacing="md" verticalSpacing="md">
        <Card
          className="hoverclassscale"
          radius="md"
          withBorder
          onClick={() => setModalOpened(true)}
        >
          <Flex align="center" justify="space-between">
            <Group>
              <IconPasswordUser size={18} />
              Reset Password
            </Group>
            <IconExternalLink color="blue" size={18} />
          </Flex>
        </Card>

        <Card onClick={() => handleExternalLinkClick("https://shareinfo.imiot.co.in/")} className="hoverclassscale" radius="md" withBorder>
          <Flex align="center" justify="space-between">
            <Group>
              <IconArticle size={18} />
              Terms & Conditions
            </Group>
            <IconExternalLink color="blue" size={18} />
          </Flex>
        </Card>

        <Card onClick={() => handleExternalLinkClick("https://shareinfo.imiot.co.in/")} className="hoverclassscale" radius="md" withBorder>
          <Flex align="center" justify="space-between">
            <Group>
              <IconShieldCheck size={18} />
              Privacy Policy & Terms
            </Group>
            <IconExternalLink color="blue" size={18} />
          </Flex>
        </Card>
      </SimpleGrid>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        withCloseButton={false}
        centered
        radius={"lg"}
      >
        <Box p={30} >

          <Title order={5} mb={20}>
            Reset Password
          </Title>
          <TextInput
            radius={"lg"}
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.currentTarget.value)}
            type="password"
          />
          <TextInput
            radius={"lg"}
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.currentTarget.value)}
            type="password"
            mt="md"
          />
          <Button radius={"lg"} mt={"md"} fullWidth onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
};
