import { Box } from "@mui/material"

/**
 * ButtonBox component wraps the children elements and applies styling to align them in a row.
 * @param {*} param0 - The props passed to the component, containing the children to be rendered inside the Box.
 * @returns {JSX.Element} A Box component wrapping the children with specific styling.
 */
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
