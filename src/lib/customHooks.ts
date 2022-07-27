import { Playlist } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "./fetcher";

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

export const useUser = () => {
  const { data, error } = useSWR("/me", fetcher);

  return { user: data, isLoading: !data && !error, isError: error };
};

export const usePlaylist = () => {
  const { data, error } = useSWR(["GET", "/playlist"], fetcher);

  let playlists: Playlist[];
  if (data && data.code === 200) playlists = data.result;
  else playlists = [];

  return {
    playlists,
    isLoading: !data && !error,
    isError: error || (data && data.code !== 200),
  };
};
