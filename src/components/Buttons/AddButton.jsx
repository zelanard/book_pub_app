import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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