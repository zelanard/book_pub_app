import { Box } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import AddButton from "../Buttons/AddButton";

/**
 * Custom grid toolbar component that includes column visibility, density selection,
 * a custom AddButton with a label and click handler, and an export button.
 * 
 * @param {Object} param0 - The properties passed to the component.
 * @param {string} param0.label - The label to be displayed on the AddButton.
 * @param {Function} param0.onClickHandler - The click handler function for the AddButton.
 * 
 * @returns {JSX.Element} A toolbar with column visibility, density selector, AddButton, and export button.
 */
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
