import React from "react";
import {
    Card,
    Text,
    SimpleGrid,
    Flex,
    useMantineTheme,
} from "@mantine/core";
import {
    IconUsers,
    IconBriefcase,
    IconCalendarStats,
    IconChecklist,
    IconSettings,
} from "@tabler/icons-react";
import classes from "./Home.module.css";
import { useNavigate } from 'react-router-dom';

const mockdata = [
    { title: "Post New Job", icon: IconUsers, color: "indigo", linkto: "newjob" },
    { title: "Manage Jobs", icon: IconBriefcase, color: "blue", linkto: "managejob" },
    { title: "My Profile", icon: IconCalendarStats, color: "green", linkto: "myprofile" },
    { title: "Settings", icon: IconChecklist, color: "teal", linkto: "settings" },
    { title: "Support", icon: IconSettings, color: "cyan", linkto: "" },
];

export const Home = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const handleNavigation = (linkto, index) => {
        if (linkto) {
            localStorage.setItem("activeIndex", index);
            navigate(`/dashboard/${linkto}`);
        } else {
            const mailtoLink = document.createElement('a');
            mailtoLink.href = "mailto:support@imiot.co.in";
            mailtoLink.target = "_blank";
            mailtoLink.click();
        }
    };

    const items = mockdata.map((item, index) => (
        <Card
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
            <Flex w={"100%"} h={"100%"}>
                <SimpleGrid
                    w={"100%"}
                    h={"calc(100dvh - 120px)"}
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
