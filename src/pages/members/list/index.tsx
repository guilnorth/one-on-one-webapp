import { FC, useEffect, useState } from 'react';
import {


    SimpleGrid,
    GridItem,
    Box,
    Heading,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { UIPage } from 'shared/components/ui/UIPage';
import { Member } from 'models';
import { DataStore } from 'aws-amplify';
import { MdAdd } from 'react-icons/md';
import ModalCreateMember from 'shared/components/module/members/ModalCreateMember';
// import { MdHome } from 'react-icons/md';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ListMembersProps {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListMembers: FC<ListMembersProps> = () => {

    const [members, setMembers] = useState<Member[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    async function getMembers() {
        const models = await DataStore.query(Member);
        setMembers(models);
    }

    useEffect(() => {
        getMembers().then();
    }, []);

    return (
        <UIPage>
            <ModalCreateMember
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                updateListCallback={() => { getMembers() }}
            />

            <SimpleGrid columns={1} spacing={4}>
                <Box d="flex" alignItems="center" justifyContent="space-between">
                    <Heading>Membros da equipe</Heading>
                    <Button
                        onClick={onOpen}
                        leftIcon={<MdAdd />}
                        colorScheme="blue"
                        variant='outline'>
                        Novo membro
                    </Button>
                </Box>

                <SimpleGrid
                    // display={{ base: 'initial', md: 'grid' }}
                    columns={{ sm: 2, md: 3, lg: 3, xl: 3 }}
                // spacing={{ md: 6 }}
                >
                    {members.map((member: Member) => (
                        <GridItem
                            key={member.id}
                            _hover={{ bg: "teal.600" }}
                            mt={5}
                        >
                            {member.name}
                        </GridItem>
                    ))}
                </SimpleGrid>

            </SimpleGrid>
        </UIPage>
    )
}

export default ListMembers;
