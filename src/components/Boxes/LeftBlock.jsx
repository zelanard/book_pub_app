import { Box } from "@mui/material"

/**
 * LeftBlock component is used to wrap children elements with specific styling for left-aligned text and block display.
 * @param {*} param0 - The props passed to the component, containing the children to be rendered inside the Box.
 * @returns {JSX.Element} A Box component with the children wrapped in a block display and left-aligned text.
 */
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
