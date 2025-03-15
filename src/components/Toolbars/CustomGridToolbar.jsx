import { Box } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import AddButton from "../Buttons/AddButton";

const CustomGridToolbar = ({ label, onClickHandler }) => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <AddButton label={label} onClickHandler={onClickHandler} />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default CustomGridToolbar;
