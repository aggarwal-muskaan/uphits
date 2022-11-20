import React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { MdHomeFilled, MdSearch, MdAddBox, MdFavorite } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { IconContext } from "react-icons";

import { usePlaylist } from "../../lib/customHooks";

function Sidebar() {
  const navMenu = [
    {
      id: "01",
      label: "Home",
      icon: MdHomeFilled,
      route: "/",
    },
    {
      id: "02",
      label: "Search",
      icon: MdSearch,
      route: "/search",
    },
    {
      id: "03",
      label: "Your Library",
      icon: BiLibrary,
      route: "/library",
    },
  ];

  const createMenu = [
    { id: "1", label: "Create Playlist", icon: MdAddBox, route: "/" },
    { id: "2", label: "Liked Songs", icon: MdFavorite, route: "/" },
  ];

  const styles = React.useMemo(() => ({ color: "#4db6ac", size: "100%" }), []);

  const { playlists, isLoading, isError } = usePlaylist();

  return (
    <>
      <Link href="/" passHref>
        <a>
          <Flex w="100%" h="60px" mb="18px" display="flex" alignItems="center">
            <Box w="50px" h="100%" ml="2rem">
              <IconContext.Provider value={styles}>
                <BsMusicNoteList />
              </IconContext.Provider>
            </Box>
            <Text fontSize="3xl" ml="0.5rem" color="teal.300" fontWeight="bold">
              uphits
            </Text>
          </Flex>
        </a>
      </Link>

      <Box w="100%" px="8px" mb="24px">
        <List spacing={2}>
          {navMenu.map((l) => (
            <Link href={l.route} passHref key={l.id}>
              <a>
                <ListItem
                  fontSize="14px"
                  p="5px 16px"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ color: "white" }}
                >
                  <ListIcon
                    as={l.icon}
                    color="white"
                    marginRight="17px"
                    w="28px"
                    h="28px"
                  />
                  <Text fontWeight="700">{l.label}</Text>
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Box>

      <Box mb="24px">
        <List spacing={2}>
          {createMenu.map((l) => (
            <Link href={l.route} passHref key={l.id}>
              <a>
                <Tooltip hasArrow label="Coming soon..." placement="right-end">
                  <ListItem
                    fontSize="14px"
                    p="5px 26px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    _hover={{ color: "white" }}
                  >
                    <ListIcon
                      as={l.icon}
                      color="white"
                      marginRight="17px"
                      w="28px"
                      h="28px"
                    />
                    <Text fontWeight="700">{l.label}</Text>
                  </ListItem>
                </Tooltip>
              </a>
            </Link>
          ))}
        </List>
      </Box>

      <Divider color="gray.800" />

      {/* show if user is login */}
      <Box
        height="44%"
        overflowY="auto"
        paddingY="20px"
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            // background: theme.colors.grey,
            borderRadius: "24px",
          },
        }}
      >
        <List spacing={2}>
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={{
                pathname: "/playlist/[id]",
                query: { id: playlist.id },
              }}
              passHref
            >
              <a>
                <ListItem p="5px 29px" _hover={{ color: "white" }}>
                  {playlist.name}
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
