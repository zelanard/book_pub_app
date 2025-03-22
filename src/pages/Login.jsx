import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/material";
import { TextField, Button, Typography } from '@mui/material';
import PasswordField from "../components/Fields/PasswordField";
import LeftBlock from "../components/Boxes/LeftBlock";

const Login = () => {
    const { login: authLogin, createUser } = useAuth();
    const [login, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authLogin(login, password);
    };

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
                <Box sx={{
                    width: "500px"
                }}>
                    <LeftBlock>
                        <Typography variant="h5" sx={{ width: "450px", textAlign: "center" }}>Login</Typography>
                    </LeftBlock>
                    <form onSubmit={handleSubmit}>
                        <LeftBlock>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={login}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <LeftBlock>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{
                                    width: "450px"
                                }}
                            >
                                Login
                            </Button>
                        </LeftBlock>
                    </form>
                    <LeftBlock>
                        <Button
                            variant="text"
                            color="primary"
                            type="button"
                            fullWidth
                            onClick={() => { createUser() }}
                            sx={{
                                width: "450px"
                            }}
                        >
                            Create new user
                        </Button>
                    </LeftBlock>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
