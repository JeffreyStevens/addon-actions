import React, {FC} from 'react';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {ButtonSts} from './ButtonSts';
import styled from 'styled-components';

export const WHITE = '#ffffff';
export const BUTTON_BLUE = '#0157b8';

export interface IDialogButton {
    label: string;
    ariaLabel?: string;
    id?: string;
    autoFocus?: boolean;
    sx?: object;
    disabled?: boolean;
    action?: (() => void) | ((event: object, reason?: string) => void);
}

export const DialogTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 5px 5px 10px; // top right bottom left
    height: 2em;
    font-weight: bold;
    font-size: large;
    color: ${WHITE};
    background: ${BUTTON_BLUE};
`;

export const DIALOG_STS_TITLE_LABEL = 'dialog-sts-title';

export interface DialogStsProps {
    open: boolean;
    onClose?: (() => void) | ((event: object, reason?: string) => void);
    buttons?: IDialogButton[];
    children?: React.ReactNode;
    sx?: object;
    sxPaperProps?: object;
    ariaLabel?: string; // lets you associate a label with your content (children)
    title?: string;
}

export const DialogSts: FC<DialogStsProps> = (props) => {
    //------------------------------------------------------------------------------
    // Return
    //------------------------------------------------------------------------------
    return (
        <MuiDialog open={props.open} onClose={props.onClose} sx={{p: 1, ...props.sx}} PaperProps={{sx: props.sxPaperProps}}>
            {props.title && <DialogTitle aria-label={DIALOG_STS_TITLE_LABEL}>{props.title}</DialogTitle>}
            <DialogContent aria-label={props.ariaLabel}>{props.children}</DialogContent>
            {props.buttons && props.buttons.length > 0 && (
                <DialogActions style={{paddingRight: '1em', paddingBottom: '1em', paddingLeft: '1em'}}>
                    {props.buttons.map((button: IDialogButton) => (
                        <ButtonSts
                            onClick={button.action}
                            key={button.id ? button.id : button.label}
                            id={button.id ? button.id : undefined}
                            data-testid={button.id ? button.id : undefined}
                            aria-label={button.ariaLabel ? button.ariaLabel : undefined}
                            autoFocus={button.autoFocus !== undefined ? button.autoFocus : false}
                            sx={{color: WHITE, background: BUTTON_BLUE, fontWeight: 'bold', ...button.sx}}
                            disabled={button.disabled === undefined ? false : button.disabled}
                        >
                            {button.label}
                        </ButtonSts>
                    ))}
                </DialogActions>
            )}
        </MuiDialog>
    );
};

export default DialogSts;
