import { Artist, Playlist, Song } from "@prisma/client";

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

export type TSongsTable = {
  songs: Song & {
    artist: {
      name: string;
      id: number;
    };
  };
};

export type TUserPlaylist = {
  playlist: Playlist & {
    songs: TSongsTable["songs"][];
  };
};

export type TArtistCollection = Artist & {
  song: Song[];
};
