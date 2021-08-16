import { Badge, Box, Button, Flex, Heading, HStack, SimpleGrid, Spacer, Tag, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { DataStore } from 'aws-amplify';
import { Meeting, MeetingSchedule } from 'models';
import { FC, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { RRule } from 'rrule'
import ModalCreateMeeting from 'shared/components/module/meeting/ModalCreateMeeting';
import ModalCreateMeetingSchedule from 'shared/components/module/meeting/ModalCreateMeetingSchedule';
import { UIPage } from 'shared/components/ui/UIPage';
import { ShowDateTextResumed } from 'shared/utils/Date';
import { getLabelTag } from 'shared/utils/Meeting';

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
        console.log('>>>>>>>>>>>>>>>>>>>>>', models);

        setSchedules(models);
    }

    useEffect(() => {
        getSchedules().then();
    }, []);


    const CardSchedule: FC<CardScheduleProps> = ({ schedule }) => {
        const [meetingsSchedule, setMeetinsSchedule] = useState<Meeting[]>();

        const getMeetingsList = async () => {
            if (schedule) {
                const meetings = (await DataStore.query(Meeting, (m) =>
                    m
                        // .meetingDate('eq', meetingDate)
                        .meetingScheduleID('eq', schedule?.id)
                ));
                console.log('get list meetin schedule ::', schedule.id);

                if (meetings && meetings.length) {
                    setMeetinsSchedule(meetings)
                }
            }
        }

        useEffect(() => {
            getMeetingsList().then();
        }, [schedule]);



        return (
            <Box m="8" border="1px solid" borderColor="gray.400" borderRadius="lg" cursor='pointer'>

                <Box p="4">
                    <Badge fontSize="0.6em" colorScheme="red" flexWrap='wrap'>
                        {ShowDateTextResumed(schedule?.recurrenceRule, schedule?.startDate)}
                    </Badge>
                    <Text fontSize="1xl" fontWeight="bold">
                        {schedule?.Member?.name}
                    </Text>
                    <Text fontSize="xs" mb="6">
                        {schedule?.Member?.email}
                    </Text>
                    <Flex mb="4" direction='column'>
                        <Text fontSize="xs" fontWeight="bold">Últimas</Text>
                        {meetingsSchedule && meetingsSchedule.length && meetingsSchedule.map((meeting) => (
                            <Link key={meeting?.id} to={`/meeting/planning/${meeting?.id}`} >
                                <HStack as={Button} size="md" wrap='wrap' justifyContent='center' my={2}>
                                    <Text size="sm">{new Date(meeting?.meetingDate).toLocaleString() || ''}</Text>
                                    <Tag
                                       
                                        size='sm'
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="green"
                                    >
                                        <TagLabel>{getLabelTag(meeting)}</TagLabel>
                                    </Tag>
                                </HStack>
                            </Link>
                        ))}

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
                <SimpleGrid alignItems="center" justifyContent="space-between" columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}>
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
                    <Box justifySelf='flex-end'>
                        <Button

                            onClick={onOpen}
                            leftIcon={<MdAdd />}
                            colorScheme="blue"
                            variant='outline'>
                            Nova one-on-one
                        </Button>
                    </Box>
                </SimpleGrid>

                <SimpleGrid
                    // display={{ base: 'initial', md: 'grid' }}
                    columns={{ sm: 1, md: 1, lg: 3, xl: 3 }}
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
