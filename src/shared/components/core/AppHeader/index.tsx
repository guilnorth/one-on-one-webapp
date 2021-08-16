import { FC } from 'react';
import {
  Flex, IconButton, useColorModeValue, useDisclosure,
  Box, Icon, Avatar, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';

import { FaBell } from 'react-icons/fa';
import { FiMenu, } from 'react-icons/fi';
import { Auth, DataStore } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import ColorModeSwitcher from '../../../../ColorModeSwitcher';


// eslint-disable-next-line @typescript-eslint/no-empty-interface

const AppHeader: FC<any> = () => {

  const logout = async () => {
    await Auth.signOut();
    await DataStore.clear();
    console.log(history);
    
    // simple relod Amplify
   // if (history.location.pathname === '/')
      window.location.reload()
   // return history.replace('/');

  }

  const sidebar = useDisclosure();
  const history = useHistory();
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      bg={useColorModeValue('white', 'gray.800')}
      borderBottomWidth="1px"
      borderColor="blackAlpha.300"
      h="14"
    >
      <IconButton
        aria-label="Menu"
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={sidebar.onOpen}
        icon={<FiMenu />}
        size="sm"
      />
      <Box w="96" display={{ base: 'none', md: 'flex' }} />

      <Flex align="center">
        <ColorModeSwitcher justifySelf="flex-end" />
        <Icon color="gray.500" as={FaBell} cursor="pointer" />
        <Menu>
          <MenuButton>
            <Avatar
              ml="4"
              size="sm"
              name=""
              cursor="pointer"
              onClick={logout}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Sair</MenuItem>
          </MenuList>
        </Menu>

      </Flex>
    </Flex>
  )
}

export default AppHeader;
