import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useColorMode } from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import 'shared/styles/react-datepicker.css';

const DatePicker = ({ ...props }: ReactDatePickerProps) => {
    const isLight = useColorMode().colorMode === 'light'; // you can check what theme you are using right now however you want
    return (
        // if you don't want to use chakra's colors or you just wwant to use the original ones, 
        // set className to "light-theme-original" ↓↓↓↓
        <div className={isLight ? "light-theme" : "dark-theme"}>
            <ReactDatePicker
                className="react-datapicker__input-text" // input is white by default and there is no already defined class for it so I created a new one
                {...props}
            />
        </div>
    );
};

export default DatePicker;