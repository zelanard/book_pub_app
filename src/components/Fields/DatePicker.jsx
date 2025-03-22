import React, { useState, useEffect, useRef } from 'react';
import { Box, Popper, IconButton, Button } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateField, LocalizationProvider } from '@mui/x-date-pickers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/**
 * CustomDatePicker renders a date picker component with an input field and a calendar popper.
 * Allows the user to either manually input a date or select one from the calendar.
 *
 * @param {Object} param0 - The props for the component:
 * @param {string} label - The label for the date input field.
 * @param {dayjs.Dayjs} publishDate - The current selected date.
 * @param {function} setPublishDate - A function to update the selected date.
 * @param {boolean} showId - A flag to control the styling of the date picker.
 * @returns {JSX.Element} The rendered date picker component.
 */
function CustomDatePicker({ label, publishDate, setPublishDate, showId }) {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const popperRef = useRef(null); // Ref for the Popper element (calendar)
    const inputRef = useRef(null);  // Ref for the input element

    /**
     * Handles selecting a date from the calendar.
     * @param {dayjs.Dayjs} date - The selected date.
     */
    const handleDateSelect = (date) => {
        setPublishDate(date);
        setOpenCalendar(false);
    };

    /**
     * Opens the calendar popper when the input is clicked.
     * @param {React.MouseEvent} event - The click event on the input field.
     */
    const handleInputClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenCalendar(true);
    };

    /**
     * Handles manual input change and parses the date from the input.
     * @param {React.ChangeEvent} event - The input change event.
     */
    const handleManualInputChange = (event) => {
        const inputValue = event.target.value;
        const parsedDate = dayjs(inputValue, 'YYYY-MM-DD', true); // Adjust date format as needed

        if (parsedDate.isValid()) {
            setPublishDate(parsedDate);
        } else {
            setPublishDate(dayjs()); // Fallback to the current date if the input is invalid
        }
    };

    /**
     * Effect hook to close the calendar popper if clicking outside the component.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popperRef.current && !popperRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setOpenCalendar(false);
            }
        };

        // Add event listener for outside clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener when the component is unmounted
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
                    onChange={handleManualInputChange} // Handle manual input changes
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
                            maxDate={dayjs().add(1, 'year')} // Maximum selectable date is 1 year from today
                        />
                        <Button
                            variant='text'
                            sx={{
                                marginLeft: "calc(100% - 80px)" // Position the button on the far right
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
