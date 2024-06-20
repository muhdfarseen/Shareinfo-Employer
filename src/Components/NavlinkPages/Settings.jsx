import { Title, Card, Select, Text, Modal, Image, SimpleGrid, Button, Group, Box, FileInput, Badge, ActionIcon, Flex, Radio, Switch, Pill } from '@mantine/core';
import { IconPasswordUser, IconExternalLink, IconArticle, IconShieldCheck } from '@tabler/icons-react';


export const Settings = () => {
    return (
        <>
            <Title order={3} >Settings</Title>
            <SimpleGrid
                mt={10}
                cols={{ base: 1, sm: 1, lg: 1 }}
                spacing={{ base: 'md', sm: 'md' }}
                verticalSpacing={{ base: 'md', sm: 'md' }}
            >
                <Card className='hoverclassscale' radius={"md"} withBorder >
                    <Flex align={"center"} justify={"space-between"} >
                        <Group>
                            <IconPasswordUser size={18} />
                            Reset Password
                        </Group>
                        <IconExternalLink color='blue' size={18} />
                    </Flex>
                </Card>

                <Card className='hoverclassscale' radius={"md"} withBorder >
                    <Flex align={"center"} justify={"space-between"} >
                        <Group>
                            <IconArticle size={18} />
                            Terms & Conditions
                        </Group>
                        <IconExternalLink color='blue' size={18} />
                    </Flex>
                </Card>

                <Card className='hoverclassscale' radius={"md"} withBorder >
                    <Flex align={"center"} justify={"space-between"} >
                        <Group>
                            <IconShieldCheck size={18} />
                            Privacy Policy & Terms
                        </Group>
                        <IconExternalLink color='blue' size={18} />
                    </Flex>
                </Card>
            </SimpleGrid>
        </>
    )
}
