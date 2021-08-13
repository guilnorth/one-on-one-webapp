import { Box, useColorModeValue } from '@chakra-ui/react';
import AppContent from '../AppContent';
import AppSideBar from '../AppSideBar';
import AppHeader from '../AppHeader';

export default function AppLayout() {

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', '#2a4365')}
      minH="100vh"
    >
      <AppSideBar display={{ base: 'none', md: 'unset' }} />

      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <AppHeader />

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}

          <AppContent />

        </Box>
      </Box>
    </Box>
  );
}
