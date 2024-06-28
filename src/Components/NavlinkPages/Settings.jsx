import React, { useState } from "react";
import {
  Title,
  Card,
  SimpleGrid,
  Modal,
  TextInput,
  Button,
  Group,
  Flex,
} from "@mantine/core";
import {
  IconPasswordUser,
  IconExternalLink,
  IconArticle,
  IconShieldCheck,
} from "@tabler/icons-react";
import axiosInstance from "../../Helpers/axios";

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
          alert("Password updated successfully");
        } else {
          alert("Failed to update password");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Current password does not match");
      } else if (error.response && error.response.status === 406) {
        alert("Invalid input data");
      } else {
        alert("An error occurred");
      }
    } finally {
      setModalOpened(false);
    }
  };

  return (
    <>
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

        <Card className="hoverclassscale" radius="md" withBorder>
          <Flex align="center" justify="space-between">
            <Group>
              <IconArticle size={18} />
              Terms & Conditions
            </Group>
            <IconExternalLink color="blue" size={18} />
          </Flex>
        </Card>

        <Card className="hoverclassscale" radius="md" withBorder>
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
        title="Reset Password"
      >
        <TextInput
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.currentTarget.value)}
          type="password"
        />
        <TextInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
          type="password"
          mt="md"
        />
        <Group position="right" mt="md">
          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
      </Modal>
    </>
  );
};
