import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

/**
 * A data grid component that displays rows of data with pagination, loading, and error handling.
 * It accepts custom toolbar elements and provides a pagination model for controlling page size and navigation.
 * 
 * @param {Object} param0 - The properties passed to the component.
 * @param {boolean} param0.loading - Indicates whether the data grid is in a loading state.
 * @param {string} param0.error - An error message to display if an error occurs.
 * @param {Array} param0.rows - The data rows to be displayed in the grid.
 * @param {Array} param0.columns - The column definitions for the data grid.
 * @param {Function} param0.onRowClick - A handler function for row clicks.
 * @param {JSX.Element} param0.toolbar - A custom toolbar element to display above the grid.
 * @param {string} param0.label - The label for the custom toolbar button.
 * @param {Function} param0.init - A handler function for initializing or performing an action on toolbar button click.
 * 
 * @returns {JSX.Element} A data grid with loading, error handling, pagination, and a custom toolbar.
 */

const AsyncDataGridView = ({ loading, error, rows, columns, onRowClick, toolbar, label, init }) => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });
    return (
        <Box sx={{ height: 400, width: "33%" }}>
            {loading && <Box>Loading...</Box>}
            {error && <Box>Error: {error}</Box>}
            {!loading &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={onRowClick}
                    slots={{
                        toolbar: toolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            label: label,
                            onClickHandler: init
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
            }
        </Box>
    );
}

export default AsyncDataGridView;
