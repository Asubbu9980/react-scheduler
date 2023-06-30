import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, IconButton } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Add from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';



const TimeSlotSelection = (props) => {
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(null);


    const handleClose = () => {
        setOpen(false);
        const selectedFromTime = fromTime ? format(fromTime.$d, 'HH:mm') : null;
        const selectedToTime = fromTime ? format(toTime.$d, 'HH:mm') : null;
        const selectedTimeString = `${selectedFromTime}-${selectedToTime}`;
        const updatedSchedule = [...selectedTimeSlots];
        updatedSchedule[index].timeSlots.push(selectedTimeString);
        setSelectedTimeSlots(updatedSchedule);
    };
    const handleTimeChange = (index) => {
        setOpen(true);
        setIndex(index);
    };
    useEffect(() => {
        const updatedTimeslots = [...selectedTimeSlots];
        // Iterate over each day name in array1
        for (const day of props.selectedDays) {
            // Check if the day is already present in array2
            const existingDay = selectedTimeSlots.find(item => item.day === day);
            // If the day is not present, push it to array2
            if (!existingDay) {
                updatedTimeslots.push({ day: day, timeSlots: [] });
            }
        }
        // Output array
        const updatedTimeslots2 = updatedTimeslots.filter(item => props.selectedDays.includes(item.day));
        setSelectedTimeSlots(updatedTimeslots2);
    }, [props?.selectedDays]);

    return (
        <div style={{ marginTop: '8px' }}>
            {props.selectedOption == 'weekDays' && open === false && selectedTimeSlots.length > 0 && selectedTimeSlots.map((x, index) => {
                return <div style={{ marginLeft: '8px', paddingTop: '8px' }}><Box component="span" sx={{ p: 1, border: '1px solid grey', margin: 1, fontFamily: 'sans-serif' }}>
                    {x?.day}
                </Box>
                    {x?.timeSlots?.map((y) => {
                        return <Box component="span" sx={{ p: 1, border: '1px solid grey', margin: '4px', fontFamily: 'sans-serif' }}>
                            {y}
                        </Box>
                    })}
                    {x?.timeSlots?.length < 4 && <IconButton aria-label="" onClick={() => handleTimeChange(index)}>
                        <Add />
                    </IconButton>}
                </div>
            })}
            {(open || props?.selectedOption === '12hours') &&
                <Grid container spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xs={12} md={5}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker label="From Time"
                                    sx={{ marginLeft: '16px' }}
                                    value={fromTime}
                                    onChange={(time) => setFromTime(time)}
                                    renderInput={(params) => <TextField {...params} />} />
                            </DemoContainer>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker label="To Time"
                                    value={toTime}
                                    onChange={(time) => setToTime(time)}
                                    renderInput={(params) => <TextField {...params} />} />
                            </DemoContainer>
                        </Grid>
                    </LocalizationProvider>
                    <Grid item style={{ display: 'flex' }} xs={12} md={2}>
                        <Button disabled={!fromTime || !toTime} autoFocus onClick={handleClose}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>}
        </div>
    );
};

export default TimeSlotSelection;