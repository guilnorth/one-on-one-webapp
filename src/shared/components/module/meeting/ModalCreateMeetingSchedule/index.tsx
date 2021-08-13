import { FC } from 'react';
import UIModal from 'shared/components/ui/UIModal';
import FormCreateMeetingSchedule from '../FormCreateMeetingSchedule';

interface ModalCreateMeetingScheduleProps {
    isOpen?: any;
    onClose?: any;
    onOpen?: any;
    updateListCallback?: any;
}

const ModalCreateMeetingSchedule: FC<ModalCreateMeetingScheduleProps> = ({ isOpen = false, onClose, onOpen, updateListCallback }) => {
    return (
        <UIModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            modalTitle="Agende uma nova one-on-one">
            <FormCreateMeetingSchedule
                onAfterSave={() => { onClose(); updateListCallback() }} />
        </UIModal>
    );
}

export default ModalCreateMeetingSchedule