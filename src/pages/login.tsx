import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Flex, Text } from "@chakra-ui/layout";

import ControlledInputField from "../components/shared/ControlledInputField";
import { OutlinedButton, FilledAuthButton } from "../components/shared/Button";
import AuthTemplate from "../components/AuthTemplate";
import { EMAIL } from "../lib/regex";
import { TLogin } from "../types";

function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm<TLogin>({
    defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const submitForm = () => {
    // e.preventDefault();
    setIsLoading(true);

    // await auth(data);
    setIsLoading(false);
    router.push("/");
  };

  const loginForm = (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Text fontSize="14px" fontWeight="bold" mb="1.5rem" textAlign="center">
          To continue, log in to uphits.
        </Text>
        <ControlledInputField
          name="email"
          control={control}
          label="Email address"
          placeholder="Email address"
          rules={{
            required: "Please enter your email address.",
            pattern: { value: EMAIL, message: "Invalid Email" },
          }}
        />
        <ControlledInputField
          name="password"
          control={control}
          label="Password"
          placeholder="Password"
          typeOfInput="password"
          rules={{ required: "Password is required" }}
        />
        <Flex
          justifyContent="flex-end"
          borderBottom="2px solid rgb(217, 218, 220)"
        >
          <FilledAuthButton
            text="LOG IN"
            buttonType="submit"
            loadingState={isLoading}
          />
        </Flex>
      </form>

      <Text textAlign="center" fontSize="1rem" fontWeight="bold" mt="2rem">
        Don't have an account?
      </Text>

      <OutlinedButton
        text="SIGN UP FOR UPHITS"
        handleOnClick={() => router.push("/signup")}
      />
    </>
  );

  return <AuthTemplate form={loginForm} />;
}

Login.authPage = true;
export default Login;
