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
import axiosInstance from "../../Helpers/axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const Register = ({ closefun }) => {
  const [resetPassState, setResetPassState] = useState(1);
  const [timer, setTimer] = useState(180);
  const [ThreeclickConstrain, setThreeclickConstrain] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Employer");

  const [resendActive, setResendActive] = useState(false);
  const [timerresend, setTimerresend] = useState(0);

  const navigate = useNavigate();

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

  const handleSendOtp = async () => {
    try {
        const response = await axiosInstance.post("/signup/", { email });
        if (response.status === 200) {
            setResetPassState(2);
            setTimer(180);
            toast.success("A verification code has been sent to your email address.");
            toast.info("Please check your spam or junk folder if you haven't received the OTP in your inbox");

            

        }
    } catch (error) {
      toast.error("Error sending OTP");

        // console.error("Error sending OTP:", error);
    }
};

const handleVerifyOtp = async () => {
    try {
        const response = await axiosInstance.post("/otp-verify/", { otp });
        if (response.status === 200) {
            setResetPassState(3);
            toast.success("OTP verified successfully");

        }
    } catch (error) {
        // console.error("Error verifying OTP:", error);
        toast.error("Error verifying OTP");

    }
};

const handleRegister = async () => {
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    try {
        const response = await axiosInstance.post("/password/", {
            password,
            user_type: userType,
        });

        console.log("out",password)

        if (response.status === 200) {
          const { access_token, refresh_token, is_profile_created, full_name } = response.data;
  
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('full_name', full_name);
          localStorage.setItem('is_profile_created', "false");
          localStorage.setItem("email", email);
  
          navigate("dashboard/home");
        }
    } catch (error) {
        toast.error("Error creating password");
        console.error("Error creating password:", error);
    }
};


  const renderContent = () => {
    switch (resetPassState) {
      case 1:
        return (
          <Flex gap={10} direction={"column"}>
            <Input.Wrapper size="xs" label="Email">
              <Input
                radius={"lg"}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input.Wrapper>
            <Button fullWidth color="blue" radius="lg" onClick={handleSendOtp}>
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

              <Input
                radius={"lg"}
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Box>

            <Button
              fullWidth
              color="blue"
              radius="lg"
              onClick={handleVerifyOtp}
            >
              Verify
            </Button>

            {ThreeclickConstrain <= 3 ? (
              <>

                <Text fw={500} size="sm" ta={"center"}>
                  Didn't get the code?{" "}
                  <Anchor
                    ta={"center"}
                    size="sm"
                    fw={500}
                    onClick={() => {
                      if (timerresend === 0) {
                        setTimerresend(60);
                        setTimer(180);
                        setResendActive(false);
                        ClickConstrain();
                        handleSendOtp()
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
                  {/* <Text mt={5} ta={"center"} c={"dimmed"} fw={500} size="xs" > Please check your spam or junk folder if you haven't received the OTP in your inbox.</Text> */}

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
              <Input.Wrapper size="xs" flex={1} label="Create Password">
                <PasswordInput
                  autoFocus
                  radius={"lg"}
                  size="sm"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Input.Wrapper>

              <Input.Wrapper size="xs" flex={1} label="Confirm Password">
                <PasswordInput
                  radius={"lg"}
                  size="sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Input.Wrapper>

              <Button
                onClick={handleRegister}
                fullWidth
                color="blue"
                radius="lg"
              >
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
