import React, {FC} from 'react';
import {DialogSts, IDialogButton} from './DialogSts';
import RouteNote, {IRouteNote} from './RouteNote';

// Add temperature alert dialog
export const ROUTE_NOTE_CANCEL_BUTTON_LABEL = 'Cancel';
export const ROUTE_NOTE_CANCEL_BUTTON_ID = 'route-note-cancel-button-id';
export const ROUTE_NOTE_SAVE_BUTTON_LABEL = 'Done';
export const ROUTE_NOTE_SAVE_BUTTON_ID = 'route-note-save-button-id';
export const ROUTE_NOTE_DIALOG_ARIA_LABEL = 'Route-Note';

export const BUTTON_MIN_WIDTH = 100;

export interface RouteNoteDialogProps {
    showRouteNoteDialog: boolean;
    handleCancelNote: () => void;
    handleSaveNote: () => void;
    routeNote: IRouteNote | null;
    setRouteNote: (value: IRouteNote | null) => void;
    title: string;
}

export const RouteNoteDialog: FC<RouteNoteDialogProps> = ({
    showRouteNoteDialog,
    handleCancelNote,
    handleSaveNote,
    routeNote,
    setRouteNote,
    title,
}) => {
    //------------------------------------------------------------------------------
    // Dialog buttons
    //------------------------------------------------------------------------------

    const missingDays =
        routeNote?.sunday === false &&
        routeNote?.monday === false &&
        routeNote?.tuesday === false &&
        routeNote?.wednesday === false &&
        routeNote?.thursday === false &&
        routeNote?.friday === false &&
        routeNote?.saturday === false &&
        routeNote?.holiday === false;

    const AddTempAlertButtons: IDialogButton[] = [
        {
            id: ROUTE_NOTE_SAVE_BUTTON_ID,
            label: ROUTE_NOTE_SAVE_BUTTON_LABEL,
            sx: {minWidth: BUTTON_MIN_WIDTH},
            disabled: missingDays || routeNote?.time === '' || routeNote?.comments === '',
            action: handleSaveNote,
        },
        {
            id: ROUTE_NOTE_CANCEL_BUTTON_ID,
            label: ROUTE_NOTE_CANCEL_BUTTON_LABEL,
            sx: {minWidth: BUTTON_MIN_WIDTH},
            action: handleCancelNote,
        },
    ];

    //------------------------------------------------------------------------------
    // Return
    //------------------------------------------------------------------------------
    return (
        <DialogSts
            open={showRouteNoteDialog}
            onClose={() => {}}
            buttons={AddTempAlertButtons}
            sx={{
                '.MuiDialogContent-root': {
                    minWidth: 400,
                },
            }}
            ariaLabel={ROUTE_NOTE_DIALOG_ARIA_LABEL}
            title={title}
        >
            <div className={'form-warning'} style={{marginBottom: 20}}>
                All fields are required
            </div>
            <RouteNote routeNote={routeNote} setRouteNote={setRouteNote} />
        </DialogSts>
    );
};

export default RouteNoteDialog;
