import React, { useState } from "react";

export const useInput = (initialValue: {}): [
  any,
  React.ChangeEventHandler<HTMLInputElement>,
  (x: string) => void
] => {
  const [state, setState] = useState(initialValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const resetInputFields = (name: string) => {
    setState({ ...state, [name]: "" });
  };

  return [state, handleInputChange, resetInputFields];
};
