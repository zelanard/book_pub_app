import { Box, Button, Typography } from "@mui/material";

/**
 * CreateForm component for displaying a modal with form elements for creating new data.
 * the form is created on a semi transparent black background covering everything other than the form.
 * 
 * @param {Object} param0 
 * @returns {JSX.Element} The CreateForm component
 */
const CreateForm = ({ view, setView, title, handleCreate, dataFields }) => {
    return (
        <Box>
            {view &&
                <Box
                    sx={{
                        position: "fixed",
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: "1000",
                        top: "0",
                        left: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "white",
                            height: "auto",
                            width: "500px",
                            borderRadius: "15px",
                            border: "5px solid darkgray",
                            display: "flex",
                            flexDirection: "column",
                            padding: "15px",
                            position: "relative"
                        }}
                    >
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            {title}
                        </Typography>

                        {dataFields}

                        <Box
                            sx={{ textAlign: "right" }}
                        >
                            <Button
                                sx={{ marginTop: "15px", marginRight: "15px", width: "150px" }}
                                variant="contained"
                                onClick={() => handleCreate()}
                            >Create</Button>
                            <Button
                                variant="contained"
                                sx={{ marginTop: "15px", width: "150px" }}
                                onClick={() => setView(false)}
                            >Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}
export default CreateForm;