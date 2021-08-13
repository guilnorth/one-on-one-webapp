import { FC } from 'react';
import {
    Box,
    useColorModeValue,
    SimpleGrid,
    GridItem,
} from '@chakra-ui/react';
import { UIPage } from 'shared/components/ui/UIPage';
import FormCreateMember from 'shared/components/module/members/FormCreateMember';
// import { MdHome } from 'react-icons/md';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateMember {

}

const CreateMember: FC<CreateMember> = () => {
    return (
        <UIPage>
            <Box bg={useColorModeValue('gray.50', 'inherit')}>
                <Box>
                    <SimpleGrid
                        display={{ base: 'initial', md: 'grid' }}
                        columns={{ md: 3, lg: 3, xl: 3 }}
                        spacing={{ md: 6 }}>
                        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <FormCreateMember />
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
        </UIPage>
    )
}

export default CreateMember;
