import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Menu,
  Button
} from "@chakra-ui/react";
import React from "react";
import "./header.scss";
import { useDisclosure } from "@chakra-ui/hooks";
import { ImMenu } from "react-icons/im";

import { useNavigate } from "react-router-dom";
import './header.scss'
function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate()

  return (
    <div>
      <Box className="app_header">
        <ImMenu className="menu_button" onClick={onOpen} />
        <Text fontSize={"2xl"} fontFamily="-moz-initial">
          Travellia-{module.name}
        </Text>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <Avatar name="Dan Abrahmov" size={'sm'} src="https://bit.ly/dan-abramov" />
            }
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem >Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          {/* <ModuleSelector /> */}
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;