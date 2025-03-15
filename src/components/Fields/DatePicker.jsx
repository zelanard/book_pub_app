import React, { useState, useEffect, useRef } from 'react';
import { Box, Popper, IconButton, Button } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateField, LocalizationProvider } from '@mui/x-date-pickers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function CustomDatePicker({ label, publishDate, setPublishDate, showId }) {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const popperRef = useRef(null); // Ref for the Popper element
    const inputRef = useRef(null);  // Ref for the input element

    // Handle date selection
    const handleDateSelect = (date) => {
        setPublishDate(date);
        setOpenCalendar(false);
    };

    // Open calendar on input click
    const handleInputClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenCalendar(true);
    };

    // Handle manual input and parse date
    const handleManualInputChange = (event) => {
        const inputValue = event.target.value;
        const parsedDate = dayjs(inputValue, 'YYYY-MM-DD', true); // Customize date format if needed

        if (parsedDate.isValid()) {
            setPublishDate(parsedDate);
        } else {
            setPublishDate(dayjs()); // fallback if the input is invalid
        }
    };

    // Close calendar when clicking outside of the Popper or input
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popperRef.current && !popperRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setOpenCalendar(false);
            }
        };

        // Add the event listener for clicking outside
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ position: "relative", marginLeft: showId ? "15px" : "0px", marginTop: showId ? "0px" : "15px" }}>
                <DateField
                    ref={inputRef}  // Attach the ref to the input
                    label={label}
                    value={publishDate}
                    onChange={handleManualInputChange} // Handle input changes
                    variant="filled"
                    fullWidth
                />
                <IconButton
                    onClick={handleInputClick}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 8,
                        zIndex: 1000,
                        cursor: 'pointer',
                    }}
                >
                    <CalendarTodayIcon />
                </IconButton>

                {/* Popper to show calendar */}
                <Popper open={openCalendar} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 999 }} ref={popperRef}>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                        }}
                    >
                        <DateCalendar
                            value={publishDate}
                            onChange={handleDateSelect}
                            maxDate={dayjs().add(1, 'year')}
                        />
                        <Button
                            variant='text'
                            sx={{
                                marginLeft: "calc( 100% - 80px)"
                            }}
                            onClick={() => { setOpenCalendar(false) }}
                        >
                            Close
                        </Button>
                    </Box>
                </Popper>
            </Box>
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
