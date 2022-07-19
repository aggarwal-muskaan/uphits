import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
  Path,
  PathValue,
} from "react-hook-form";

export interface IInputProps<T> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  typeOfInput?: HTMLInputTypeAttribute;
  rules?: UseControllerProps["rules"];
  defaultValue?: PathValue<T, Path<T>>;
}

const ControlledInputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  typeOfInput,
  rules,
  defaultValue,
}: IInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        console.log("hellooo", error);
        return (
          <FormControl isInvalid={!!error} mb="1rem">
            <FormLabel
              htmlFor="name"
              key={name}
              fontSize="14px"
              fontWeight="bold"
            >
              {label}
            </FormLabel>
            <Input
              type={typeOfInput || "text"}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              p="14px"
              h="50px"
              w="100%"
              fontSize="1rem"
              fontWeight="400"
              borderColor="gray.500"
              _hover={{ borderColor: "unset" }}
              _placeholder={{ color: "gray.600" }}
              _focus={{
                border: "2px solid black",
              }}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
};

export default ControlledInputField;
