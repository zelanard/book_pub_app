import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * AddButton component renders a button with an "Add" icon and a customizable label.
 * It triggers a click event handler when clicked.
 * @param {*} param0 - The props passed to the component, including:
 *   - label (string): The text displayed on the button.
 *   - onClickHandler (function): The function to be called when the button is clicked.
 * @returns {JSX.Element} A Button component with the "Add" icon and provided label.
 */
const AddButton = ({ label, onClickHandler }) => {
    return (
        <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={onClickHandler}
        >
            {label}
        </Button>
    );
};

export default AddButton;
