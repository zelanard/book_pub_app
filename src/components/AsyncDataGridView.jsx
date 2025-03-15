import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

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
