import { FormLabel, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const UIFormLabel: FC<any> = ({ text }) => {
    return (
        <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue('gray.700', 'gray.50')}
        >
            {text}
        </FormLabel>
    );
}
export default UIFormLabel;