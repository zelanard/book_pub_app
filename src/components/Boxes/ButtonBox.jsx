import { Box } from "@mui/material"

const ButtonBox = ({ children }) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center"
        }}>
            {children}
        </Box>

    )
}
export default ButtonBox;