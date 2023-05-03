import React, {FC, useEffect, useRef} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

export const ButtonSts: FC<ButtonProps> = (props) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    //------------------------------------------------------------------------------
    // Effects
    //------------------------------------------------------------------------------
    useEffect(() => {
        if (buttonRef.current != null && props.autoFocus === true) buttonRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //------------------------------------------------------------------------------
    // Return
    //------------------------------------------------------------------------------
    return (
        <Button ref={buttonRef} variant={'contained'} size={'small'} {...props}>
            {props.children}
        </Button>
    );
};

export default ButtonSts;
