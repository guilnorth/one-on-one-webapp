import { FC, useEffect } from 'react';
import { UIPage } from 'shared/components/ui/UIPage';
import {
  Box,
  Heading, 
  Spinner
} from '@chakra-ui/react';

const CreateMeeting: FC<any> = () => {
  // const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // getMembers().then();
  }, [])

  return (
    <UIPage>
      
<Box alignContent='center' justifyItems='center'>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
          Criando a sua próxima reunião com ---
        </Heading>
        </Box>
      
    </UIPage>
  );
}

export default CreateMeeting;
