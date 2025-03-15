import { Box, TextField } from "@mui/material";
import AuthorSelect from "../Fields/AuthorSelect";
import CustomDatePicker from "../Fields/DatePicker";

const BookForm = ({ showId, id, title, publishDate, basePrice, authorId, setTitle, setPublishDate, setBasePrice, setAuthorId }) => {
    return (
        <Box
            sx={{ display: "flex", flexDirection: !showId ? "column" : "row" }}
        >
            {showId && (
                <TextField
                    label="Id"
                    variant="filled"
                    value={id}
                    sx={{ width: "50px" }}
                    disabled
                />
            )}

            <TextField
                label="Title"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={
                    showId ? { marginLeft: "15px" } : { marginTop: "15px" }
                }
            />
            <CustomDatePicker
                label="Publish Date"
                publishDate={publishDate}
                setPublishDate={setPublishDate}
                showId={showId}
            />

            <TextField
                label="Base Price"
                variant="filled"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                sx={
                    showId ?
                        {
                            marginLeft: "15px"
                        }
                        :
                        {
                            marginTop: "15px"
                        }
                }
                slotProps={{
                    inputLabel: {
                        shrink: basePrice !== "", // This forces the label to shrink when there's a value
                    },
                }} />
            <AuthorSelect showId={showId} authorId={authorId} setAuthorId={setAuthorId} />
        </Box >
    );
};

export default BookForm;