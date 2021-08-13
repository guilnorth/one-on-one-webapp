import { Box, useColorModeValue } from '@chakra-ui/react';

export const UIPage = ({ children }) => {
  return (
    <Box
      h='100%'
      as='section'
      bg={useColorModeValue('white', 'gray.700')}
      minH='80vh'
      // borderWidth='4px'
      shadow='base'
      rounded='md'
      overflow={{ sm: 'hidden' }}
      px={4}
      py={5}
      // spacing={6}
      p={{ sm: 6 }}
    >
      {children}
    </Box>
  )
}
