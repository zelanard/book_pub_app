import { Box } from "@mui/material"

const LeftBlock = ({ children }) => {
    return (
        <Box sx={{
            width: "100%",
            display: "block",
            textAlign: "left"
        }}>
            {children}
        </Box>

    )
}
export default LeftBlock;