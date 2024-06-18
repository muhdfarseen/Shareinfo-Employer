import { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Box,
  Button,
  PinInput,
  PasswordInput,
  Text,
  Title,
  Anchor,
} from "@mantine/core";


export const Register = ({ closefun }) => {
  const [resetPassState, setResetPassState] = useState(1);
  const [timer, setTimer] = useState(180);
  const [ThreeclickConstrain, setThreeclickConstrain] = useState(0);

  const [resendActive, setResendActive] = useState(false);
  const [timerresend, setTimerresend] = useState(0);

  const ClickConstrain = () => {
    setThreeclickConstrain((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (resetPassState === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      closefun();
    }
  }, [resetPassState, timer, closefun]);

  useEffect(() => {
    if (!resendActive) {
      const interval = setInterval(() => {
        setTimerresend((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timerresend === 0) {
        setResendActive(true);
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [resendActive, timerresend]);


  const renderContent = () => {
    switch (resetPassState) {
      case 1:
        return (
          <Flex gap={10} direction={"column"}>
            <Input.Wrapper size="xs" label="Email">
              <Input radius={"lg"} label="Email" placeholder="Email" />
            </Input.Wrapper>
            <Button
              fullWidth
              color="blue"
              radius="lg"
              onClick={() => setResetPassState(2)}
            >
              Send OTP
            </Button>
          </Flex>
        );
      case 2:
        return (
          <Flex gap={10} direction={"column"}>
            <Box>
              <Flex mb={5} justify={"space-between"}>
                <Text fw={500} size="xs">
                  Enter OTP
                </Text>
                <Text c={"blue"} fw={500} size="xs">
                  {Math.floor(timer / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(timer % 60).toString().padStart(2, "0")}
                </Text>
              </Flex>

              <PinInput
                flex={1}
                size="lg"
                placeholder=""
                radius={"sm"}
                type="number"
                length={6}
                autoFocus
              />
            </Box>

            <Button
              fullWidth
              color="blue"
              radius="lg"
              onClick={() => setResetPassState(3)}
            >
              Verify
            </Button>

            {ThreeclickConstrain <= 3 ? (
              <>
                <Text ta={"center"} fw={500} size="xs">
                  Didn't get the code?{" "}
                  <Anchor
                    ta={"center"}
                    size="xs"
                    fw={500}
                    onClick={() => {
                      if (timerresend === 0) {
                        setTimerresend(60);
                        setTimer(180);
                        setResendActive(false);
                        ClickConstrain();
                      }
                    }}
                    style={{
                      cursor: timerresend === 0 ? "pointer" : "not-allowed",
                      color: timerresend === 0 ? "" : "gray",
                    }}
                  >
                    resend
                  </Anchor>
                  {resendActive == false && (
                    <>
                      {" ("}
                      {Math.floor(timerresend / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(timerresend % 60).toString().padStart(2, "0")}
                      {")"}
                    </>
                  )}
                </Text>
              </>
            ) : (
              <>
                <Text c={"red"} ta={"center"} fw={500} size="xs">
                  You have tried 3 times, Try again in 5 minutes
                </Text>
              </>
            )}
          </Flex>
        );
      case 3:
        return (
          <>
            <Flex gap={10} direction={"column"}>
              <Input.Wrapper size="xs" flex={1} label="New Password">
                <PasswordInput
                  autoFocus
                  radius={"lg"}
                  size="sm"
                  placeholder="New Password"
                />
              </Input.Wrapper>

              <Input.Wrapper size="xs" flex={1} label="Confirm Password">
                <PasswordInput
                  radius={"lg"}
                  size="sm"
                  placeholder="Confirm Password"
                />
              </Input.Wrapper>

              <Button onClick={closefun} fullWidth color="blue" radius="lg">
                Register
              </Button>
            </Flex>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={30}>
      <Title order={5} mb={20}>
        Create Account
      </Title>
      {renderContent()}
    </Box>
  );
};
