import {
  Title,
  Input,
  Card,
  Image,
  Alert,
  SimpleGrid,
  Button,
  Group,
  Box,
  Flex,
  FileInput,
  ActionIcon,
  Select,
} from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import {
  IconSquareRoundedCheck,
  IconEdit,
  IconPhotoEdit,
} from "@tabler/icons-react";
import { BlobServiceClient } from "@azure/storage-blob";
import axiosInstance from "../../Helpers/axios";

export const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    employer_name: "",
    company_mail: "",
    company_phone_number: "",
    company_name: "",
    company_website: "",
    company_category: "",
    company_size: "",
    company_type: "",
    company_logo: "",
    minimum_payroll: "",
    branches: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await axiosInstance.get("/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfileData(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogoUpload = (file) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prevState) => ({
        ...prevState,
        company_logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  async function uploadFileToAzure(file) {
    try {
      const blobServiceClient = new BlobServiceClient(
        import.meta.env.VITE_BLOBURL
      );

      const containerName = "logo";
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = `${profileData.company_name}/${file.name}`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadBrowserData(file);

      const uploadedUrl = blockBlobClient.url;
      // console.log(`Upload block blob ${file.name} successfully`);

      return uploadedUrl;
    } catch (error) {
      // console.error("Failed to upload file to Azure Blob Storage", error);
      throw error;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      handleSaveProfile();
    } else {
      setIsEditMode(true);
    }
  };

  const handleSaveProfile = async () => {
    const accessToken = localStorage.getItem("access_token");
    const isProfileCreated = JSON.parse(
      localStorage.getItem("is_profile_created")
    );

    const formattedBranches = (
      typeof profileData.branches === "string" ? profileData.branches : ""
    )
      .split(",")
      .reduce((acc, branch, index) => {
        acc[index + 1] = branch.trim();
        return acc;
      }, {});

    const updatedProfileData = {
      ...profileData,
      branches: formattedBranches,
    };

    try {
      if (selectedFile) {
        const uploadedUrl = await uploadFileToAzure(selectedFile);
        updatedProfileData.company_logo = uploadedUrl;
      }

      if (isProfileCreated) {
        await axiosInstance.put("/profile/", updatedProfileData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        await axiosInstance.post("/create-profile/", updatedProfileData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.setItem("is_profile_created", true);
      }
      // console.log("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      // console.error("Failed to update profile", error);
      alert("Failed to update profile");
      return;
    }

    setIsEditMode(false);
  };

  const handleLogoButtonClick = () => {
    fileInputRef.current.click();
  };

  const isProfileCreated = JSON.parse(
    localStorage.getItem("is_profile_created")
  );

  return (
    <>
      <Group justify="space-between">
        <Title order={3}>My Profile</Title>
      </Group>

      {!isProfileCreated && (
        <Alert
          radius={"md"}
          mt={10}
          variant="light"
          color="red"
          title="Complete Your Profile"
        >
          Please complete your profile to access all the features and benefits
          of our platform.
        </Alert>
      )}

      <Card radius={"md"} mt={10}>
        <Title order={5}>Recruiter Details</Title>

        <SimpleGrid
          mt={10}
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "md" }}
          verticalSpacing={{ base: "md", sm: "md" }}
        >
          <Input.Wrapper label="Recruiter Name">
            <Input
              name="employer_name"
              value={profileData.employer_name}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Recruiter Mail ID">
            <Input
              name="company_mail"
              value={profileData.company_mail}
              disabled
            />
          </Input.Wrapper>
        </SimpleGrid>
      </Card>

      <Card radius={"md"} mt={20}>
        <Title order={5}>Company Details</Title>

        <Flex gap={10} justify={"flex-start"} direction={"row"} mt={10}>
          <Box maw={100} mah={100}>
            <Image
              fit="cover"
              radius={"lg"}
              src={profileData.company_logo}
              alt="Company Logo"
            />
          </Box>

          <ActionIcon
            onClick={handleLogoButtonClick}
            disabled={!isEditMode}
            variant="default"
            aria-label="Settings"
            radius={"xl"}
          >
            <IconPhotoEdit
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Flex>

        <FileInput
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleLogoUpload}
        />

        <SimpleGrid
          mt={"md"}
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "md" }}
          verticalSpacing={{ base: "md", sm: "md" }}
        >
          <Input.Wrapper label="Company Name">
            <Input
              name="company_name"
              value={profileData.company_name}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Company Mail">
            <Input
              name="company_mail"
              value={profileData.company_mail}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Contact Number">
            <Input
              name="company_phone_number"
              value={profileData.company_phone_number}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          <Select
            label="Company Category"
            placeholder="Select category"
            name="company_category"
            data={[
              "None",
              "Startup",
              "Small and Medium Enterprise",
              "Large Enterprise",
            ]}
            value={profileData.company_category}
            onChange={(value) => handleSelectChange("company_category", value)}
            disabled={!isEditMode}
          />

        </SimpleGrid>

        <SimpleGrid
          mt={"md"}
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "md" }}
          verticalSpacing={{ base: "md", sm: "md" }}
        >

          <Select
            label="Company Size"
            placeholder="Select size"
            name="company_size"
            data={["1-50", "50-100", "100-500", "500-2000", "20001+"]}
            value={profileData.company_size}
            onChange={(value) => handleSelectChange("company_size", value)}
            disabled={!isEditMode}
          />
          <Select
            label="Company Type"
            placeholder="Select type"
            name="company_type"
            data={[
              "One Person Company",
              "Private Limited Company",
              "Government",
              "Government Autonomous",
              "Public Limited Company",
              "Limited Liability partnership LLP",
              "Section 8 Company (NGO)",
              "Unlisted Company",
              "Listed Company",
            ]}
            value={profileData.company_type}
            onChange={(value) => handleSelectChange("company_type", value)}
            disabled={!isEditMode}
          />
          <Input.Wrapper label="Minimum Payroll Offered">
            <Input
              name="minimum_payroll"
              value={profileData.minimum_payroll}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Branches"
            description="Enter comma separated values"
          >
            <Input
              name="branches"
              value={profileData.branches}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Company Website" description="Should be in http/s format (for eg : https://imiot.co.in/ )" >
            <Input
              name="company_website"
              value={profileData.company_website}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </Input.Wrapper>
          {isEditMode && (
            <Flex align={"end"} justify={"end"} >

              <Button
                mt={10}
                color="green"
                size="sm"
                fullWidth
                leftSection={<IconSquareRoundedCheck size={14} />}
                onClick={toggleEditMode}
              >
                Save
              </Button>
            </Flex>

          )}

          {!isEditMode && (
            <Flex align={"end"} justify={"end"} >
              <Button
                fullWidth
                mt={10}
                variant="filled"
                color="blue"
                size="sm"
                leftSection={<IconEdit size={14} />}
                onClick={toggleEditMode}
              >
                Edit
              </Button>
            </Flex>
          )}
        </SimpleGrid>


      </Card>
    </>
  );
};
