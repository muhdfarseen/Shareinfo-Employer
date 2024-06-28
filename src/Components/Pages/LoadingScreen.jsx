import React from "react";
import { Loader, Flex } from "@mantine/core";

export const LoadingScreen = () => {

  return (
    <div>
      <Flex h={"100vh"} justify={"center"} align={"center"}>
        <Loader color="blue" type="dots" />
      </Flex>
    </div>
  );
};
