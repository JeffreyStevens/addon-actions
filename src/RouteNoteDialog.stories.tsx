import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {Meta, StoryObj} from '@storybook/react';
import {Grid} from '@mui/material';
import RouteNoteDialog, {ROUTE_NOTE_CANCEL_BUTTON_ID, ROUTE_NOTE_SAVE_BUTTON_ID} from './RouteNoteDialog';
import {userEvent, waitFor, within} from '@storybook/testing-library';
import {expect} from '@storybook/jest';
import {withActions} from '@storybook/addon-actions/decorator';
import {IRouteNote} from "./RouteNote";
import {store} from "./store/store";

//------------------------------------------------------------------------------
// RouteNoteDialogApp is exported wrapper application for component under test (RouteNoteDialog)
//------------------------------------------------------------------------------
export interface RouteNoteDialogProps {
    showRouteNoteDialog: boolean;
    handleCancelNote: () => void;
    handleSaveNote: () => void;
    routeNote: IRouteNote | null;
    setRouteNote: (value: IRouteNote | null) => void;
    title: string;
}

const RouteNoteDialogApp = ({
    showRouteNoteDialog,
    handleCancelNote,
    handleSaveNote,
    routeNote,
    setRouteNote,
    title,
}: RouteNoteDialogProps) => {
    return (
        <Grid item style={{paddingTop: 0}}>
            <RouteNoteDialog
                showRouteNoteDialog={showRouteNoteDialog}
                handleCancelNote={handleCancelNote}
                handleSaveNote={handleSaveNote}
                routeNote={routeNote}
                setRouteNote={setRouteNote}
                title={title}
            />
        </Grid>
    );
};

const note: IRouteNote = {
    id: 2,
    sunday: false,
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    holiday: true,
    time: '06:30',
    comments: 'This is a comment',
};

const emptyNote: IRouteNote = {
    id: 2,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    holiday: false,
    time: '',
    comments: '',
};

//------------------------------------------------------------------------------
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//------------------------------------------------------------------------------
const meta: Meta<typeof RouteNoteDialogApp> = {
    title: 'Admin Unit/RouteNoteDialog', // how to refer to the component in the sidebar (optional)
    component: RouteNoteDialogApp, // the component itself or a wrapper function
    decorators: [withActions, (story) => <ReduxProvider store={store}>{story()}</ReduxProvider>],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // More on controls: https://storybook.js.org/docs/react/essentials/controls
    argTypes: {
        showRouteNoteDialog: {control: 'boolean'},
        handleCancelNote: {action: 'handleCancelNote'},
        handleSaveNote: {action: 'handleSaveNote'},
        routeNote: {control: 'object'},
        setRouteNote: {action: 'setRouteNote'},
        title: {control: 'string'},
    },
    args: {
        showRouteNoteDialog: true,
        routeNote: note,
        title: 'Edit Note',
    },
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered', // 'fullscreen', 'centered', 'padded'
        viewport: {defaultViewport: 'stsDialog'},
        // See https://storybook.js.org/docs/react/essentials/actions
        actions: {
            handles: ['hover div[aria-label="dialog-sts-title"]', 'click div[aria-label="dialog-sts-title"]'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof RouteNoteDialogApp>;

//------------------------------------------------------------------------------
// Stories
//------------------------------------------------------------------------------
export const Note: Story = {
    args: {},
    parameters: {},
};

//------------------------------------------------------------------------------
// Interactions
// See https://storybook.js.org/docs/react/writing-tests/interaction-testing
// See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
//------------------------------------------------------------------------------
export const DoneButton: Story = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (args, context) => <RouteNoteDialogApp {...args} />,
    args: {},
    parameters: {},

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    play: async ({args, canvasElement, step}) => {
        const canvas = await within(document.body).findAllByRole('presentation');
        expect(canvas.length).toBe(2);
        const okButton = await within(canvas[1]).findByTestId(ROUTE_NOTE_SAVE_BUTTON_ID);

        userEvent.click(okButton);

        await waitFor(() => expect(args.handleCancelNote).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(args.handleSaveNote).toHaveBeenCalledTimes(1));
        // expect(args.handleSaveNote).toHaveBeenCalledWith((SyntheticBaseEvent); // SyntheticBaseEvent (MouseEvent)
        expect(args.setRouteNote).toHaveBeenCalledTimes(1);
        expect(args.setRouteNote).toHaveBeenCalledWith(emptyNote);
    },
};

export const CancelButton: Story = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (args, context) => <RouteNoteDialogApp {...args} />,
    args: {},
    parameters: {},

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    play: async ({args, canvasElement, step}) => {
        const canvas = await within(document.body).findAllByRole('presentation');
        expect(canvas.length).toBe(2);
        const okButton = await within(canvas[1]).findByTestId(ROUTE_NOTE_CANCEL_BUTTON_ID);

        userEvent.click(okButton);

        await waitFor(() => expect(args.handleCancelNote).toHaveBeenCalledTimes(1));
        // expect(args.handleCancelNote).toHaveBeenCalledWith(SyntheticBaseEvent); // SyntheticBaseEvent (MouseEvent)
        expect(args.handleSaveNote).toHaveBeenCalledTimes(0);
        expect(args.setRouteNote).toHaveBeenCalledTimes(1);
        expect(args.setRouteNote).toHaveBeenCalledWith(emptyNote);
    },
};
