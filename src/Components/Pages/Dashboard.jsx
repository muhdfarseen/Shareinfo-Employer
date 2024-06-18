import { AppShell, Burger, Button, Group, Image, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconHexagonPlus,
  IconBriefcase,
  IconUserCircle,
} from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";

const data = [
  { id: 1, icon: IconHexagonPlus, label: "Post New Job", path: "newjob" },
  { id: 2, icon: IconBriefcase, label: "Manage Jobs", path: "managejob" },
  { id: 5, icon: IconUserCircle, label: "My Profile", path: "myprofile" },
];

export const Dashboard = () => {

  const [active, setActive] = useState(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    return savedActiveIndex !== null ? parseInt(savedActiveIndex, 10) : 0;
  });

  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeIndex", active);
  }, [active]);

  const handleLinkClick = (event, index) => {
    setActive(index);
    navigate(data[index].path);
    event.preventDefault();
  };

  const HandleLogOut = ()=>{
    navigate("/")
  }

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

          <Button onClick={HandleLogOut} variant="light" color="red" size="xs" >Log Out</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {data.map((item, index) => (
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
        ))}
      </AppShell.Navbar>
      <AppShell.Main bg={"var(--code-bg, var(--mantine-color-gray-1))"}  >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
