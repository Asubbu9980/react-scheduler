import React, { useState, PropTypes, Fragment } from 'react';
//mui imports
import { RadioGroup, FormControlLabel, Radio, Grid, Typography, TextField, ToggleButtonGroup, ToggleButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TimeField } from '@mui/x-date-pickers';
import Switch from '@mui/material/Switch';

// component imports
import TimeSlotSelection from './TimeSlotSelection'


const useStyles = makeStyles((theme) => ({
    weekdayButton: {
        borderLeft: '1px solid #1976d2 !important',
        border: '1px solid #1976d2 !important'
    },
    weekDayUnselect:{
        borderLeft: '1px solid #e8e8e8 !important'
    }
}));




const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: '42px !important',
    height: '26px !important',
    padding: '0 !important',
    '& .MuiSwitch-root': {
        width: '42px !important',
        height: 26,
        padding: 0,
    },
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create({
            duration: 500,
        }),
    },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    // children: PropTypes.node,
    // onClose: PropTypes.func.isRequired,
};



const WeekdaySelection = () => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null)
    const [switchValue, setSwitchValue] = useState(false);

    const handleSwitchChange = (event) => {
        console.log('event.target.checked', event.target.checked)
        setSwitchValue(event.target.checked);
        setSelectedOption('')
    };
    const handleDaySelection = (event, newSelectedDays) => {
        setSelectedDays(newSelectedDays);
    };

    const weekdays = [
        { value: 'Mon', label: 'M' },
        { value: 'Tue', label: 'T' },
        { value: 'Wed', label: 'W' },
        { value: 'Thu', label: 'T' },
        { value: 'Fri', label: 'F' }
    ];

    const weekend = [
        { value: 'Sat', label: 'S' },
        { value: 'Sun', label: 'S' },
    ];


    const handleOptionChange = (event) => {
        setSelectedDays([]);
        setSelectedOption(event.target.value);

    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log('selectedOption', selectedOption);
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open Scheduler
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Scheduler
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={12} md={6}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker sx={{ width: '100%' }} label="From Date"
                                        value={fromDate}
                                        onChange={(date) => setFromDate(date)}
                                    />
                                </DemoContainer>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker sx={{ width: '100%' }} label="To Date"
                                        value={toDate}
                                        onChange={(date) => setToDate(date)}
                                        renderInput={(params) => <TextField {...params} />} />
                                </DemoContainer>

                            </Grid>
                            {selectedOption === 'weekends' && <Fragment>
                                <Grid item xs={12} md={6}>
                                    <DemoContainer components={['TimeField']}>
                                        <TimeField sx={{ width: '100%' }} label="From Time"
                                            value={fromTime}
                                            onChange={(time) => setFromTime(time)}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </DemoContainer>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DemoContainer components={['TimeField']}>
                                        <TimeField sx={{ width: '100%' }} label="To Time"
                                            value={toTime}
                                            onChange={(time) => setToTime(time)}
                                            renderInput={(params) => <TextField {...params} />} />
                                    </DemoContainer>
                                </Grid>
                            </Fragment>}
                        </LocalizationProvider>
                        <Grid item xs={12} md={12}>
                            <Typography>Preferences:</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
                                <FormControlLabel value="weekDays" disabled={switchValue} control={<Radio />} label="Week days" />
                                <FormControlLabel value="weekends" disabled={switchValue} control={<Radio />} label="Only Weekends" />
                                <FormControlLabel value="12hours" control={<Radio />} label="12 Hours" />
                                <FormControlLabel value="24hours" control={<Radio />} label="24 hours" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }} checked={switchValue}
                                    onChange={handleSwitchChange} />}
                                label="All days"
                            />
                        </Grid>
                        {selectedOption !== '24hours' &&
                            <Fragment>
                                <Grid item xs={12} md={12}>
                                    {(selectedOption === 'weekDays' || selectedOption === 'weekends' )  &&
                                        <ToggleButtonGroup
                                            value={selectedDays}
                                            onChange={handleDaySelection}
                                            aria-label="Weekday Selection"
                                            size="small"
                                            sx={{
                                                marginBottom: '8px',
                                                '& .Mui-selected': {
                                                    color: 'white !important',
                                                    backgroundColor: '#1976d2 !important',
                                                    borderLeft: '1px solid #1976d2 !important',
                                                    border: '1px solid #1976d2',
                                                }
                                            }}
                                        >
                                            { weekdays.map((weekday) => (
                                                <ToggleButton sx={{
                                                    borderRadius: '999px !important',
                                                    width: '40px',
                                                    height: '40px',
                                                    marginRight: '5px',
                                                    borderLeft: '1px solid #e8e8e8',
                                                }} key={weekday.value} value={weekday.value} className={selectedOption === 'weekDays' ? classes.weekdayButton : classes.weekDayUnselect}>
                                                    {weekday.label}
                                                </ToggleButton>
                                            ))}
                                            { weekend.map((weekday) => (
                                                <ToggleButton sx={{
                                                    borderRadius: '999px !important',
                                                    width: '40px',
                                                    height: '40px',
                                                    marginRight: '5px',
                                                    borderLeft: '1px solid #e8e8e8',
                                                }} key={weekday.value} value={weekday.value} className={selectedOption === 'weekends' ? classes.weekdayButton :  classes.weekDayUnselect}>
                                                    {weekday.label}
                                                </ToggleButton>
                                            ))}
                                        </ToggleButtonGroup>}

                                </Grid>
                                <TimeSlotSelection selectedOption={selectedOption} selectedDays={selectedDays} />
                            </Fragment>

                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    )
};

export default WeekdaySelection;