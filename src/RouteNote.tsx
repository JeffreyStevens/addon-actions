import React, {FC, useEffect, useState} from 'react';
import {FormControl, FormControlLabel, FormGroup, FormHelperText, TextField} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import {Box} from '@mui/material';

export const LeftRightFlexBox = styled(Box)`
    display: flex;
    flex-direction: row;
`;

export const TopDownFlexBox = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const GridBox = styled(Box)`
    display: grid;
`;

export const TIME_LABEL = 'Time';
export const NOTES_LABEL = 'Notes';
export const NOTE_ROW_ID = 'note-row-id';


export interface IRouteNote {
    id: number;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    holiday: boolean;
    time: string;
    comments: string;
}

export interface RouteNoteProps {
    routeNote: IRouteNote | null;
    setRouteNote: (value: IRouteNote | null) => void;
}

const RouteNote: FC<RouteNoteProps> = ({routeNote, setRouteNote}) => {
    //------------------------------------------------------------------------------
    // State variables
    //------------------------------------------------------------------------------
    // const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesady] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [holiday, setHoliday] = useState(false);
    const [time, setTime] = useState('');
    const [comments, setComments] = useState('');

    useEffect(() => {
        if (routeNote != null) {
            setSunday(routeNote.sunday);
            setMonday(routeNote.monday);
            setTuesady(routeNote.tuesday);
            setWednesday(routeNote.wednesday);
            setThursday(routeNote.thursday);
            setFriday(routeNote.friday);
            setSaturday(routeNote.saturday);
            setHoliday(routeNote.holiday);
            setTime(routeNote.time.slice(0, 5));
            setComments(routeNote.comments);
        }
    }, [routeNote]);

    useEffect(() => {
        setRouteNote({
            id: routeNote ? routeNote.id : 0,
            sunday: sunday,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            holiday: holiday,
            time: time,
            comments: comments,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sunday, monday, tuesday, wednesday, thursday, friday, saturday, holiday, time, comments]);

    const handleSundayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSunday(event.target.checked);
    };
    const handleMondayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonday(event.target.checked);
    };
    const handleTuesdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTuesady(event.target.checked);
    };
    const handleWednesdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWednesday(event.target.checked);
    };
    const handleThursdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThursday(event.target.checked);
    };
    const handleFridayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriday(event.target.checked);
    };
    const handleSaturdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaturday(event.target.checked);
    };
    const handleHolidayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHoliday(event.target.checked);
    };

    return (
        <LeftRightFlexBox sx={{mt: 3, mb: 1, gap: 2}}>
            <LeftRightFlexBox>
                <FormControl sx={{m: 0}} component='fieldset' variant='standard'>
                    <FormHelperText>Day of Week*</FormHelperText>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={sunday} onChange={handleSundayChange} value='Sun' size='small' />}
                            label='Sun'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={monday} onChange={handleMondayChange} value='Mon' size='small' />}
                            label='Mon'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={tuesday} onChange={handleTuesdayChange} value='Tue' size='small' />}
                            label='Tue'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={wednesday} onChange={handleWednesdayChange} value='Wed' size='small' />}
                            label='Wed'
                        />
                    </FormGroup>
                </FormControl>
                <FormControl sx={{mt: 3}} component='fieldset' variant='standard'>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={thursday} onChange={handleThursdayChange} value='Thu' size='small' />}
                            label='Thu'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={friday} onChange={handleFridayChange} value='Fri' size='small' />}
                            label='Fri'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={saturday} onChange={handleSaturdayChange} value='Sat' size='small' />}
                            label='Sat'
                        />

                        <FormControlLabel
                            control={<Checkbox checked={holiday} onChange={handleHolidayChange} value='Holiday' size='small' />}
                            label='Holiday'
                        />
                    </FormGroup>
                </FormControl>
            </LeftRightFlexBox>
            <TopDownFlexBox>
                <TextField
                    sx={{mt: 1}}
                    InputLabelProps={{shrink: true}}
                    label={TIME_LABEL}
                    type={'time'}
                    variant={'standard'}
                    placeholder={''}
                    name='time'
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <TextField
                    id={NOTE_ROW_ID}
                    sx={{minWidth: '220px', mt: 5}}
                    inputProps={{maxLength: 100}}
                    variant={'outlined'}
                    size={'medium'}
                    name='comments'
                    multiline
                    label={NOTES_LABEL}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </TopDownFlexBox>
        </LeftRightFlexBox>
    );
};

export default RouteNote;
