import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

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