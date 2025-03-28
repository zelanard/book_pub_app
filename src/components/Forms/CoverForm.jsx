import { Box, Checkbox, FormControlLabel, List, ListItem, ListItemText, TextField } from "@mui/material";
import ArtistSelect from "../Fields/ArtistSelect";

/**
 * CoverkForm component for creating/editing cover details.
 * 
 * @param {Object} param0 
 * @returns {JSX.Element} The BookForm component
 */
const CoverForm = ({ showId, id, designIdeas, bookId, digitalOnly, artistIds, setDesignIdeas, setBookId, setDigitalOnly, setArtistIds }) => {
    /**
     * Toggles the digitalOnly flag by inverting its current value.
     * @param {*} digitalOnly - The current state of the digitalOnly flag.
     */
    const handleDigitalOnly = (digitalOnly) => {
        setDigitalOnly(!digitalOnly);
    }
    return (
        <Box>
            <Box
                sx={{ display: "flex", flexDirection: !showId ? "column" : "row", marginBottom: "15px", alignItems: "start" }}
            >
                {showId && (
                    <TextField
                        label="Id"
                        variant="filled"
                        value={id}
                        sx={{
                            width: "50px",
                        }}
                        disabled
                    />
                )}
                <TextField
                    label="BookId"
                    variant="filled"
                    value={bookId}
                    type="number"
                    onChange={(e) => setBookId(e.target.value)}
                    sx={
                        showId ? { marginLeft: "15px" } : { marginTop: "15px" }
                    }
                />
                <List
                    sx={showId ? { marginLeft: "15px" } : { marginTop: "15px" }}
                >
                    <ListItem button onClick={() => handleDigitalOnly(digitalOnly)} sx={{ cursor: "pointer" }}>
                        <Checkbox
                            checked={digitalOnly}
                            onChange={() => handleDigitalOnly(digitalOnly)}
                        />
                        <ListItemText primary="Digital Only" />
                    </ListItem>
                </List>

                <ArtistSelect showId={showId} artistIds={artistIds} setArtistIds={setArtistIds} />
            </Box >
            <TextField
                label="Design Ideas"
                variant="filled"
                value={designIdeas}
                fullWidth
                onChange={(e) => setDesignIdeas(e.target.value)}
                multiline
                minRows={3}
                maxRows={3}
            />
        </Box>
    );
};

export default CoverForm;