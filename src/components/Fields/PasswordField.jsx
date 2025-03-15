import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import ButtonBox from "../Boxes/ButtonBox";

// PasswordField component
const PasswordField = ({ label, value, onChange, ...props }) => {
    const [showPassword, setShowPassword] = useState("password");

    // Toggle visibility of password
    const toggleShowPassword = () => {
        setShowPassword((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
        <ButtonBox>
            <TextField
                label={label}
                variant="outlined"
                type={showPassword}
                fullWidth
                value={value}
                onChange={onChange}
                margin="normal"
                {...props} // Spread any other props like 'type', 'variant', etc.
            />
            <IconButton sx={{ height: "50px", width: "50px" }} onClick={toggleShowPassword}>
                {showPassword === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </ButtonBox>
    );
};

export default PasswordField;
