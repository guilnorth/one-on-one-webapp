import {
    chakra, Stack, useColorModeValue, Box, Button,
    FormControl, GridItem, Input, InputGroup,
    InputLeftElement, SimpleGrid, Heading
} from '@chakra-ui/react';
import { DataStore } from 'aws-amplify';
import { Member } from 'models';
import { FC, useState } from 'react';
import { HiOutlineMail, HiOutlinePhoneIncoming } from 'react-icons/hi';
import UIFormLabel from 'shared/components/ui/UIFormLabel';

interface FormCreateMemberProps {
    onAfterSave?: any;
}
const FormCreateMember: FC<FormCreateMemberProps> = ({ onAfterSave }) => {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (event, setValue) => setValue(event.target.value)

    const onHandleCreateMember = async () => {
        const member = await DataStore.save(new Member({
            name,
            phoneNumber,
            email,
            isDisabled: false,
        }))

        if (onAfterSave) {
            onAfterSave(member);
        }
    }

    return (
        <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, 'md']}
            overflow={{ sm: 'hidden' }}
        >
            <Stack
                px={4}
                py={5}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
                p={{ sm: 6 }}
            >
                <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                    <Box px={[4, 0]}>
                        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                            Adicione um novo membro a equipe
                        </Heading>
                        {/*  <Text
                                                mt={1}
                                                fontSize="sm"
                                                color={useColorModeValue('gray.600', 'gray.400')}
                                            >
                                                Após agendar você poderá adicionar as questões e planejar a reunião.
                                            </Text> */}
                    </Box>
                </GridItem>

                <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                        <UIFormLabel text="Nome" />
                        <InputGroup>
                            <Input
                                type="text"
                                onChange={(e) => { handleChange(e, setName) }} />
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                        <UIFormLabel text="Telefone" />
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                // rounded="md"
                                children={
                                    <HiOutlinePhoneIncoming color="gray.300" />
                                }
                            />
                            <Input
                                type="tel"
                                placeholder="+55 ..."
                                onChange={(e) => { handleChange(e, setPhoneNumber) }} />
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                        <UIFormLabel text="Email" />
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                // rounded="md"
                                children={<HiOutlineMail color="gray.300" />}
                            />
                            <Input
                                type="email"
                                onChange={(e) => { handleChange(e, setEmail) }} />
                        </InputGroup>
                    </FormControl>
                </SimpleGrid>


            </Stack>
            <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue('secondary.50', 'secondary.900')}
                textAlign="right"
            >
                <Button
                    onClick={onHandleCreateMember}
                    colorScheme="primary"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                    bg={useColorModeValue('primary.50', 'primary.50')}
                >
                    Salvar
                </Button>
            </Box>
        </chakra.form>
    );
}
export default FormCreateMember;