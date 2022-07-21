import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Flex, Heading, Text } from "@chakra-ui/layout";

import AuthTemplate from "../components/AuthTemplate";
import ControlledInputField from "../components/shared/ControlledInputField";
import { FilledAuthButton } from "../components/shared/Button";
import { EMAIL, TRIM_STRING } from "../lib/regex";
import { TSignup } from "../types";

function Signup() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { control, handleSubmit, watch, setError, clearErrors } =
    useForm<TSignup>({
      defaultValues: {
        email: "",
        confirmEmail: "",
        newPassword: "",
        profileName: "",
      },
      mode: "all",
    });
  const email = watch("email");
  const reEmail = watch("confirmEmail");

  useEffect(() => {
    if (reEmail.length !== 0 && email !== reEmail)
      setError("confirmEmail", {
        type: "value",
        message: "Email does not match",
      });
    else if (reEmail.length !== 0 && email === reEmail)
      clearErrors("confirmEmail");
  }, [email]);

  const submitForm = () => {
    // e.preventDefault();
    setIsLoading(true);

    // await auth(data);
    setIsLoading(false);
    alert("oops!!");
    // router.push("/");
  };

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
      <form onSubmit={handleSubmit(submitForm)}>
        <ControlledInputField
          name="email"
          control={control}
          label="What's your email?"
          placeholder="Enter your email."
          rules={{
            required: "You need to enter your email.",
            pattern: { value: EMAIL, message: "Invalid Email" },
          }}
        />
        <ControlledInputField
          name="confirmEmail"
          control={control}
          label="Confirm your email?"
          placeholder="Enter your email again."
          rules={{
            required: "You need to confirm your email.",
            validate: (reEmail) => reEmail === email || "Email does not match",
          }}
        />
        <ControlledInputField
          name="newPassword"
          control={control}
          label="Create a password"
          placeholder="Create a password."
          typeOfInput="password"
          rules={{
            required: "You need to enter a password.",
          }}
        />
        <ControlledInputField
          name="profileName"
          control={control}
          label="What should we call you?"
          placeholder="Enter a profile name."
          rules={{
            required: "Enter a name for your profile.",
            pattern: {
              value: TRIM_STRING,
              message: "Profile name must start with a letter",
            },
          }}
        />
        <Flex justifyContent="center">
          <FilledAuthButton
            text="Sign up"
            buttonType="submit"
            loadingState={isLoading}
          />
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
