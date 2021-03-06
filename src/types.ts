export type TAuthTemplate = {
  form: JSX.Element;
};

export type TButton = {
  text: string;
  handleOnClick?: React.MouseEventHandler<HTMLElement>;
  loadingState?: boolean;
  buttonType?: "button" | "reset" | "submit";
};

export type TLogin = {
  email: string;
  password: string;
};

export type TSignup = {
  email: string;
  confirmEmail: string;
  newPassword: string;
  profileName: string;
};

export type TapiResponse = {
  code: number;
  message: string;
  result?: unknown;
};
