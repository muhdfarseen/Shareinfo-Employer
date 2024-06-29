import { AppShell, Burger, Button, Group, Image, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconHexagonPlus,
  IconBriefcase,
  IconHome,
  IconUserCircle,
  IconCheckbox,
  IconAddressBook,
  IconSettings
} from "@tabler/icons-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const data = [
  { id: 0, icon: IconHome, label: "Home", path: "home" },
  { id: 1, icon: IconHexagonPlus, label: "Post New Job", path: "newjob" },
  { id: 2, icon: IconBriefcase, label: "Manage Jobs", path: "managejob" },
  // { id: 3, icon: IconAddressBook, label: "All Applicants", path: "allaplicants" },
  // { id: 4, icon: IconCheckbox, label: "Shortlisted", path: "shortlisted" },
  { id: 5, icon: IconUserCircle, label: "My Profile", path: "myprofile" },
  { id: 6, icon: IconSettings, label: "Settings", path: "settings" },
];

export const Dashboard = () => {
  const isProfileCreated = localStorage.getItem('is_profile_created') === 'true';
  const [active, setActive] = useState(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (!isProfileCreated) {
      return data.findIndex(item => item.path === "myprofile");
    }
    return savedActiveIndex !== null ? parseInt(savedActiveIndex, 10) : 0;
  });

  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/dashboard/', ''); // Extract path after '/dashboard/'
    const index = data.findIndex(item => item.path === path);
    if (index !== -1) {
      setActive(index);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("activeIndex", active);
  }, [active]);

  const handleLinkClick = (event, index) => {
    setActive(index);
    navigate(data[index].path);
    event.preventDefault();
  };

  const HandleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image h={40} src={"/Logo.svg"} />
          <Button onClick={HandleLogOut} variant="light" color="red" size="xs">Log Out</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {data.map((item, index) => {
          if (!isProfileCreated && item.path !== "myprofile") {
            return null;
          }
          return (
            <NavLink
              variant="filled"
              key={item.label}
              label={item.label}
              active={index === active}
              onClick={(event) => { handleLinkClick(event, index); toggle(); }}
              leftSection={<item.icon size="1rem" stroke={1.5} />}
              style={{ borderRadius: "7px" }}
              color="blue"
            />
          );
        })}
      </AppShell.Navbar>
      <AppShell.Main bg={"var(--code-bg, var(--mantine-color-gray-1))"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
