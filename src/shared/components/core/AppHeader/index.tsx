import { FC } from 'react';
import {
  Flex, IconButton, useColorModeValue, useDisclosure,
  InputGroup, InputLeftElement, Input, Icon, Avatar
} from '@chakra-ui/react';

import { FaBell } from 'react-icons/fa';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { Auth, DataStore } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import ColorModeSwitcher from '../../../../ColorModeSwitcher';


// eslint-disable-next-line @typescript-eslint/no-empty-interface

const AppHeader: FC<any> = () => {
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
        icon={<FiMenu/>}
        size="sm"
      />
      <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
        <InputLeftElement color="gray.500" children={<FiSearch/>}/>
        <Input placeholder="Search for articles..."/>
      </InputGroup>

      <Flex align="center">
        <ColorModeSwitcher justifySelf="flex-end"/>
        <Icon color="gray.500" as={FaBell} cursor="pointer"/>
        <Avatar
          ml="4"
          size="sm"
          name="anubra266"
          src="https://avatars.githubusercontent.com/u/30869823?v=4"
          cursor="pointer"
          onClick={
            async () => {
              await Auth.signOut();
              await DataStore.clear(); 
              // window.location.reload();
              history.replace('/');
            }
          }
        />
      </Flex>
    </Flex>
  )
}

export default AppHeader;
