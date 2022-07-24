import { TapiResponse } from "../types";

export const successResponse = (response: TapiResponse) => {
  const { code, message, result } = response;
  return {
    code,
    success: true,
    message,
    ...(result ? { result } : {}),
  };
};

export const errorResponse = (response: TapiResponse) => {
  const { code, message } = response;
  return {
    code,
    success: false,
    message,
  };
};
