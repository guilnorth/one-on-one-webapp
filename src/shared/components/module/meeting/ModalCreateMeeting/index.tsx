import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import { DataStore } from 'aws-amplify';
import { Meeting } from 'models';
import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UIModal from 'shared/components/ui/UIModal';

interface ModalCreateMeetingProps {
    isOpen?: any;
    onClose?: any;
    onOpen?: any;
    meetingDate?: any;
    meetingScheduleID: string;
    memberName: string;
}

const ModalCreateMeeting: FC<ModalCreateMeetingProps> =
    ({ isOpen = false, onClose, onOpen, meetingDate, meetingScheduleID, memberName }) => {

        const history = useHistory();

        async function searchMeetingDate() {
            const meeting = (await DataStore.query(Meeting, (m) =>
                m
                    .meetingDate('eq', meetingDate)
                    .meetingScheduleID('eq', meetingScheduleID)
            ));

            if (meeting && meeting.length) {
                // redirect
                return history.push(`/meeting/planning/${meeting[0].id}`);

            }

            const meetingCreated = await DataStore.save(new Meeting({
                meetingDate,
                isDisabled: false,
                meetingScheduleID,
            }));

            if (meetingCreated) {
                return history.push(`/meeting/planning/${meetingCreated.id}`);
            }

            return false;

        }

        useEffect(() => {
            if (meetingScheduleID && meetingDate) {
                searchMeetingDate();
            }
        }, [meetingScheduleID, meetingDate]);

        return (
            <UIModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                closeOnOverlayClick={false}
                isCentered
            // modalTitle="Crie um novo membro para a sua equipe"
            >
                <Box>
                    <Center mt="8">
                        <Heading
                            fontSize="lg"
                            fontWeight="md"
                            lineHeight="6"
                            mb="8">
                            Criando a sua próxima reunião com {memberName}
                        </Heading>
                    </Center>
                    <Center>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Center>
                </Box>
            </UIModal>
        );
    }

export default ModalCreateMeeting