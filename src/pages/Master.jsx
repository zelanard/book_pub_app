import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import appStates from "../Objects/AppStates";
import { Apps } from "@mui/icons-material";
import CreateUser from "./CreateUser";
import MainMenu from "../components/Menus/MainMenu";

const Master = () => {
    const { token, appState } = useAuth();

    return (
        <Box>
            {appState == appStates.Login && <Login />}
            {appState == appStates.Create && <CreateUser />}
            {appState == appStates.Logout && <MainMenu />}
        </Box>
    );
}

export default Master;