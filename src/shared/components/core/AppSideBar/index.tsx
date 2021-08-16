import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FaClipboardCheck } from 'react-icons/fa';
import { HiCollection } from 'react-icons/hi';
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
        // color="whiteAlpha.700"
        _hover={{
          bg: useColorModeValue('primary.300', 'primary.300'),
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
        <Text fontSize="2xl" ml="2"  fontWeight="semibold">
          One-on-one
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Dashboard</NavItem>
        <NavItem path='/meeting/list' icon={FaClipboardCheck}>Agenda</NavItem>
        <NavItem path='/member/list' icon={HiCollection}>Membros da Equipe</NavItem>
      </Flex>
    </Box>
  )
}
