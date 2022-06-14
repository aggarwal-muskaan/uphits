import Link from "next/link";
import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  LinkOverlay,
  LinkBox,
  Text,
} from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { IconContext } from "react-icons";

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

  return (
    <>
      <Link href="/" passHref>
        <a>
          <Flex w="100%" h="60px" mb="18px" display="flex" alignItems="center">
            <Box w="50px" h="100%" ml="2rem">
              <IconContext.Provider value={{ color: "#4db6ac", size: "100%" }}>
                <BsMusicNoteList />
              </IconContext.Provider>
            </Box>
            <Text fontSize={"3xl"} ml="0.5rem" color="teal.300">
              uphits
            </Text>
          </Flex>
        </a>
      </Link>

      <Box w="100%" px="8px" mb="24px">
        <List spacing={2}>
          {navMenu.map((l) => (
            <Link href={l.route} passHref>
              <a>
                <ListItem
                  fontSize="14px"
                  key={l.id}
                  p="8px 16px"
                  w="100%"
                  display="flex"
                  alignItems="center"
                >
                  <ListIcon
                    as={l.icon}
                    color="white"
                    marginRight="17px"
                    w="28px"
                    h="28px"
                  />
                  <Text>{l.label}</Text>
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Box>

      <Box>Create playlist & wishlist</Box>
    </>
  );
}

export default Sidebar;
