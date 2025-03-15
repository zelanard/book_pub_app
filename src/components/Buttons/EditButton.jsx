import { Button } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

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