import { Badge, Box, Button, Flex, Heading, SimpleGrid, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { DataStore } from 'aws-amplify';
import { MeetingSchedule } from 'models';
import { FC, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RRule } from 'rrule'
import ModalCreateMeeting from 'shared/components/module/meeting/ModalCreateMeeting';
import ModalCreateMeetingSchedule from 'shared/components/module/meeting/ModalCreateMeetingSchedule';
import { UIPage } from 'shared/components/ui/UIPage';

interface CardScheduleProps {
    schedule?: MeetingSchedule
}
const ListMeetings: FC<any> = ({ text }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenCreateMeeting,
        onOpen: onOpenCreateMeeting,
        onClose: onCloseCreateMeeting
    } = useDisclosure();
    const [schedules, setSchedules] = useState<MeetingSchedule[]>([])
    const [modalCreateMeetingParams, setModalCreateMeetingParams] = useState<any>(null);

    function getNextMeetingDate(recurrenceRule) {
        const rule = RRule.fromString(recurrenceRule);
        return rule.after(new Date())
    }

    async function getSchedules() {
        const models = await DataStore.query(MeetingSchedule);
        console.log('>>>>>>>>>>>>>>>>>>>>>',models);
        
        setSchedules(models);
    }

    useEffect(() => {
        getSchedules().then();
    }, []);


    const CardSchedule: FC<CardScheduleProps> = ({ schedule }) => {
        return (
            <Box m="8" border="1px solid" borderColor="gray.400" borderRadius="lg" cursor='pointer'>

                <Box p="4">
                    <Badge fontSize="0.6em" colorScheme="red">
                        Toda quinta, a cada 7 dias
                    </Badge>
                    <Text fontSize="1xl" fontWeight="bold">
                        {schedule?.Member?.name}
                    </Text>
                    <Text fontSize="xs" mb="6">
                        {schedule?.Member?.email}
                    </Text>
                    <Flex mb="4" direction='column'>
                        <Text fontSize="xs" fontWeight="bold">Planejadas</Text>
                        <Link to={`/meeting/planning/${schedule?.id}`}>
                            <Button size="xs" >Planejar</Button>
                        </Link>

                        <Spacer />



                    </Flex>
                    <Flex>
                        <Text fontSize="xs">Próxima reunião: {getNextMeetingDate(schedule?.recurrenceRule).toLocaleDateString()}</Text>
                        <Spacer />

                        <Button onClick={() => {
                            setModalCreateMeetingParams({
                                meetingDate: getNextMeetingDate(schedule?.recurrenceRule).toISOString(),
                                meetingScheduleID: schedule?.id,
                                memberName: schedule?.Member?.name
                            })
                            onOpenCreateMeeting()
                        }}
                            size="xs" >Planejar</Button>



                    </Flex>
                </Box>
            </Box>
        )
    }

    return (
        <UIPage>

            <ModalCreateMeeting
                isOpen={isOpenCreateMeeting}
                onOpen={onOpenCreateMeeting}
                onClose={() => {
                    onCloseCreateMeeting();
                    setModalCreateMeetingParams(null);
                }}
                meetingDate={modalCreateMeetingParams?.meetingDate}
                meetingScheduleID={modalCreateMeetingParams?.meetingScheduleID}
                memberName={modalCreateMeetingParams?.memberName}
            />
            <ModalCreateMeetingSchedule
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                updateListCallback={() => { getSchedules() }}

            />
            <SimpleGrid columns={1} spacing={4}>
                <Box d="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                            Reuniões one-on-one
                        </Heading>
                        <Text
                            mt={1}
                            fontSize="sm"
                        // color={useColorModeValue('gray.600', 'gray.400')}
                        >
                            Você pode conferir os agendamentos e iniciar o planejamento das reuniões.
                        </Text>
                    </Box>
                    <Button
                        onClick={onOpen}
                        leftIcon={<MdAdd />}
                        colorScheme="blue"
                        variant='outline'>
                        Nova one-on-one
                    </Button>
                </Box>

                <SimpleGrid
                    // display={{ base: 'initial', md: 'grid' }}
                    columns={{ sm: 2, md: 3, lg: 3, xl: 3 }}
                // spacing={{ md: 6 }}
                >
                    {schedules.map((schedule: MeetingSchedule) => (
                        <CardSchedule key={schedule.id} schedule={schedule} />
                    ))}
                </SimpleGrid>

            </SimpleGrid>
        </UIPage>
    );
}

export default ListMeetings
