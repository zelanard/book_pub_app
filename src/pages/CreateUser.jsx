import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/material";
import { TextField, Button, Typography } from '@mui/material';
import PasswordField from "../components/Fields/PasswordField";
import LeftBlock from "../components/Boxes/LeftBlock";
import api from "../Objects/api";


const CreateUser = () => {
    const { goToLogin } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isSubmitDisabled, SetIsSubmitDisabled] = useState(true);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        try {
            const response = await fetch(api.register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            });

            if (!response.ok) throw new Error("Create user failed");
            goToLogin();
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirm = (e) => {
        if (e.target.value == password) {
            SetIsSubmitDisabled(false);
        }
        setConfirm(e.target.value);
    }

    return (
        <Box sx={{
            textAlign: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box sx={{ width: "450px" }}>
                {/* center to the smaller box to align the heading to the center */}
                <Box sx={{
                    width: "500px"
                }}>
                    <LeftBlock>
                        <Typography variant="h5" sx={{ width: "450px", textAlign: "center" }}>Create New User</Typography>
                    </LeftBlock>
                    <form onSubmit={handleSubmit}>
                        <LeftBlock>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                sx={{
                                    width: "450px"
                                }}
                            />
                            <TextField
                                label="E-mail"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                sx={{
                                    width: "450px"
                                }}
                            />
                        </LeftBlock>
                        <PasswordField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        />
                        <PasswordField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            value={confirm}
                            onChange={(e) => handleConfirm(e)}
                            margin="normal"
                        />
                        <LeftBlock>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={isSubmitDisabled}
                                sx={{
                                    width: "450px"
                                }}
                            >
                                Create User
                            </Button>
                        </LeftBlock>
                    </form>
                    <LeftBlock>
                        <Button
                            variant="text"
                            color="primary"
                            type="button"
                            fullWidth
                            onClick={() => { goToLogin() }}
                            sx={{
                                width: "450px"
                            }}
                        >
                            Login
                        </Button>
                    </LeftBlock>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateUser;
