import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import ButtonBox from "../Boxes/ButtonBox";

/**
 * PasswordField component to securely handle password input and toggle visibility.
 * 
 * @param {string} label - The label of the password field.
 * @param {string} value - The value of the password input.
 * @param {function} onChange - The function to update the password value.
 * @param {Object} props - Additional props passed to the TextField component.
 * @returns {JSX.Element} The rendered PasswordField component.
 */
//const PasswordField = ({ label, value, onChange, ...props }) => {
const PasswordField = ({ ...props }) => {
    const [showPassword, setShowPassword] = useState("password");

    /**
     * Toggles the visibility of the password.
     */
    const toggleShowPassword = () => {
        setShowPassword((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
        <ButtonBox>
            <TextField
                type={showPassword}
                {...props} // Spread any other props like 'type', 'variant', etc.
            />
            <IconButton sx={{ height: "50px", width: "50px" }} onClick={toggleShowPassword}>
                {showPassword === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </ButtonBox>
    );
};

export default PasswordField;
