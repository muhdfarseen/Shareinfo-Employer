import { useState, useEffect } from "react";
import { Card, Text, SimpleGrid, Flex, useMantineTheme } from "@mantine/core";
import {
  IconUsers,
  IconBriefcase,
  IconCalendarStats,
  IconInfoSquareRounded,
  IconUserCircle,
  IconClipboardPlus,
  IconMail,
  IconSettings,
} from "@tabler/icons-react";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const mockdata = [
  {
    title: "Post New Job",
    icon: IconClipboardPlus,
    color: "indigo",
    linkto: "newjob",
  },
  {
    title: "Manage Jobs",
    icon: IconBriefcase,
    color: "yellow",
    linkto: "managejob",
  },
  {
    title: "My Profile",
    icon: IconUserCircle,
    color: "green",
    linkto: "myprofile",
  },
  { title: "Settings", icon: IconSettings, color: "teal", linkto: "settings" },
  { title: "Support", icon: IconMail, color: "cyan", linkto: "" },
  { title: "About us", icon: IconInfoSquareRounded, color: "violet", linkto: "aboutus" },

];

export const Home = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleNavigation = (linkto, index) => {
    if (linkto == "aboutus"){
        window.location.href = 'https://imiot.co.in/';
    }
    else if (linkto) {
      localStorage.setItem("activeIndex", index);
      navigate(`/dashboard/${linkto}`);
    } else {
      const mailtoLink = document.createElement("a");
      mailtoLink.href = "mailto:support@imiot.co.in";
      mailtoLink.target = "_blank";
      mailtoLink.click();
    }
  };

  useEffect(() => {
    const log = Number(localStorage.getItem("log")); 
    if (log === 1) {
      toast.success("Welcome back! You have successfully logged in");
      localStorage.setItem("log", log + 1); 
    }
  }, []);


  const items = mockdata.map((item, index) => (
    <Card
      w={150}
      h={150}
      onClick={() => handleNavigation(item.linkto, index)}
      key={item.title}
      className={classes.item}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </Card>
  ));

  return (
    <div>
      <ToastContainer position="top-center" />

      <Flex
        align={"center"}
        justify={"center"}
        w={"100%"}
        h={"calc(100dvh - 120px)"}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: "lg", sm: "lg" }}
          verticalSpacing={{ base: "lg", sm: "lg" }}
          mt="xs"
        >
          {items}
        </SimpleGrid>
      </Flex>
    </div>
  );
};
