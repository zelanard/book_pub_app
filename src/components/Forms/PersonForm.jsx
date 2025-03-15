import { Box, TextField } from "@mui/material";

const PersonForm = ({ showId, id, firstName, lastName, onFirstNameChange, onLastNameChange }) => {
    return (
        <Box
            sx={!showId && { display: "flex", flexDirection: "column" }}
        >
            {showId && (
                <TextField
                    label="Id"
                    variant="filled"
                    value={id}
                    sx={{
                        width: "50px",
                        marginRight: "15px"
                    }}
                    disabled
                />
            )}

            <TextField
                label="First Name"
                variant="filled"
                value={firstName}
                onChange={onFirstNameChange}
            />
            <TextField
                label="Last Name"
                variant="filled"
                value={lastName}
                onChange={onLastNameChange}
                sx={
                    showId ?
                        {
                            marginLeft: "15px"
                        }
                        :
                        {
                            marginTop: "15px"
                        }
                }
            />
        </Box >
    );
};

export default PersonForm;