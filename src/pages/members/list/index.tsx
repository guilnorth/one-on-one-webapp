import { FC, useEffect, useState } from 'react';
import {


    SimpleGrid,
    GridItem,
    Box,
    Heading,
    Button,
    useDisclosure,
    Icon,
    Divider,
    Text,
} from '@chakra-ui/react';
import { UIPage } from 'shared/components/ui/UIPage';
import { Member } from 'models';
import { DataStore } from 'aws-amplify';
import { MdAdd, MdAccountBox } from 'react-icons/md';
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
                    spacing={3}
                // spacing={{ md: 6 }}
                >
                    {members.map((member: Member) => (

                        <GridItem
                            key={member.id}

                        >
                            <Box border="1px solid" borderColor="gray.400" borderRadius="lg" cursor='pointer'>
                                <Box p="2">

                                    <Box display='flex'>
                                        <Icon as={MdAccountBox} w={6} h={6} mr='1' />
                                        <Text fontSize="1xl" fontWeight="bold">
                                            {member.name}
                                        </Text>
                                    </Box>
                                    <Divider my='2' />

                                    <Text fontSize="xs" mb="2">
                                        Email: {member.email}
                                    </Text>

                                    <Text fontSize="xs" mb="6">
                                        Telefone: {member.phoneNumber}
                                    </Text>


                                </Box>
                            </Box>

                        </GridItem>
                    ))}
                </SimpleGrid>

            </SimpleGrid>
        </UIPage>
    )
}

export default ListMembers;
