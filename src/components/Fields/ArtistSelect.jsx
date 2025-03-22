import { useState, useEffect } from "react";
import { Checkbox, FormControl, List, ListItem, ListItemText, CircularProgress, Divider, Typography } from "@mui/material";
import api from "../../Objects/api";
import fetchTempData from "../../Objects/fetch/fetchTempItem";

/**
 * ArtistSelect component displays a list of artists with checkboxes for selecting multiple artists.
 * The component fetches the artist data and allows users to select or deselect artists.
 * @param {*} param0 - The props passed to the component, including:
 *   - showId (boolean): Determines whether to apply specific margin styles.
 *   - artistIds (array): An array of selected artist IDs.
 *   - setArtistIds (function): A function to update the selected artist IDs in the parent component.
 * @returns {JSX.Element} A FormControl with a list of artists and checkboxes.
 */
const ArtistSelect = ({ showId, artistIds, setArtistIds }) => {
    const [artistItems, setArtistItems] = useState();

    /**
     * Fetches artist data from an API and maps the response to a list of artist objects.
     * The artist data is stored in the state variable `artistItems`.
     */
    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await fetchTempData(api.artist);
            if (data) {
                setArtistItems(data.map(value => ({
                    id: value.id,
                    name: `${value.firstName} ${value.lastName}`
                })));
            }
        };
        fetchAuthors();
    }, []);

    /**
     * Toggles the selection of an artist when a checkbox is clicked.
     * @param {*} artistId - The ID of the artist being selected or deselected.
     */
    const handleChange = (artistId) => {
        const newSelectedIds = artistIds.includes(artistId)
            ? artistIds.filter(id => id !== artistId)
            : [...artistIds, artistId];
        setArtistIds(newSelectedIds);
    };

    /**
     * Returns a Checkbox component for each artist to indicate selection.
     * @param {*} artistId - The ID of the artist for which the checkbox is rendered.
     * @returns {JSX.Element} A Checkbox component with checked state based on the artist's selection.
     */
    const CB = (artistId) => {
        const isChecked = artistIds && artistIds.includes(artistId);
        return (
            <Checkbox
                checked={isChecked}
                onChange={() => handleChange(artistId)}
                color="primary"
            />
        );
    };

    /**
     * Displays a loading spinner while the artist data is being fetched.
     * Returns a CircularProgress if artistItems is undefined.
     */
    if (artistItems === undefined) {
        return <CircularProgress />;
    }

    return (
        <FormControl
            sx={showId ? { marginLeft: "15px" } : { marginTop: "15px" }}
            style={{ minWidth: "250px" }}
        >
            <List>
                <ListItem><ListItemText primary={<Typography variant="h6" sx={{textAlign:"center"}}>Artists</Typography>} /></ListItem>
                {artistItems.map((artist) => (
                    <div key={artist.id}>
                        <ListItem button onClick={() => handleChange(artist.id)} sx={{ cursor: "pointer" }}>
                            {CB(artist.id)}
                            <ListItemText primary={artist.name} />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </FormControl>
    );
};

export default ArtistSelect;
