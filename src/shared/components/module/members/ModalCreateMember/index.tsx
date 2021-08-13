import { FC } from 'react';
import UIModal from 'shared/components/ui/UIModal';
import FormCreateMember from '../FormCreateMember';

interface ModalCreateMemberProps {
    isOpen?: any;
    onClose?: any;
    onOpen?: any;
    updateListCallback?: any;
}

const ModalCreateMember: FC<ModalCreateMemberProps> = ({ isOpen = false, onClose, onOpen, updateListCallback }) => {
    return (
        <UIModal 
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            modalTitle="Crie um novo membro para a sua equipe">
            <FormCreateMember onAfterSave={()=>{ onClose(); updateListCallback() }} />
        </UIModal>
    );
}

export default ModalCreateMember