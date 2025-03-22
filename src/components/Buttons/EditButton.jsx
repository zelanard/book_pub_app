import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

/**
 * EditButton component renders a button with an "Edit" icon and a customizable label.
 * It triggers a click event handler when clicked, typically used for editing an item.
 * @param {*} param0 - The props passed to the component, including:
 *   - label (string): The text displayed on the button.
 *   - onClick (function): The function to be called when the button is clicked.
 * @returns {JSX.Element} A Button component with the "Edit" icon and provided label.
 */
const EditButton = ({ label, onClick }) => {
    return (
        <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "15px" }}
            startIcon={<EditIcon />}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default EditButton;
