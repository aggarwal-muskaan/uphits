import Link from "next/link";
import { useForm } from "react-hook-form";
import { Flex, Heading, Text } from "@chakra-ui/layout";

import AuthTemplate from "../components/AuthTemplate";
import ControlledInputField from "../components/shared/ControlledInputField";
import { FilledAuthButton } from "../components/shared/Button";
import { TSignup } from "../types";

function Signup() {
  const { control } = useForm<TSignup>({
    defaultValues: {
      email: "",
      confirmEmail: "",
      newPassword: "",
      profileName: "",
    },
    mode: "all",
  });

  const signupForm = (
    <>
      <Heading
        fontSize="30px"
        fontWeight="700"
        letterSpacing="-0.04em"
        mb="1.5rem"
        textAlign="center"
      >
        Sign up for free to start listening.
      </Heading>
      <form>
        <ControlledInputField
          name="email"
          control={control}
          label="What's your email?"
          placeholder="Enter your email."
          rules={{ required: "You need to enter your email." }}
        />
        <ControlledInputField
          name="confirmEmail"
          control={control}
          label="Confirm your email?"
          placeholder="Enter your email again."
          rules={{ required: "You need to confirm your email." }}
        />
        <ControlledInputField
          name="newPassword"
          control={control}
          label="Create a password"
          placeholder="Create a password."
          typeOfInput="password"
          rules={{ required: "You need to enter a password." }}
        />
        <ControlledInputField
          name="profileName"
          control={control}
          label="What should we call you?"
          placeholder="Enter a profile name."
          rules={{ required: "Enter a name for your profile." }}
        />
        <Flex justifyContent="center">
          <FilledAuthButton text="Sign up" />
        </Flex>
      </form>
      <Text
        color="black"
        fontSize="16px"
        fontWeight="bold"
        mb="1.5rem"
        textAlign="center"
      >
        Have an account?&nbsp;
        <Link href="/login">
          <a style={{ color: "teal", textDecoration: "underline" }}>Log in</a>
        </Link>
        .
      </Text>
    </>
  );

  return <AuthTemplate form={signupForm} />;
}

Signup.authPage = true;
export default Signup;
