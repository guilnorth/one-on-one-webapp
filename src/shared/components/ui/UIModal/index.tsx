// import { useDisclosure } from "@chakra-ui/react"
import { Modal, ModalProps, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react"


interface UIModalProps extends ModalProps {
    isOpen: any;
    onOpen: any;
    onClose: any;
    modalTitle?: string;
    children: any;
}

const UIModal: FC<UIModalProps> = ({
    isOpen, onOpen, onClose, modalTitle, children, ...rest
}) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()

    // const initialRef = useRef()
    // const finalRef = useRef()

    return (

        <Modal
            // initialFocusRef={initialRef}
            // finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            {...rest}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {children}
                </ModalBody>

                <ModalFooter>
                    {/* <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}

export default UIModal;