import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * DeleteButton component renders a button with a "Delete" icon and a customizable label.
 * It triggers a click event handler when clicked, typically used for deleting an item.
 * @param {*} param0 - The props passed to the component, including:
 *   - label (string): The text displayed on the button.
 *   - onClick (function): The function to be called when the button is clicked.
 * @returns {JSX.Element} A Button component with the "Delete" icon, provided label, and error color.
 */
const DeleteButton = ({ label, onClick }) => {
    return (
        <Button
            variant="contained"
            fullWidth
            color="error"
            sx={{ marginTop: "15px" }}
            startIcon={<DeleteIcon />}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default DeleteButton;
