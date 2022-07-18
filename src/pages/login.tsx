import { Flex, Text } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import AuthTemplate from "../components/AuthTemplate";
import ControlledInputField from "../components/shared/ControlledInputField";
import { OutlinedButton, FilledAuthButton } from "../components/shared/Button";

function Login() {
  const { control } = useForm();
  const loginForm = (
    <>
      <form>
        <Text fontSize="14px" fontWeight="bold" mb="1.5rem" textAlign="center">
          To continue, log in to uphits.
        </Text>
        <ControlledInputField
          name="email"
          control={control}
          label="Email address"
          placeholder="Email address"
          rules={{ required: "Please enter your email address." }}
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
          <FilledAuthButton text="LOG IN" />
        </Flex>
      </form>

      <Text textAlign="center" fontSize="1rem" fontWeight="bold" mt="2rem">
        Don't have an account?
      </Text>

      <OutlinedButton text="SIGN UP FOR UPHITS" />
    </>
  );

  return <AuthTemplate form={loginForm} />;
}

Login.authPage = true;
export default Login;
