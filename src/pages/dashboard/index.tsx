import { FC } from 'react';
import {
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardProps {

}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <Box
      as="section"
      bg={useColorModeValue('#FFF', '#FFF')}
      minH="60vh"
      borderWidth="4px"
      rounded='md'
    >
      <Text fontSize="6xl" color={useColorModeValue('gray.800', 'gray.800')}>(6xl) In love with React & Next</Text>
    </Box>
  )
}

export default Dashboard;
