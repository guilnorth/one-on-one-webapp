import { FC, useEffect, useState } from 'react';
import {
    chakra,
    Box,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Text,
    Stack,
    FormControl,
    InputGroup,
    Button,
    RadioGroup,
    Radio
} from '@chakra-ui/react';
import DatePicker from 'shared/components/ui/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from "react-datepicker";
import { RRule } from 'rrule'
import { DateToUTC } from 'shared/utils/Date';
import { DataStore } from 'aws-amplify';
import { Member, MeetingSchedule } from 'models';
import UIFormLabel from 'shared/components/ui/UIFormLabel';
import Select from 'react-select';

registerLocale('pt-BR', ptBR);

interface FormCreateMeetingScheduleProps {
    onAfterSave?: any;
}

const UIFormTextHint: FC<any> = ({ text }) => {
    return (
        <Text
            fontSize="sm"
            color={useColorModeValue('gray.500', 'gray.400')}
        >
            {text}
        </Text>
    );
}

const AutocompleteMembersList: FC<any> = ({ membersList, setSelectedMember }) => {


    return (
        <Select
            // defaultValue={selectedOption}
            onChange={setSelectedMember}
            options={membersList}
            isClearable
            isSearchable
            getOptionLabel={(member: Member) => `${member.name} - ${member.email}`}
            getOptionValue={(member: Member) => member}
            noOptionsMessage={() => "Cadastre algum membro na equipe antes"} 
            option
        />
    )
}

const FormCreateMeetingSchedule: FC<FormCreateMeetingScheduleProps> = ({ onAfterSave }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [daysInterval, setDaysInterval] = useState<number>(7);
    const [memberMeeting, setMemberMeeting] = useState<Member>();
    const [membersList, setMembersList] = useState<Member[]>([]);


    const registerRRule = () => {
        // setStartDate(date);
        const rule = new RRule({
            freq: RRule.DAILY,
            dtstart: DateToUTC(startDate),
            tzid: 'America/Sao_Paulo',
            interval: daysInterval,
        });

        return rule.toString();
    }

    const createMeetingSchedule = async () => {
        if (memberMeeting) {
            const rrule = registerRRule();
            const schedule = await DataStore.save(new MeetingSchedule({
                startDate: startDate.toISOString(),
                recurrenceRule: rrule,
                Member: memberMeeting,
                isDisabled: false,
            }));

            if (onAfterSave) {
                return onAfterSave(schedule);
            }
        }
        return false;
    }


    async function getMembers() {
        const models = await DataStore.query(Member);
        setMembersList(models);
    }

    useEffect(() => {
        getMembers().then();
    }, [])

    return (
        <chakra.form>
            <Stack spacing={6} >
                <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                    <Box px={[4, 0]}>
                        <Text
                            mt={1}
                            fontSize="sm"
                            color={useColorModeValue('gray.600', 'gray.400')}
                        >
                            Após agendar você poderá adicionar as questões e planejar a reunião.
                        </Text>
                    </Box>
                </GridItem>

                <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                        <UIFormLabel text="Membro da equipe" />
                        <AutocompleteMembersList membersList={membersList} setSelectedMember={setMemberMeeting} />
                    </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={1} spacing={4}>
                    <FormControl as={GridItem} >
                        <UIFormLabel text="Escolha uma data para iniciar:" />
                        <InputGroup size="sm">
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                locale="pt-BR"
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl as={GridItem} >
                        <UIFormLabel text="Esta one-on-one irá ocorrer a cada: " />
                        <InputGroup size="sm">
                            <RadioGroup
                                fontSize="sm"
                                color={useColorModeValue('gray.700', 'gray.50')}
                                colorScheme="primary"
                                mt={4}
                                defaultValue="7"
                                onChange={(value) => { setDaysInterval(+value) }}
                            >
                                <Stack spacing={4}>
                                    <Radio spacing={3} value="7">
                                        A cada 7 dias
                                    </Radio>
                                    <Radio spacing={3} value="15">
                                        A cada 15 dias
                                    </Radio>
                                    <Radio spacing={3} value="30">
                                        A cada 30 dias
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </InputGroup>
                    </FormControl>

                    <UIFormTextHint text="O intervalo pode ser alterado no futuro" />

                </SimpleGrid>
            </Stack>
            <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                textAlign="right"
            >
                <Button
                    onClick={createMeetingSchedule}
                    colorScheme="primary"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                >
                    Agendar
                </Button>
            </Box>
        </chakra.form>
    );
}

export default FormCreateMeetingSchedule;
