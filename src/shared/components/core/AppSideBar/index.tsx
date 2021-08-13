import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaClipboardCheck, FaRss } from 'react-icons/fa';
import { AiFillGift } from 'react-icons/ai';
import { BsGearFill } from 'react-icons/bs';
import { HiCode, HiCollection } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
// import { Logo } from '@choc-ui/logo';
import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
  const { icon, path, children, ...rest } = props;
  return (
    <NavLink to={path || '/'} activeClassName="selected">
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: 'blackAlpha.300',
          color: 'whiteAlpha.900',
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >

        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: 'gray.300',
            }}
            as={icon}
          />
        )}
        {children}

      </Flex>
    </NavLink>
  );
};
export default function AppSideBar(props) {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Logo/> */}
        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          One on One
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Dashboard</NavItem>
        <NavItem path='/meeting' icon={FaRss}>Nova one-on-one</NavItem>
        <NavItem path='/member/list' icon={HiCollection}>Membros da equipe</NavItem>
        <NavItem path='/meeting/list' icon={FaClipboardCheck}>List meetings</NavItem>
        <NavItem icon={HiCode}>Integrations</NavItem>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  )
}
