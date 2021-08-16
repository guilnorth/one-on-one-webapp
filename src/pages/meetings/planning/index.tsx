import {
    Box, Button, chakra, Divider, Flex, GridItem, Heading, SimpleGrid,
    Stack, Tag, TagLabel, Text, useDisclosure, VStack, // useDisclosure 
} from '@chakra-ui/react';
import { DataStore } from 'aws-amplify';
import { Meeting, MeetingQuestion, MeetingSchedule, Question, QuestionCategory } from 'models';
import { FC, useEffect, useState } from 'react';
// import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ModalAddQuestions from 'shared/components/module/meeting/ModalAddQuestions';

import { UIPage } from 'shared/components/ui/UIPage';

// import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import { getLabelTag } from 'shared/utils/Meeting';
import { ShowDateText } from 'shared/utils/Date';
import initialContent from 'shared/utils/EditorDefault.json';

interface RenderQuestionCategoriesProps {
    questionCategory?: QuestionCategory;
    onClickCallback?: any;
}

interface RouteParams {
    idMeeting?: string
}


const PlanningMeetings: FC<any> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [meetingSchedule, setSchedule] = useState<MeetingSchedule>();
    const [meeting, setMeeting] = useState<Meeting>();
    const [questionCategories, setQuestionCategories] = useState<QuestionCategory[]>([])
    const [categorySelected, setCategorySelected] = useState<string>();
    const [meetingQuestions, setMeetingQuestions] = useState<Question[]>([]);
    // const [meeting, setMeeting] = useState<Meeting>()
    // @todo
    const { idMeeting } = useParams<RouteParams>();

    /* function getNextMeetingDate(recurrenceRule) {
        if (recurrenceRule) {
            const rule = RRule.fromString(recurrenceRule);
            return rule.after(new Date())
        }
        return new Date();
    } */

    async function getSchedule(idSchedule: string) {
        const model = await DataStore.query(MeetingSchedule, idSchedule);

        setSchedule(model);
    }

    async function getQuestionsMeetingDb(meetingId: string) {
        const questionsDb = (await DataStore.query(MeetingQuestion))
            .filter(mq => mq.meeting.id === meetingId)
            .map(mq => mq.question);
        console.log('questions from DB: ', questionsDb);
        setMeetingQuestions(questionsDb);

    }

    async function getMeeting() {
        if (idMeeting) {
            const model = await DataStore.query(Meeting, idMeeting);
            console.log('meeting::', model);
            console.log('questions::', model?.MeetingQuestions);

            if (model && model.meetingScheduleID) {
                setMeeting(model);
                getSchedule(model.meetingScheduleID)
                getQuestionsMeetingDb(idMeeting)
            }

            // get 
        } else {
            console.log('an?');

        }
    }



    async function getQuestionCategories() {
        const model = await DataStore.query(QuestionCategory)
        setQuestionCategories(model);
    }

    const RenderQuestionCategories: FC<RenderQuestionCategoriesProps> = ({ questionCategory, onClickCallback }) => {
        return (
            <Box border="1px solid" borderColor="gray.400" borderRadius="lg" cursor='pointer'
                onClick={() => onClickCallback(questionCategory?.id)}>
                <Box p="2">
                    <Text fontSize="1xl" fontWeight="bold">
                        {questionCategory?.category}
                    </Text>
                </Box>
            </Box>
        )
    }

    const openModalQuestions = (categoryId) => {
        console.log('setando:', categoryId);

        setCategorySelected(categoryId)
        onOpen();
    }

    function generateDataStoreMeetingQuestion(questions, meetingModel): Promise<MeetingQuestion[]> {
        return questions.map((question) => {
            return DataStore.save(
                new MeetingQuestion({
                    meeting: meetingModel,
                    question
                })
            )
        })
    }

    async function addQuestionsMeeting(questions: Question[]) {

        if (questions.length && meeting) {

            try {
                const promisesDataStore = generateDataStoreMeetingQuestion(questions, meeting);
                Promise.allSettled([promisesDataStore]).then(
                    (results) => results.forEach(
                        (result) => console.log(result)
                    )
                );
                setMeetingQuestions((prev) => [...questions, ...prev])
            } catch (e) { console.log(e) }



        }
    }

    async function updateIsStarted(isStarted) {
        if (meeting) {
            await DataStore.save(Meeting.copyOf(meeting, item => {
                item.isStarted = isStarted
            }));
            getMeeting()
        }
    }

    async function updateAnnotations(annotations) {
        if (meeting) {
            await DataStore.save(Meeting.copyOf(meeting, item => {
                item.annotations = JSON.stringify(annotations)
            }));
        }
    }

    async function updateIsCompleted(isCompleted) {
        if (meeting) {
            await DataStore.save(Meeting.copyOf(meeting, item => {
                item.isCompleted = isCompleted
            }));
            getMeeting()
        }
    }


    const debouncedEditorStateChange = useDebouncedCallback((changes) => {
        updateAnnotations(changes)
    }, 2000);

    useEffect(() => {

        getQuestionCategories().then();
        // searchMeetingByStartDate();
    }, []);

    useEffect(() => {
        if (idMeeting)
            getMeeting().then();
    }, [idMeeting]);

    const SetInitialDataEditor = () => {
        try {
            if (meeting?.annotations) {
                console.log(JSON.parse(meeting?.annotations));
                return JSON.parse(meeting?.annotations)

            }
            return initialContent
        } catch (e) {
            return initialContent;
        }

    }

    return (
        <UIPage>
            <ModalAddQuestions
                questionsAlreadyAdd={meetingQuestions}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={
                    (questions: Question[], teste) => {
                        if (questions)
                            addQuestionsMeeting(questions)
                        onClose();
                    }}
                idCategory={categorySelected}
            />
            <SimpleGrid
                display={{ base: 'initial', md: 'grid' }}
                columns={{ xs: 12, md: 3, lg: 3, xl: 3 }}
                spacing={{ md: 6 }}
            >
                <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                    <Stack spacing={6} >
                        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <Box px={[4, 0]} >
                                <Flex justifyContent="space-between">
                                    <VStack alignItems='flex-start'>
                                        {meeting &&
                                            <Tag
                                                size='md'
                                                borderRadius="full"
                                                variant="solid"
                                                colorScheme="green"
                                            >
                                                <TagLabel>{getLabelTag(meeting)}</TagLabel>
                                            </Tag>
                                        }
                                        <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                            One-on-one com {meetingSchedule?.Member.name} -
                                            {(meeting?.meetingDate) ? new Date(meeting?.meetingDate).toLocaleString() : ''}
                                        </Heading>
                                    </VStack>
                                    {meeting && !meeting.isStarted && <Button
                                        onClick={() => { updateIsStarted(true) }}
                                        colorScheme="primary"
                                        _focus={{ shadow: '' }}
                                        fontWeight="md"
                                    >
                                        Iniciar Agora
                                    </Button>}

                                </Flex>
                                <Text
                                    mt={1}
                                    fontSize="sm"
                                // color={useColorModeValue('gray.600', 'gray.400')}
                                >
                                    {ShowDateText(meetingSchedule?.recurrenceRule, meetingSchedule?.startDate)}
                                </Text>
                            </Box>
                        </GridItem>
                    </Stack>

                    <chakra.form>
                        <Stack spacing={6} mt={4}>
                            {!meeting?.isCompleted && <>
                                <Divider />
                                <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                    Categorias
                                </Heading>
                                <SimpleGrid
                                    columns={{ sm: 2, md: 3, lg: 3, xl: 3 }} spacing={2}>

                                    {questionCategories.map((category) => (
                                        <RenderQuestionCategories key={category.id} questionCategory={category} onClickCallback={openModalQuestions} />
                                    ))}
                                </SimpleGrid>
                            </>}

                            <Divider />

                            <SimpleGrid
                                columns={1} >
                                <Box>
                                    <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                                        Questões
                                    </Heading>
                                    {!meeting?.isCompleted && <Text
                                        mt={1}
                                        fontSize="sm"
                                    // color={useColorModeValue('gray.600', 'gray.400')}
                                    >
                                        Escolha as questões a partir dos assuntos acima.
                                    </Text>}
                                </Box>
                                {meetingQuestions.map((question) => (
                                    <Box
                                        key={question.id}
                                        my="2"
                                        border="1px solid"
                                        borderColor="gray.400"
                                        borderRadius="lg"
                                        cursor="pointer"
                                        p="4"
                                    >
                                        {question.question}
                                    </Box>
                                ))}
                            </SimpleGrid>

                            <Divider />

                            {meeting && meeting.isStarted &&
                                <Editor
                                    // editorState={editorState}
                                    toolbarClassName="rdw-storybook-toolbar"
                                    wrapperClassName="rdw-storybook-wrapper"
                                    editorClassName="rdw-editor-toolbar22"
                                    onContentStateChange={(changes) => { debouncedEditorStateChange(changes); }}
                                    readOnly={meeting?.isCompleted}
                                    defaultContentState={SetInitialDataEditor()}
                                />}

                        </Stack>
                        <Box
                            px={{ base: 4, sm: 6 }}
                            py={3}
                            // bg={useColorModeValue('secondary.50', 'secondary.900')}
                            textAlign="right"
                        >
                            {meeting && meeting.isStarted && !meeting?.isCompleted && <Button
                                onClick={() => { updateIsCompleted(true) }}
                                colorScheme="primary"
                                _focus={{ shadow: '' }}
                                fontWeight="md"
                            // bg={useColorModeValue('primary.50', 'primary.50')}
                            >
                                Finalizar one-on-one
                            </Button>}
                        </Box>
                    </chakra.form>
                </GridItem>
            </SimpleGrid>



        </UIPage>
    );
}

export default PlanningMeetings
