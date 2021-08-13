import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { DataStore } from 'aws-amplify'
import { Question, QuestionQuestionCategory } from 'models'
import { FC, useEffect, useState } from 'react'
import UIModal from 'shared/components/ui/UIModal'

interface ModalAddQuestionsProps {
    isOpen?: any;
    onClose?: any;
    onOpen?: any;
    idCategory?: string;
    questionsAlreadyAdd?: Question[];
}

const ModalAddQuestions: FC<ModalAddQuestionsProps> = ({
    isOpen = false,
    onClose,
    onOpen,
    idCategory,
    questionsAlreadyAdd,
}) => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
    // const [selectedQuestionsIDS] = useState<string[]>([])

    async function getQuestionCategories() {
        const model = (await DataStore.query(QuestionQuestionCategory))
            .filter((qq) => qq?.questioncategory.id === idCategory)
            .map((qq) => qq?.question)
        setQuestions(model)
    }

    useEffect(() => {
        if (idCategory) getQuestionCategories().then()

    }, [idCategory])

    useEffect(() => {
        if (isOpen) {
            setSelectedQuestions([]);
        }

    }, [isOpen])

    function addQuestionSelected(question: Question) {
        const index = questionsAlreadyAdd?.findIndex((q) => q.id === question.id)
        if (index === -1)
            setSelectedQuestions((prev) => [question, ...prev]);
    }

    function removeQuestionSelected(id) {
        const aux = [...selectedQuestions]
        const index = aux.findIndex((item) => item.id === id)
        if (index !== -1) {
            aux.splice(index, 1)
            setSelectedQuestions(aux)
        }
    }

    function onHandleAddQuestions() {
        console.log('call close');
        
        onClose(selectedQuestions, '123');
    }

    return (
        <UIModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            modalTitle="Adicione questões"
        >
            <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
            >
                Marque as questões que você deseja incluir
            </Text>

            <SimpleGrid column={1}>
                <CheckboxGroup
                // value={[...selectedQuestions.map((item)=>item.id).toString()]}
                >
                    {questions.map((question: Question) => (
                        <Checkbox
                            onChange={
                                (ev) => {
                                    if (ev.target.checked) {
                                        addQuestionSelected(question)
                                    } else {
                                        removeQuestionSelected(question.id)
                                    }
                                }}
                            key={question.id.toString()}
                            my="2"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="lg"
                            cursor="pointer"
                            p="4"
                        >
                            {question.question}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </SimpleGrid>

            <Box
                py={3}
                // bg={useColorModeValue('secondary.50', 'secondary.900')}
                textAlign="right"
            >
                <Button
                    onClick={onHandleAddQuestions}
                    colorScheme="primary"
                    _focus={{ shadow: '' }}
                    fontWeight="md"
                    bg={useColorModeValue('primary.50', 'primary.50')}
                >
                    Adicionar
                </Button>
            </Box>
        </UIModal>
    )
}

export default ModalAddQuestions
